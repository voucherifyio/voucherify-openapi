---
name: update-docs-changelog
description: >-
  Updates changelog/OPEN-API.md and changelog/ARTICLES.md in voucherify-openapi
  from the current branch or a referred PR. Never commits those edits.
  OPEN-API.md for reference/OpenAPI.json and reference/OpenAPIWebhooks.json;
  ARTICLES.md for documentation MDX except nested documentation/api-reference/**
  subdirectories. Use when the user asks to update the docs changelog,
  OPEN-API.md, ARTICLES.md, or to describe OpenAPI or MDX changes on a branch
  or pull request.
---

# Update voucherify-openapi docs changelog

Work only in the **voucherify-openapi** repo root. Do not edit `changelog/deprecated/` or public `documentation/changelog/*.mdx`.

**Never commit.** Leave `changelog/OPEN-API.md` and `changelog/ARTICLES.md` as local unstaged (or uncommitted) edits. Do not `git add`, `git commit`, `git stash`, or include them in a PR unless the user explicitly asks in that message.

## When to write which file

| Changelog | Update only if these paths changed |
| --- | --- |
| `changelog/OPEN-API.md` | `reference/OpenAPI.json`, `reference/OpenAPIWebhooks.json` |
| `changelog/ARTICLES.md` | `documentation/**/*.mdx`, including files **directly** in `documentation/api-reference/*.mdx` |

Ignore MDX under **nested** `documentation/api-reference/` subdirectories (`documentation/api-reference/<folder>/**`). Those object/endpoint pages are not article changelog material.

Ignore `reference/readonly-sdks/**` copies of OpenAPI, `changelog/**` itself, and `documentation/openapi/*.json` unless the canonical `reference/` specs also changed.

If neither set changed, stop. Do not invent entries.

If both sets changed, update **both** files in the same run.

## Source of changes

Use **one** source:

1. **Referred PR** — user gave a PR number or `voucherifyio/voucherify-openapi` URL.
2. **Current branch** — otherwise.

### PR

```bash
gh pr view <N> --json number,title,body,baseRefName,headRefName,files
gh pr diff <N>
```

Diff against the PR **base** branch (`baseRefName`), not necessarily `master`.

### Current branch

```bash
git fetch origin master
git merge-base origin/master HEAD
git diff --name-status $(git merge-base origin/master HEAD)...HEAD
```

Use `origin/master` unless the user names another base.

Then classify:

```bash
python3 .cursor/skills/update-docs-changelog/scripts/list_doc_changes.py [--pr N] [--base REF]
```

## Collect the story

Read PR title/body, commit subjects on the range, and ticket keys (`DOC-…`, `DEV-…`) from those texts or the branch name. Include ticket keys in the entry when they are known.

### OpenAPI

Run:

```bash
python3 .cursor/skills/update-docs-changelog/scripts/summarize_openapi_diff.py [--pr N] [--base REF]
```

Write **reader-facing** notes from that summary plus a skim of the actual diff for descriptions, status codes, and field meaning. Do not paste JSON pointers, generated `readonly-sdks` churn, or formatting-only noise.

Prefer: HTTP method + path, schema names, added/removed fields, status codes, behavioral clarifications.

### MDX

For each changed article MDX (same include/exclude rules as the table):

- Added / removed / renamed / updated
- What a docs reader would notice (new guide, wording, nav-related content in the article)
- Filename in backticks (`distribution-webhooks.mdx`). Use a path only when two files share a name.

Skip snippet-only churn in `documentation/snippets/` unless the change is the point of the PR.

## Write the entry

Keep the existing file shape:

1. Leave the top `--------------------` block and the `Older changes in [DEPRECATED.md](deprecated/DEPRECATED.md)` line untouched.
2. Newest dated section first, immediately after that header.
3. Heading: `## YYYY-MM-DD` using **today’s date** (local), unless the user specifies another date.
4. If that heading already exists, **merge** into it. Never duplicate the same date heading.
5. Do not rewrite older sections.

### Voice (match recent 2026 entries)

- Lead with a verb: Added, Updated, Removed, Verified and updated, Clarified, Documented, Renamed, Fixed, Hid.
- Endpoints as `METHOD `/path`` (METHOD outside the path backticks).
- Schema names, properties, filenames, and error keys in backticks.
- Nested bullets for several points on one endpoint.
- Tickets at the end of the lead sentence: `(DOC-1340 / DEV-3883)`.
- One short paragraph is fine for a single change; use a list for several files or endpoints.
- No raw diffs, no “this PR”, no commit hashes unless the existing style already links a PR (`[PR 915](https://github.com/voucherifyio/voucherify-openapi/pull/915)`).

See [examples.md](examples.md).

## After editing

Show the new dated section(s). State if one of the two files was skipped because its inputs did not change.

Do **not** stage or commit. Remind the user the changelog files are local only.
