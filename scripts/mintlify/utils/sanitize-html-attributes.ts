export type AllowedAttributesMap = {
  [tagName: string]: string[]; // e.g., { a: ['href'] }
};

/**
 * Removes all attributes from HTML tags except those allowed for specific tags.
 * By default, it keeps only the "href" attribute on the <a> tag.
 *
 * Note: This is a lightweight, regex-based approach. For highly complex/invalid HTML,
 * a real parser (e.g., "sanitize-html") is a better choice, but this is sufficient for typical use.
 */
export function sanitizeHtmlAttributes(
  html: string,
  allowed: AllowedAttributesMap = { a: ["href"], div: ["class"], h2: ["id"] },
): string {
  if (!html) return html;

  // Matches opening and self-closing tags, e.g.: <div>, <div id="x">, <img alt="x"/>, <a href="...">, etc.
  const tagRegex = /<([a-zA-Z][a-zA-Z0-9:-]*)(\s[^<>]*?)?(\/?)>/g;

  return html
    .replace(
      tagRegex,
      (full, rawTagName: string, rawAttrs: string, selfClose: string) => {
        const tagName = String(rawTagName).toLowerCase();
        const isSelfClosing = !!selfClose;

        // If there are no attributes, return the tag as-is
        if (!rawAttrs) {
          return `<${tagName}${isSelfClosing ? "/" : ""}>`;
        }

        // Allowed attributes for this tag (lowercase)
        const allowedForTag = (allowed[tagName] || []).map((a) =>
          a.toLowerCase(),
        );

        // If nothing is allowed — return the tag without attributes
        if (allowedForTag.length === 0) {
          return `<${tagName}${isSelfClosing ? "/" : ""}>`;
        }

        // Extract only allowed attributes from the original attribute string
        // Supports values in double quotes, single quotes, and unquoted
        const attrRegex =
          /([^\s"'=<>\/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

        let match: RegExpExecArray | null;
        const kept: string[] = [];

        // Iterate through all attributes and keep only the allowed ones
        while ((match = attrRegex.exec(rawAttrs)) !== null) {
          const attrName = match[1].toLowerCase();
          if (!allowedForTag.includes(attrName)) continue;

          // Original value (one of groups 2, 3, 4)
          const value = match[2] ?? match[3] ?? match[4] ?? "";

          // Minimal sanitization: remove control chars 0x00-0x1F (except tab/newline)
          const cleaned = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");

          // Reassemble as a double-quoted attribute value
          kept.push(`${attrName}="${cleaned}"`);
        }

        if (kept.length === 0) {
          return `<${tagName}${isSelfClosing ? "/" : ""}>`;
        }

        return `<${tagName} ${kept.join(" ")}${isSelfClosing ? "/" : ""}>`;
      },
    )
    .replaceAll("<br>", "<br />");
}
