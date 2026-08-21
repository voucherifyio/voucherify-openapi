import fs from "fs";
import path from "path";
import referenceMinimal from "./__fixtures__/reference-minimal.json";
import loyaltiesV2Minimal from "./__fixtures__/loyalties-v2-minimal.json";
import {
  countLoyaltiesV2Operations,
  extractLoyaltiesV2OpenApi,
} from "./extract-loyalties-v2-openapi";
import { mergeLoyaltiesV2IntoReference } from "./merge-loyalties-v2-into-reference";
import { OpenAPISpec } from "./utils/openapi-component-collector";
import {
  normalizeOpenApi30To31,
  normalizeOpenApi31To30,
} from "./utils/openapi-null-transforms";

describe("loyalties v2 openapi merge/extract", () => {
  test("normalizeOpenApi31To30 converts nullable type arrays", () => {
    const normalized = normalizeOpenApi31To30({
      type: ["string", "null"],
      description: "note",
    }) as Record<string, unknown>;

    expect(normalized).toEqual({
      type: "string",
      nullable: true,
      description: "note",
    });
  });

  test("normalizeOpenApi30To31 restores nullable type arrays", () => {
    const normalized = normalizeOpenApi30To31({
      type: "string",
      nullable: true,
      description: "note",
    }) as Record<string, unknown>;

    expect(normalized).toEqual({
      type: ["string", "null"],
      description: "note",
    });
  });

  test("merge renames MemberActivity and BadRequest to avoid v1 collisions", () => {
    const merged = mergeLoyaltiesV2IntoReference(
      referenceMinimal as OpenAPISpec,
      loyaltiesV2Minimal as OpenAPISpec,
    );

    expect(Object.keys(merged.paths ?? {})).toEqual([
      "/v1/vouchers",
      "/v2/loyalties/programs",
      "/v2/loyalties/programs/{programId}/members/{memberId}/activities",
    ]);

    expect(merged.components?.schemas).toHaveProperty("ProgramCreateRequest");
    expect(merged.components?.schemas).toHaveProperty(
      "LoyaltyV2MemberActivity",
    );
    expect(merged.components?.schemas).toHaveProperty("LoyaltyV2BadRequest");
    expect(
      (merged.components?.schemas as Record<string, unknown>).MemberActivity,
    ).toEqual(referenceMinimal.components.schemas.MemberActivity);
    expect(
      (merged.components?.schemas as Record<string, Record<string, unknown>>)
        .LoyaltyV2MemberActivity.properties,
    ).toHaveProperty("member_id");
    expect(
      (merged.components?.schemas as Record<string, unknown>).BadRequest,
    ).toEqual(referenceMinimal.components.schemas.BadRequest);

    const programsPath = JSON.stringify(merged.paths?.["/v2/loyalties/programs"]);
    expect(programsPath).toContain("#/components/schemas/LoyaltyV2BadRequest");
    expect(programsPath).not.toMatch(/#\/components\/schemas\/BadRequest"/);
  });

  test("extract includes only v2 paths and reverses schema renames", () => {
    const merged = mergeLoyaltiesV2IntoReference(
      referenceMinimal as OpenAPISpec,
      loyaltiesV2Minimal as OpenAPISpec,
    );
    const extracted = extractLoyaltiesV2OpenApi(merged);

    expect(Object.keys(extracted.paths ?? {})).toEqual([
      "/v2/loyalties/programs",
      "/v2/loyalties/programs/{programId}/members/{memberId}/activities",
    ]);
    expect(extracted.components?.schemas).toHaveProperty("MemberActivity");
    expect(extracted.components?.schemas).not.toHaveProperty(
      "LoyaltyV2MemberActivity",
    );
    expect(
      (extracted.components?.schemas as Record<string, { description?: string }>)
        .BadRequest.description,
    ).toContain("Framework-level error");
    expect(extracted.openapi).toBe("3.1.0");
    expect(countLoyaltiesV2Operations(extracted)).toBe(2);
  });

  test("merge then extract preserves v2 path and schema keys", () => {
    const merged = mergeLoyaltiesV2IntoReference(
      referenceMinimal as OpenAPISpec,
      loyaltiesV2Minimal as OpenAPISpec,
    );
    const extracted = extractLoyaltiesV2OpenApi(merged);

    expect(Object.keys(extracted.components?.schemas ?? {}).sort()).toEqual(
      [
        "BadRequest",
        "MemberActivity",
        "ProgramCreateRequest",
        "ProgramCreateResponse",
      ].sort(),
    );
  });

  test("committed loyalties-v2.json matches extract from reference OpenAPI", () => {
    const reference = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../../reference/OpenAPI.json"),
        "utf8",
      ),
    ) as OpenAPISpec;
    const onDisk = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          "../../documentation/openapi/loyalties-v2.json",
        ),
        "utf8",
      ),
    ) as OpenAPISpec;
    const extracted = extractLoyaltiesV2OpenApi(reference);

    expect(Object.keys(onDisk.paths ?? {}).sort()).toEqual(
      Object.keys(extracted.paths ?? {}).sort(),
    );
    expect(Object.keys(onDisk.components?.schemas ?? {}).sort()).toEqual(
      Object.keys(extracted.components?.schemas ?? {}).sort(),
    );
    expect(countLoyaltiesV2Operations(onDisk)).toBe(
      countLoyaltiesV2Operations(extracted),
    );
  });
});
