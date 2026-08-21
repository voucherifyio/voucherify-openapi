#!/usr/bin/env python3
"""Apply high-confidence Loyalty v2 OpenAPI fixes from backend re-verification."""

from __future__ import annotations

import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OPENAPI = ROOT / "reference" / "OpenAPI.json"

KEEP_409_OPS = {
    "batchProgramCardDefinitionAssignments",
    "batchProgramEarningRuleAssignments",
    "batchProgramTierStructureAssignments",
    "batchProgramRewardAssignments",
    "createBenefit",
    "updateBenefit",
}

ADD_403_OPS = {
    "batchProgramEarningRuleAssignments",
    "batchProgramRewardAssignments",
}

ERROR_403 = {
    "description": "Limit exceeded - assignment count exceeds the allowed maximum.",
    "content": {
        "application/json": {
            "schema": {"$ref": "#/components/schemas/ErrorResponse"}
        }
    },
}

TIER_POINTS_EXPIRATION_INPUT = {
    "type": "object",
    "description": (
        "Points expiration policy for the tier.\n"
        "Conditional requirements based on `type`:\n"
        "- `INHERIT`: `rolling_expiration`, `calendar_expiration` and `sliding_expiration` must be null/absent.\n"
        "- `NO_EXPIRATION`: `rolling_expiration`, `calendar_expiration` and `sliding_expiration` must be null/absent.\n"
        "- `ROLLING_EXPIRATION`: `rolling_expiration` is required; the other two must be null/absent.\n"
        "- `CALENDAR_EXPIRATION`: `calendar_expiration` is required; the other two must be null/absent.\n"
        "- `SLIDING_EXPIRATION`: `sliding_expiration` is required; the other two must be null/absent."
    ),
    "properties": {
        "type": {
            "type": "string",
            "enum": [
                "INHERIT",
                "NO_EXPIRATION",
                "ROLLING_EXPIRATION",
                "CALENDAR_EXPIRATION",
                "SLIDING_EXPIRATION",
            ],
            "description": "Expiration type. `INHERIT` uses the parent tier structure or card definition policy.",
        },
        "rolling_expiration": {
            "oneOf": [
                {"$ref": "#/components/schemas/CardDefinitionPointsExpirationRollingExpirationInput"},
                {"type": "object", "nullable": True},
            ],
            "description": "Rolling expiration configuration. Required when `type` is `ROLLING_EXPIRATION`, must be null otherwise.",
        },
        "calendar_expiration": {
            "oneOf": [
                {"$ref": "#/components/schemas/CardDefinitionPointsExpirationCalendarExpirationInput"},
                {"type": "object", "nullable": True},
            ],
            "description": "Calendar expiration configuration. Required when `type` is `CALENDAR_EXPIRATION`, must be null otherwise.",
        },
        "sliding_expiration": {
            "oneOf": [
                {"$ref": "#/components/schemas/CardDefinitionPointsExpirationSlidingExpirationInput"},
                {"type": "object", "nullable": True},
            ],
            "description": "Sliding expiration configuration. Required when `type` is `SLIDING_EXPIRATION`, must be null otherwise.",
        },
    },
    "required": ["type"],
    "additionalProperties": False,
}


def is_in_progress(op: dict) -> bool:
    return "Documentation in progress" in op.get("description", "")


def remove_deleted_from_enum_values(node):
    if isinstance(node, dict):
        if node.get("enum") == ["DRAFT", "ACTIVE", "INACTIVE", "DELETED"]:
            node["enum"] = ["DRAFT", "ACTIVE", "INACTIVE"]
        for value in node.values():
            remove_deleted_from_enum_values(value)
    elif isinstance(node, list):
        for item in node:
            remove_deleted_from_enum_values(item)


