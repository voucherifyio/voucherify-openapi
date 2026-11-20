// utils/addIdsToH2.ts

/**
 * Adds or updates id attributes on every <h2> tag in the provided HTML string.
 * The id value is derived from the inner text of the <h2>:
 * - toLowerCase()
 * - spaces replaced with "-"
 *
 * Example:
 *   <h2>Publications Create Base Response Body</h2>
 * becomes:
 *   <h2 id="publications-create-base-response-body">Publications Create Base Response Body</h2>
 *
 * Notes:
 * - Keeps existing attributes on <h2>, but overwrites any existing id.
 * - Inner text is extracted by stripping any nested HTML tags inside <h2>.
 * - No external dependencies.
 */
export function addIdsToH2(html: string): string {
  if (!html) return html;

  // Match <h2 ...>...</h2> including attributes and any inner HTML
  const h2Regex = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;

  return html.replace(h2Regex, (_full, rawAttrs: string, innerHTML: string) => {
    // Extract plain text from inside the <h2> (remove any nested tags)
    const innerText = stripHtml(innerHTML).trim();

    // Build slug: lowercase + replace spaces with single hyphen
    const slug = toSlug(innerText);

    // Remove any existing id and insert the new one as the first attribute
    const newAttrs = setOrInsertIdAttribute(rawAttrs, slug);

    return `<h2${newAttrs}>${innerHTML}</h2>`;
  });
}

/**
 * Removes all HTML tags from a string, keeping only text content.
 */
function stripHtml(input: string): string {
  return input.replace(/<[^>]+>/g, "");
}

/**
 * Converts text to a slug according to the requirement:
 * - toLowerCase
 * - collapse multiple spaces
 * - trim
 * - replace spaces with "-"
 *
 * Note: This intentionally preserves diacritics and other characters as requested.
 */
function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim().replace(/ /g, "-");
}

/**
 * Inserts or replaces the id attribute as the first attribute in the tag.
 * Keeps all other attributes unchanged.
 */
function setOrInsertIdAttribute(rawAttrs: string, idValue: string): string {
  const attrs = rawAttrs || "";

  // Remove existing id attribute if present (handles "id='...'", 'id="..."', and id=unquoted)
  const withoutId = attrs
    .replace(/(\s|^)id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+)/i, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Reassemble attributes with id as the first attribute
  const rest = withoutId.length ? " " + withoutId : "";
  return ` id="${idValue}"${rest ? rest : ""}`;
}
