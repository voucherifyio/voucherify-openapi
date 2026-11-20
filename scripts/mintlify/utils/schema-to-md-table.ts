import { EOL } from "os";
import * as yup from "yup";
import MarkdownIt from "markdown-it";

yup.addMethod(
  yup.MixedSchema,
  "oneOfSchemas",
  function (schemas: yup.AnySchema[]) {
    return this.test(
      "one-of-schemas",
      "Not all items in '${path}' match one of the allowed schemas",
      (item) =>
        schemas.some((schema) => schema.isValidSync(item, { strict: true })),
    );
  },
);

const nodeWithTitleAndPropertiesSchema = yup.object({
  title: yup.string().optional(),
  type: yup.string().oneOf(["object", "string", "array", "number"]),
  nullable: yup.boolean().optional(),
  properties: yup.object({}).optional(),
  additionalProperties: (yup.mixed() as any)
    .oneOfSchemas([yup.boolean(), yup.object({})])
    .optional(),
  oneOf: yup.array().optional(),
});

const itemsSchema = (yup.mixed() as any)
  .oneOfSchemas([
    nodeWithTitleAndPropertiesSchema,
    yup.object({ $ref: yup.string().optional() }),
  ])
  .optional();

const oneOfSchema = yup
  .array()
  .of(
    (yup.mixed() as any).oneOfSchemas([
      nodeWithTitleAndPropertiesSchema,
      yup.object({ $ref: yup.string().required() }),
    ]),
  )
  .optional();

const allOfSchema = oneOfSchema;

const propertySchema = yup.object({
  type: (yup.mixed() as any).oneOfSchemas([
    yup.string(),
    yup.array().of(yup.string()),
  ]),
  nullable: yup.boolean().optional(),
  properties: yup.object({}).optional(),
  additionalProperties: (yup.mixed() as any)
    .oneOfSchemas([yup.boolean(), yup.object({})])
    .optional(),
  description: yup.string().optional(),
  enum: yup
    .array()
    .of(
      (yup.mixed() as any).oneOfSchemas([
        yup.string(),
        yup.array().of(yup.number()),
        yup.array().of(yup.string()),
      ]),
    )
    .optional(),
  oneOf: oneOfSchema,
  allOf: allOfSchema,
  items: itemsSchema,
  $ref: yup.string().optional(),
});

interface Items extends yup.InferType<typeof itemsSchema> {}
interface OneOf extends yup.InferType<typeof oneOfSchema> {}
interface AllOf extends yup.InferType<typeof oneOfSchema> {}

export type Properties = Record<string, Property>;
type Property = {
  description?: string;
  example?: any; // example może być liczbą, stringiem itd.
  type?: string;
  nullable?: boolean;
};

const md = new MarkdownIt({ breaks: true, html: true });
const renderMarkdown = (markdown: string) =>
  md.render(`${markdown}`).replace(/\n|\r/g, "");

export enum RenderMode {
  Nested,
  List,
}
export enum ExamplesRenderedAs {
  Column,
  PartOfDescription,
}

export default class SchemaToMarkdownTable {
  constructor(
    private schemas: Record<string, any>,
    private redenderMode: RenderMode = RenderMode.List,
    private examplesRenderedAs = ExamplesRenderedAs.Column,
  ) {
    if (!schemas) {
      throw new Error("Schemas must be provided");
    }
    if (typeof schemas !== "object") {
      throw new Error(
        "Schemas must be the object from openAPI file components.schemas attribute",
      );
    }
  }

  // Render HTML table head instead of Markdown head
  private getMarkdownTableHead() {
    const hasExampleColumn =
      this.examplesRenderedAs === ExamplesRenderedAs.Column;
    const headCells = [
      "<th>Attributes</th>",
      "<th>Description</th>",
      hasExampleColumn ? "<th>Example</th>" : "",
    ].filter(Boolean);
    return `<thead><tr>${headCells.join("")}</tr></thead>`;
  }

  // Render HTML table row instead of Markdown row
  private getMarkdownTableRow(columns: string[]) {
    const tds = columns.map((c) => `<td>${c || ""}</td>`).join("");
    return `<tr>${tds}</tr>`;
  }