def main() -> None:
    with OPENAPI.open() as f:
        spec = json.load(f)

    schemas = spec["components"]["schemas"]
    changes: list[str] = []

    # --- Schema fixes ---
    schemas["TierPointsExpirationInput"] = TIER_POINTS_EXPIRATION_INPUT
    changes.append("Added TierPointsExpirationInput schema")

    for req_name in ("TierCreateRequest", "TierUpdateRequest"):
        pe = schemas[req_name]["properties"]["points_expiration"]
        for branch in pe["oneOf"]:
            if "$ref" in branch:
                branch["$ref"] = "#/components/schemas/TierPointsExpirationInput"
    changes.append("TierCreateRequest/TierUpdateRequest use TierPointsExpirationInput")

    schemas["Program"]["properties"]["status"]["description"] = (
        "Program status. `DELETED` is returned only by the delete endpoint and appears in activity snapshots. "
        "Deleted programs are excluded from get/list (404). Reads return `DRAFT`, `ACTIVE`, or `INACTIVE` only."
    )
    changes.append("Program.status description")

    er_status = schemas["EarningRuleResponse"]["properties"]["status"]
    er_status["enum"] = ["DRAFT", "ACTIVE", "INACTIVE", "DELETED"]
    er_status["description"] = (
        "Current status. `DELETED` appears only in the delete response and in activity snapshots. "
        "Deleted rules are excluded from get/list (404)."
    )
    changes.append("EarningRuleResponse.status enum + description")

    schemas["TierStructure"]["properties"]["status"]["description"] = (
        "Current lifecycle status. `DELETED` appears only in the delete response and in activity snapshots. "
        "Deleted tier structures are excluded from get/list (404)."
    )
    changes.append("TierStructure.status description")

    schemas["RewardResponse"]["properties"]["status"]["description"] = (
        "Current lifecycle status. `DELETED` appears only in the delete response and in activity snapshots. "
        "Deleted rewards are excluded from get/list (404)."
    )
    changes.append("RewardResponse.status description")

    ts_filter = schemas["TierStructureFilterStatusField"]
    ts_filter["description"] = (
        "Enum field filter for tier structure `status`. Allowed conditions: `$is`,\n"
        "`$is_not`, `$in`, `$not_in`. Allowed values: `DRAFT`, `ACTIVE`, `INACTIVE`.\n"
        "Soft-deleted tier structures are excluded from list results, so filtering by `DELETED` never matches."
    )
    remove_deleted_from_enum_values(ts_filter)
    changes.append("TierStructureFilterStatusField: removed DELETED from filter enums")

    for wrapper in ("CardDailyReportResponse", "EarningRuleDailyReportResponse"):
        if "required" not in schemas[wrapper]:
            schemas[wrapper]["required"] = ["data", "object"]
            changes.append(f"{wrapper}.required")

    end_date_note = " Must be after `start_date`."
    for path_key in (
        "/v2/loyalties/programs/{programId}/reports/spending/daily",
        "/v2/loyalties/programs/{programId}/reports/tiers/daily",
    ):
        path_item = spec["paths"][path_key]
        params = path_item.get("get", {}).get("parameters") or path_item.get("parameters") or []
        for param in params if isinstance(params, list) else []:
            if param.get("name") == "end_date" and end_date_note not in param.get("description", ""):
                param["description"] = param["description"].rstrip(".") + end_date_note
                changes.append(f"{path_key} end_date description")

    for path_key in (
        "/v2/loyalties/programs/{programId}/reports/tiers/daily",
        "/v2/loyalties/programs/{programId}/reports/tiers/summary",
    ):
        for param in spec["paths"][path_key].get("parameters", []):
            if param.get("name") == "programId":
                schema = param.setdefault("schema", {})
                if schema.get("pattern") != "^lprg_[a-f0-9]+$":
                    schema["pattern"] = "^lprg_[a-f0-9]+$"
                    changes.append(f"{path_key} programId pattern")

    # --- Operation description / response fixes ---
    desc_replacements = {
        "activateProgram": (
            "Transitions the program to `ACTIVE` status. Allowed transitions to `ACTIVE` are from\n"
            "`DRAFT` and `INACTIVE`. Requires at least one assigned `ACTIVE` card definition and\n"
            "at least one assigned `ACTIVE` earning rule (423 keys `missing_active_card_definition`,\n"
            "`missing_active_earning_rule`). Tier structures are optional; when assigned, from `DRAFT`\n"
            "all assigned tier structures must be `ACTIVE` (423 key `connected_non_active_tier_structure`);\n"
            "from `INACTIVE`, no assigned tier structure may be `DRAFT` (423 key\n"
            "`connected_draft_tier_structure`; `INACTIVE` tier structures are allowed). An invalid\n"
            "state transition is rejected with `400` (key `invalid_state_transition`). No request body."
        ),
        "listProgramMemberActivities": (
            "Returns a cursor-paginated list of activities recorded for the member (created,\n"
            "updated, deleted, activated, deactivated, card assigned, card unassigned). Results can be\n"
            "filtered by id, type and created_at. Returns `404` when the program or member does\n"
            "not exist."
        ),
    }

    for path, methods in spec["paths"].items():
        if not path.startswith("/v2/loyalties"):
            continue
        for method, op in methods.items():
            if not isinstance(op, dict) or not is_in_progress(op):
                continue

            oid = op.get("operationId", "")

            if oid in desc_replacements:
                badge_block = op["description"].split("</Info>\n\n", 1)[0] + "</Info>\n\n"
                op["description"] = badge_block + desc_replacements[oid]
                changes.append(f"{oid} description")

            if oid == "activateEarningRule":
                op["description"] = op["description"].replace(
                    "Invalid transitions are rejected with `423 Locked`.",
                    "Invalid transitions are rejected with `400` (key `invalid_state_transition`). "
                    "Locked relations or activation validation failures return `423`.",
                )
                changes.append("activateEarningRule description")

            if oid in ("deactivateEarningRule", "draftEarningRule"):
                op["description"] = op["description"].replace(
                    "Invalid transitions are rejected with `423 Locked`.",
                    "Invalid transitions are rejected with `400` (key `invalid_state_transition`). "
                    "Locked relations return `423`.",
                )
                changes.append(f"{oid} description")

            if oid == "activateReward":
                op["description"] = op["description"].replace(
                    "other transitions are rejected with `423 Locked`.",
                    "invalid transitions are rejected with `400` (key `invalid_state_transition`). "
                    "Locked relations return `423`.",
                )
                changes.append("activateReward description")

            if oid == "getProgramMember":
                for code, resp in op.get("responses", {}).items():
                    if code == "404" and "program not found" not in resp.get("description", "").lower():
                        resp["description"] = (
                            "Resource not found. Returns `resource_type: program` when the program ID "
                            "does not exist. Returns `resource_type: member` when the member is not "
                            "found in the program."
                        )
                        changes.append("getProgramMember 404 description")

            responses = op.setdefault("responses", {})
            if oid in KEEP_409_OPS:
                pass
            elif "409" in responses:
                del responses["409"]
                changes.append(f"Removed 409 from {oid}")

            if oid in ADD_403_OPS and "403" not in responses:
                responses["403"] = copy.deepcopy(ERROR_403)
                changes.append(f"Added 403 to {oid}")

    with OPENAPI.open("w") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Applied {len(changes)} change(s):")
    for c in changes:
        print(f"  - {c}")


if __name__ == "__main__":
    main()
