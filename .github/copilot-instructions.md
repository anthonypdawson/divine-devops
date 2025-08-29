# GitHub Copilot Instructions
## Project Guidance

- When using GitHub Copilot or other AI assistants in this repository, always follow the formatting and documentation guidelines found in the `docs/` directory.
- Ensure that all workflow, configuration, and code snippet files are formatted, referenced, and published according to the documented best practices.
- If in doubt, consult the documentation in `docs/` before introducing new patterns or file types.

## Example
- For YAML workflows, config files, and similar assets, see the step-by-step instructions and examples in `docs/referencing-project-files.md`.

---

## Project Overview & Core Technologies

This is a Jekyll-based satirical blog that blends technology, religion, and mythology. The main components are Markdown posts (`_posts/`, `_future/`), Jekyll layouts (`_layouts/`), and styling (`_sass/`). The central task is creating and formatting blog content.

## 📝 Key Workflow: Creating and Publishing Posts

1.  **Drafting:** New posts should be created in the `_future/` directory.
2.  **Publishing:** To publish a post, move it from `_future/` to `_posts/YYYY/MM/` and rename the file to `YYYY-MM-DD-title.md`. The `date` in the front matter must be updated to match. See `docs/publishing-future-posts.md` for details.

## ✒️ Content Conventions & Front Matter

Adherence to front matter and formatting rules is critical. The full guide is in `docs/structure-and-formatting.md`.

### Front Matter Rules

-   **Layout:** Always use `layout: terminal_post`.
-   **Category:** This is the most important field. You **MUST** use a standardized category from the list in `docs/all-categories.md`. Do not invent new categories unless absolutely necessary.
-   **Key Order:** Follow this specific order: `layout`, `title`, `date`, `category`, `tags`, `summary`, `image`, `intro`.

**Example Front Matter:**
```yaml
---
layout: terminal_post
title: "Afterlife 2.0: Onboarding and Deployment"
date: 2025-08-24 08:00:00
category: divine-incident-report
tags: [afterlife, devops, parody, onboarding, deployment]
summary: "A soul enters the Afterlife 2.0 onboarding pipeline, then a hotfix derails deployment with a Grace middleware timeout."
image: "/assets/images/posts/afterlife-2.0.webp"
intro: "In which a soul is treated like a pull request, a daemon rushes a hotfix, and Heaven's staging cluster reminds everyone that eternity is still subject to timeouts."
---
```

### Post Structure & Formatting

-   **Headings:** Do not use colons at the end of section headers (e.g., `### Triage` is correct, `### Triage:` is not).
-   **Commentary:** Use Markdown blockquotes (`>`) for in-character commentary.
-   **Call to Action:** End every post with a "Confession Booth" CTA.
    ```markdown
    > 🗨️ [Share your Limbo survival tips...](#confessions){: .comment-cta-link }
    ```

## 🔗 Linking Conventions

-   **Between Posts:** Use the `post_url` tag: `[Link Text]({{ site.baseurl }}{% post_url YYYY/MM/YYYY-MM-DD-filename %})`.
-   **To Assets/Docs:** Use the `site.baseurl` variable: `[File]({{ site.baseurl }}/assets/misc/file.yml.md)`.
-   Refer to `docs/file-linking-guidelines.md` for more examples.

## 🔱 Special Post Types: Daemons & Angels

-   These posts have specific formatting, including a post-credit link to their registry entry.
-   **CRITICAL:** When adding or updating a daemon, you **MUST** update both `docs/daemon-registry.md` and `assets/reference/daemon-registry.md` to keep them in sync.
