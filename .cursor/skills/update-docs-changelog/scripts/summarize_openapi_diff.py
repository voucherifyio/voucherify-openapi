#!/usr/bin/env python3
"""Summarize semantic diffs in reference OpenAPI JSON files."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any

FILES = (
    "reference/OpenAPI.json",
    "reference/OpenAPIWebhooks.json",
)


def run(cmd: list[str]) -> str:
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return result.stdout


def load_json_at(ref: str, path: str) -> dict[str, Any] | None:
    result = subprocess.run(
        ["git", "show", f"{ref}:{path}"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return None
    return json.loads(result.stdout)


def operations(spec: dict[str, Any] | None) -> dict[str, Any]:
    if not spec:
        return {}
    found = {}
    for path, item in (spec.get("paths") or {}).items():
        if not isinstance(item, dict):
            continue
        for method, op in item.items():
            if method.startswith("x-") or method in {"parameters", "summary", "description", "servers"}:
                continue
            if not isinstance(op, dict):
                continue
            found[f"{method.upper()} {path}"] = op
    return found


def schemas(spec: dict[str, Any] | None) -> dict[str, Any]:
    if not spec:
        return {}
    return dict((spec.get("components") or {}).get("schemas") or {})


def op_shape(op: dict[str, Any]) -> dict[str, Any]:
    params = []
    for param in op.get("parameters") or []:
        if isinstance(param, dict):
            params.append(param.get("name") or param.get("$ref"))
    responses = sorted(str(code) for code in (op.get("responses") or {}).keys())
    return {
        "operationId": op.get("operationId"),
        "summary": op.get("summary"),
        "parameters": params,
        "responses": responses,
        "hasRequestBody": "requestBody" in op,
    }


def schema_props(schema: dict[str, Any]) -> set[str]:
    props = schema.get("properties")
    if isinstance(props, dict):
        return set(props.keys())
    return set()


def print_set_diff(label: str, old: set[str], new: set[str], limit: int = 80) -> None:
    added = sorted(new - old)
    removed = sorted(old - new)
    if added:
        print(f"  {label} added ({len(added)}): {', '.join(added[:limit])}")
        if len(added) > limit:
            print(f"    ... {len(added) - limit} more")
    if removed:
        print(f"  {label} removed ({len(removed)}): {', '.join(removed[:limit])}")
        if len(removed) > limit:
            print(f"    ... {len(removed) - limit} more")


def summarize_file(path: str, base: str, head: str) -> None:
    old = load_json_at(base, path)
    new = load_json_at(head, path)
    if old is None and new is None:
        print(f"\n{path}: not in either ref")
        return
    if old == new:
        print(f"\n{path}: no JSON change")
        return

    print(f"\n{path}")
    old_ops, new_ops = operations(old), operations(new)
    print_set_diff("paths", set(old_ops), set(new_ops))

    shared_ops = set(old_ops) & set(new_ops)
    modified_ops = []
    for key in sorted(shared_ops):
        if old_ops[key] != new_ops[key]:
            modified_ops.append(key)
    print(f"  paths modified: {len(modified_ops)}")
    for key in modified_ops[:60]:
        before, after = op_shape(old_ops[key]), op_shape(new_ops[key])
        notes = []
        if before["operationId"] != after["operationId"]:
            notes.append(f"operationId {before['operationId']} -> {after['operationId']}")
        if before["responses"] != after["responses"]:
            notes.append(f"responses {before['responses']} -> {after['responses']}")
        if before["parameters"] != after["parameters"]:
            notes.append("parameters changed")
        if before["hasRequestBody"] != after["hasRequestBody"]:
            notes.append("requestBody added" if after["hasRequestBody"] else "requestBody removed")
        if before["summary"] != after["summary"]:
            notes.append("summary changed")
        extra = f" ({'; '.join(notes)})" if notes else " (description or nested schema change)"
        print(f"    {key}{extra}")
    if len(modified_ops) > 60:
        print(f"    ... {len(modified_ops) - 60} more")

    old_sch, new_sch = schemas(old), schemas(new)
    print_set_diff("schemas", set(old_sch), set(new_sch))
    shared_sch = set(old_sch) & set(new_sch)
    modified_sch = [name for name in sorted(shared_sch) if old_sch[name] != new_sch[name]]
    print(f"  schemas modified: {len(modified_sch)}")
    prop_changes = []
    desc_only = []
    for name in modified_sch:
        added = sorted(schema_props(new_sch[name]) - schema_props(old_sch[name]))
        removed = sorted(schema_props(old_sch[name]) - schema_props(new_sch[name]))
        if added or removed:
            bit = []
            if added:
                bit.append("+" + ",".join(added[:20]))
            if removed:
                bit.append("-" + ",".join(removed[:20]))
            prop_changes.append(f"{name} ({'; '.join(bit)})")
        else:
            desc_only.append(name)
    for line in prop_changes[:80]:
        print(f"    {line}")
    if len(prop_changes) > 80:
        print(f"    ... {len(prop_changes) - 80} more")
    if desc_only:
        print(f"    nested/description-only: {', '.join(desc_only[:40])}")
        if len(desc_only) > 40:
            print(f"    ... {len(desc_only) - 40} more")


def resolve_base(args: argparse.Namespace) -> tuple[str, str]:
    head = args.head
    if args.pr:
        data = json.loads(
            run(["gh", "pr", "view", args.pr, "--json", "baseRefName,headRefOid"])
        )
        base = f"origin/{data['baseRefName']}"
        if args.head == "HEAD":
            head = data["headRefOid"]
        merge_base = run(["git", "merge-base", base, head]).strip()
        return merge_base, head
    base = args.base or "origin/master"
    merge_base = run(["git", "merge-base", base, head]).strip()
    return merge_base, head


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pr")
    parser.add_argument("--base")
    parser.add_argument("--head", default="HEAD")
    args = parser.parse_args()

    if not (Path.cwd() / "reference" / "OpenAPI.json").exists():
        print("Run from voucherify-openapi repo root.", file=sys.stderr)
        return 1

    base, head = resolve_base(args)
    print(f"compare {base}...{head}")
    for path in FILES:
        status = run(["git", "diff", "--name-only", f"{base}...{head}", "--", path]).strip()
        if not status:
            print(f"\n{path}: unchanged")
            continue
        summarize_file(path, base, head)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
