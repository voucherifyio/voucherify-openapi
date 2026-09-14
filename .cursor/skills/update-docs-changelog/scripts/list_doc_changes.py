#!/usr/bin/env python3
"""Classify voucherify-openapi branch/PR changes for changelog targets."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

OPENAPI_FILES = (
    "reference/OpenAPI.json",
    "reference/OpenAPIWebhooks.json",
)


def run(cmd: list[str]) -> str:
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return result.stdout


def changed_files_from_git(base: str, head: str) -> list[tuple[str, str]]:
    out = run(["git", "diff", "--name-status", f"{base}...{head}"])
    rows = []
    for line in out.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status = parts[0]
        path = parts[-1]
        rows.append((status, path))
    return rows


def changed_files_from_pr(pr: str) -> tuple[str, list[tuple[str, str]]]:
    import json

    data = json.loads(
        run(
            [
                "gh",
                "pr",
                "view",
                pr,
                "--json",
                "baseRefName,files",
            ]
        )
    )
    base = data["baseRefName"]
    rows = []
    for item in data.get("files") or []:
        path = item.get("path")
        if not path:
            continue
        rows.append(("M", path))
    return base, rows


def is_article_mdx(path: str) -> bool:
    if not path.startswith("documentation/") or not path.endswith(".mdx"):
        return False
    parts = Path(path).parts
    # documentation/api-reference/<subdir>/... is object/endpoint MDX — skip
    if len(parts) >= 4 and parts[0] == "documentation" and parts[1] == "api-reference":
        return False
    return True


def classify(rows: list[tuple[str, str]]) -> dict:
    openapi = []
    mdx = []
    other = []
    for status, path in rows:
        if path in OPENAPI_FILES:
            openapi.append(f"{status}\t{path}")
        elif is_article_mdx(path):
            mdx.append(f"{status}\t{path}")
        else:
            other.append(f"{status}\t{path}")
    return {"openapi": openapi, "mdx": mdx, "other": other}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pr", help="GitHub PR number or URL")
    parser.add_argument("--base", help="Git base ref (default: origin/master)")
    parser.add_argument("--head", default="HEAD")
    args = parser.parse_args()

    root = Path.cwd()
    if not (root / "changelog" / "OPEN-API.md").exists():
        print("Run from voucherify-openapi repo root.", file=sys.stderr)
        return 1

    if args.pr:
        base_name, rows = changed_files_from_pr(args.pr)
        print(f"source: pr {args.pr} (base {base_name})")
    else:
        base = args.base or "origin/master"
        merge_base = run(["git", "merge-base", base, args.head]).strip()
        rows = changed_files_from_git(merge_base, args.head)
        print(f"source: git {merge_base}...{args.head} (merge-base of {base})")

    groups = classify(rows)
    print(f"OPEN-API.md: {'yes' if groups['openapi'] else 'no'}")
    for line in groups["openapi"]:
        print(f"  {line}")
    print(f"ARTICLES.md: {'yes' if groups['mdx'] else 'no'}")
    for line in groups["mdx"]:
        print(f"  {line}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