  // Use <a>…</a> so links render correctly inside HTML table cells
  private getMarkdownLinkToHeader(label: string) {
    const href = `#${label
      .toLocaleLowerCase()
      .replace(/[\s]/g, "-")
      .replace(/[,]/g, "")}`;
    return `<a href="${href}">${label}</a>`;
  }

  // Strip single wrapping <p>...</p> to allow inline reuse
  private stripWrappingParagraph(html: string) {
    const trimmed = (html || "").trim();
    if (trimmed.startsWith("<p>") && trimmed.endsWith("</p>")) {
      return trimmed.slice(3, -4);
    }
    return trimmed;
  }

  // Render single block: <p><strong>Example:</strong> VALUE</p>
  private renderExampleBlock(exampleHtml: string, label = "Example") {
    const inner = this.stripWrappingParagraph(exampleHtml);
    return `<p><strong>${label}:</strong> ${inner}</p>`;
  }

  // Helper: create <ol> list from items
  private asOrderedList(items: string[]) {
    if (!items?.length) return "";
    return `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
  }

  // Helper: map oneOf array to array of HTML items and related object names
  private listItemsFromOneOf(oneOf: OneOf, level: number) {
    const relatedObjectsNames: string[] = [];
    const itemsHtml = (oneOf || [])
      .map((item: any) => {
        if (
          "$ref" in item &&
          typeof item["$ref"] === "string" &&
          item["$ref"].startsWith("#/components/schemas/")
        ) {
          const nestedObjectName = item["$ref"].replace(
            "#/components/schemas/",
            "",
          );
          if (typeof this.schemas[nestedObjectName] !== "object") {
            return false;
          }
          relatedObjectsNames.push(nestedObjectName);
          const title = (this.schemas[nestedObjectName].title ||
            nestedObjectName) as string;
          if (this.redenderMode === RenderMode.List) {
            return this.getMarkdownLinkToHeader(title);
          } else {
            const { html } = this.renderSchema(nestedObjectName, level + 1);
            return renderMarkdown(html);
          }
        } else if ("properties" in item) {
          const { html, relatedObjects } = this.renderSchema(item, level + 1);
          relatedObjectsNames.push(...relatedObjects);
          return renderMarkdown(html);
        } else if ("items" in item) {
          const { html, relatedObjects } = this.renderSchema(
            item,
            level + 1,
            true,
          );
          relatedObjectsNames.push(...relatedObjects);
          return renderMarkdown(html);
        } else if (
          "type" in item &&
          typeof item.type === "string" &&
          ["string", "number", "object"].includes(item.type)
        ) {
          const type = "nullable" in item ? `${item.type}, null` : item.type;
          return level ? type : renderMarkdown(type);
        }
      })
      .filter((i) => !!i) as string[];
    return { itemsHtml, relatedObjectsNames };
  }

  // Helper: map allOf array to array of HTML items and related object names
  private listItemsFromAllOf(allOf: AllOf, level: number) {
    const relatedObjectsNames: string[] = [];
    const itemsHtml = (allOf || [])
      .map((item: any) => {
        if (
          "$ref" in item &&
          typeof item["$ref"] === "string" &&
          item["$ref"].startsWith("#/components/schemas/")
        ) {
          const nestedObjectName = item["$ref"].replace(
            "#/components/schemas/",
            "",
          );
          if (typeof this.schemas[nestedObjectName] !== "object") {
            return false;
          }
          relatedObjectsNames.push(nestedObjectName);
          const title = (this.schemas[nestedObjectName].title ||
            nestedObjectName) as string;
          if (this.redenderMode === RenderMode.List) {
            return this.getMarkdownLinkToHeader(title);
          } else {
            const { html } = this.renderSchema(nestedObjectName, level + 1);
            return renderMarkdown(html);
          }
        } else if ("properties" in item) {
          const { html, relatedObjects } = this.renderSchema(item, level + 1);
          relatedObjectsNames.push(...relatedObjects);
          return renderMarkdown(html);
        } else if ("oneOf" in item) {
          const oneOf = oneOfSchema.validateSync(item["oneOf"]);
          const { itemsHtml: oneOfItemsHtml, relatedObjectsNames: rel } =
            this.listItemsFromOneOf(oneOf, level + 1);
          relatedObjectsNames.push(...rel);
          // render nested <ol> as a single item
          return this.asOrderedList(oneOfItemsHtml);
        }
      })
      .filter((i) => !!i) as string[];
    return { itemsHtml, relatedObjectsNames };
  }

  private renderOneOfDescription(
    oneOf: OneOf,
    level: number,
    skipOneOf: boolean = false,
  ) {
    const descriptionArr: string[] = [];
    const { itemsHtml, relatedObjectsNames } = this.listItemsFromOneOf(
      oneOf,
      level,
    );

    if (itemsHtml.length === 1) {
      // Single element: no "One of:" and no <ol>
      descriptionArr.push(itemsHtml[0]);
      return { descriptionArr, relatedObjectsNames };
    }

    if (!skipOneOf) {
      descriptionArr.push(`One of:`);
    }
    descriptionArr.push(this.asOrderedList(itemsHtml));
    return { descriptionArr, relatedObjectsNames };
  }

  private smartJoin(items: string[]): string {
    const isHtmlTag = (s: string) => s.startsWith("<") && s.endsWith(">");
    const allHtml = items.length > 0 && items.every(isHtmlTag);
    const containsTable = items.some(
      (item) => item.includes("<table") && item.includes("</table>"),
    );

    if (allHtml && !containsTable) {
      const separator = this.redenderMode === RenderMode.List ? ", " : "";
      return items.join(separator);
    }

    return items
      .map((item, index) => {
        if (!index) {
          return item;
        }
        if (items[index - 1].at(0) === "<" && items[index - 1].at(-1) === ">") {
          return item;
        }
        return `${this.redenderMode === RenderMode.List ? ", " : ""}${item}`;
      })
      .join("");
  }

  private renderAllOfDescription(allOf: AllOf, level: number) {
    const descriptionArr: string[] = [];
    const { itemsHtml, relatedObjectsNames } = this.listItemsFromAllOf(
      allOf,
      level,
    );

    if (itemsHtml.length === 1) {
      // Single element: no "All of:" and no <ol>
      descriptionArr.push(itemsHtml[0]);
      return { descriptionArr, relatedObjectsNames };
    }

    if ((allOf?.length || 0) > 0) {
      descriptionArr.push(`All of:`);
    }
    descriptionArr.push(this.asOrderedList(itemsHtml));
    return { descriptionArr, relatedObjectsNames };
  }

  private renderItemsDescription(items: Items, level: number) {
    const descriptionArr: string[] = [];
    const relatedObjectsNames: string[] = [];

    if (
      "$ref" in (items as any) &&
      typeof (items as any)["$ref"] === "string" &&
      (items as any)["$ref"].startsWith("#/components/schemas/")
    ) {
      const nestedObjectName = (items as any)["$ref"].replace(
        "#/components/schemas/",
        "",
      );
      relatedObjectsNames.push(nestedObjectName);
      const title = (this.schemas[nestedObjectName].title ||
        nestedObjectName) as string;
      if (this.redenderMode === RenderMode.List) {
        descriptionArr.push(`Array of ${this.getMarkdownLinkToHeader(title)}`);
      } else {
        descriptionArr.push("Array of:");
        const { html } = this.renderSchema(nestedObjectName, level + 1);
        descriptionArr.push(renderMarkdown(html));
      }
    } else if ("type" in (items as any) && (items as any).type === "object") {
      descriptionArr.push("Array of:");
      const { html, relatedObjects } = this.renderSchema(
        items as any,
        level + 1,
      );
      relatedObjectsNames.push(...relatedObjects);
      descriptionArr.push(renderMarkdown(html));
    } else if ("oneOf" in (items as any)) {
      const oneOf = oneOfSchema.validateSync((items as any).oneOf);
      const { itemsHtml, relatedObjectsNames: rel } = this.listItemsFromOneOf(
        oneOf,
        level + 1,
      );
      relatedObjectsNames.push(...rel);
      if (itemsHtml.length === 1) {
        descriptionArr.push("Array of:");
        descriptionArr.push(itemsHtml[0]);
      } else {
        descriptionArr.push("Array any of:");
        descriptionArr.push(this.asOrderedList(itemsHtml));
      }
    }
    return { descriptionArr, relatedObjectsNames };
  }

  private renderRef(ref: string, level: number) {
    const descriptionArr: string[] = [];
    const relatedObjectsNames: string[] = [];
    if (ref.startsWith("#/components/schemas/")) {
      const nestedObjectName = ref.replace("#/components/schemas/", "");
      relatedObjectsNames.push(nestedObjectName);
      const title = (this.schemas[nestedObjectName].title ||
        nestedObjectName
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/([A-Z])([A-Z])/g, "$1 $2")) as string;
      if (this.redenderMode === RenderMode.List) {
        descriptionArr.push(`See: ${this.getMarkdownLinkToHeader(title)}`);
      } else {
        const { html } = this.renderSchema(nestedObjectName, level + 1);
        descriptionArr.push(renderMarkdown(html));
      }
    }
    return { descriptionArr, relatedObjectsNames };
  }

  private renderProperty = (property: Property, level: number) => {
    const descriptionArr: string[] = [];
    const relatedObjectsNames: string[] = [];
    const example =
      "example" in property &&
      property.example !== undefined &&
      property.example !== null
        ? renderMarkdown(String(property.example))
        : "";

    const {
      description,
      enum: EnumProp,
      oneOf,
      allOf,
      items,
      type,
      $ref,
      properties,
      additionalProperties,
    } = propertySchema.validateSync(property as any);

    if (description) {
      descriptionArr.push(renderMarkdown(description));
    }

    if (EnumProp) {
      const availableValues = `Available values: ${EnumProp.map(
        (value) => `\`${value}\``,
      ).join(", ")}`;
      descriptionArr.push(renderMarkdown(availableValues));
    }

    if (allOf) {
      const {
        descriptionArr: descriptionArrAllOf,
        relatedObjectsNames: relatedObjectsNamesAllOff,
      } = this.renderAllOfDescription(allOf, level);
      descriptionArr.push(...descriptionArrAllOf);
      relatedObjectsNames.push(...relatedObjectsNamesAllOff);
    }

    if (oneOf) {
      const {
        descriptionArr: descriptionArrOneOf,
        relatedObjectsNames: relatedObjectsNamesOneOff,
      } = this.renderOneOfDescription(oneOf, level);
      descriptionArr.push(...descriptionArrOneOf);
      relatedObjectsNames.push(...relatedObjectsNamesOneOff);
    }

    if (items) {
      const {
        descriptionArr: descriptionArrItems,
        relatedObjectsNames: relatedObjectsNamesItems,
      } = this.renderItemsDescription(items, level);
      descriptionArr.push(...descriptionArrItems);
      relatedObjectsNames.push(...relatedObjectsNamesItems);
    }

    if ($ref) {
      const {
        descriptionArr: descriptionArrItems,
        relatedObjectsNames: relatedObjectsNamesItems,
      } = this.renderRef($ref, level);
      descriptionArr.push(...descriptionArrItems);
      relatedObjectsNames.push(...relatedObjectsNamesItems);
    }

    if (
      type === "object" &&
      (properties instanceof Object || additionalProperties instanceof Object)
    ) {
      const { html, relatedObjects } = this.renderSchema(
        property as any,
        level + 1,
      );
      relatedObjectsNames.push(...relatedObjects);
      descriptionArr.push(renderMarkdown(html));
    }

    return { descriptionArr, relatedObjectsNames, example };
  };

  private renderPropertiesAsTableRow = (
    properties: Properties,
    level: number = 0,
  ) => {
    const relatedObjectsNames: string[] = [];

    const rowsHtml = Object.entries(properties).map(
      ([propertyId, property]) => {
        const {
          descriptionArr,
          relatedObjectsNames: additionalRelatedObjectsNames,
          example,
        } = this.renderProperty(property, level);

        relatedObjectsNames.push(...additionalRelatedObjectsNames);

        // Build label as HTML (render markdown bits like code/backticks)
        const typePart = property.type
          ? `\`${property.type}\`${property.nullable ? `, \`null\`` : ""}`
          : "";
        const labelMarkdown = [propertyId, typePart]
          .filter(Boolean)
          .join("<br/>");
        const propertyLabelHtml = renderMarkdown(labelMarkdown);

        let descriptionHtml = descriptionArr.join(" ");

        if (this.examplesRenderedAs === ExamplesRenderedAs.Column) {
          return this.getMarkdownTableRow([
            propertyLabelHtml,
            descriptionHtml,
            example || "",
          ]);
        } else {
          if (example) {
            const exampleBlock = this.renderExampleBlock(example, "Example");
            descriptionHtml = [descriptionHtml, exampleBlock]
              .filter(Boolean)
              .join("");
          }
          return this.getMarkdownTableRow([propertyLabelHtml, descriptionHtml]);
        }
      },
    );

    const thead = this.getMarkdownTableHead();
    const tbody = `<tbody>${rowsHtml.join("")}</tbody>`;
    return {
      html: `<table>${thead}${tbody}</table>`,
      relatedObjectsNames,
    };
  };

  private renderSchema(
    schemaNameOrSchemaObject: string | object,
    level: number = 0,
    skipTitle: boolean = false,
  ) {
    const schema =
      typeof schemaNameOrSchemaObject === "object"
        ? (schemaNameOrSchemaObject as any)
        : this.schemas[schemaNameOrSchemaObject as string];
    if (!schema) {
      throw new Error(`Schema "${schema}" not found`);
    }

    const schemaResult = nodeWithTitleAndPropertiesSchema.validateSync(schema);
    const { title, additionalProperties } = schemaResult as any;
    const properties =
      (schemaResult as any).properties instanceof Object
        ? (schemaResult as any).properties
        : additionalProperties instanceof Object
          ? {}
          : undefined;
    if (additionalProperties instanceof Object) {
      (properties as any)["[propertyName]"] = additionalProperties;
    }
    const respopnseStrArr: string[] = [];

    if (!skipTitle && title) {
      respopnseStrArr.push(`${"#".repeat(level + 2)} ${title}`);
    } else if (!skipTitle) {
      if (typeof schemaNameOrSchemaObject === "string") {
        throw new Error(`Missing title for ${schemaNameOrSchemaObject} object`);
      }
    }
    const relatedObjects: string[] = [];

    if (properties) {
      const { html, relatedObjectsNames } = this.renderPropertiesAsTableRow(
        properties,
        level,
      );
      relatedObjects.push(...relatedObjectsNames);
      respopnseStrArr.push(html);
    } else {
      propertySchema.validateSync(schema);
      const { descriptionArr, relatedObjectsNames } = this.renderProperty(
        schema as any,
        level,
      );
      relatedObjects.push(...relatedObjectsNames);
      respopnseStrArr.push(descriptionArr.join(`${EOL}${EOL}`));
    }

    return { html: respopnseStrArr.join(EOL), relatedObjects };
  }

  public render(schemaName: string): string {
    if (this.redenderMode === RenderMode.Nested) {
      const { html } = this.renderSchema(schemaName);
      return html;
    }

    const schemasToRender: string[] = [schemaName];
    const renderedSchemas: string[] = [];
    const response: string[] = [];

    while (schemasToRender.length) {
      const nextSchemaToRender = schemasToRender.shift()!;
      if (renderedSchemas.includes(nextSchemaToRender)) {
        continue;
      }
      const { html, relatedObjects } = this.renderSchema(nextSchemaToRender);
      renderedSchemas.push(nextSchemaToRender);
      response.push(html);
      if (relatedObjects.length) {
        schemasToRender.push(...relatedObjects);
      }
    }
    return response.join(`${EOL}${EOL}`);
  }
}
