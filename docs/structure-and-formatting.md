# Structure & Formatting Conventions

## Lessons Learned Box (PR/Incident Posts)
- Use a visually distinct `<div class="lessons-learned">` with a `<ul>` for “Lessons Learned” in PR or incident posts, but not in miracle/event posts.
- Example:
  ```html
  <div class="lessons-learned">
    <ul>
      <li>Lesson 1</li>
      <li>Lesson 2</li>
    </ul>
  </div>
  ```

## Section Headings and Dividers
- Use `###` or `####` for major section headings (e.g., “System Logs”, “Postmortem: Uriel-404 Commentary”, “Incident Report — ...”).
- Use `---` (horizontal rule) to visually separate major sections.
- **Do not use a colon (`:`) at the end of a section header unless the header and its content are on the same line (e.g., `Status:`). For headers that are alone on a line, omit the colon.**
  - **Section headers:** Do not use a colon at the end of any header (any level, e.g., `##`, `###`, `####`) unless content follows on the same line. This applies to all section and subsection headers.
    - **Incorrect:**
      ```markdown
      ### Tools Detected:
      ### Disputed Outcome:
      ```
    - **Correct:**
      ```markdown
      ### Tools Detected
      ### Disputed Outcome
      ```
- **Do not use strong emphasis (e.g., `**`) in headings (`h1`, `h2`, `h3`, etc.) as it looks visually identical to regular headings.**
- Use plain Markdown heading syntax (e.g., `#`, `##`, `###`) for consistency.
- **Note:** When using `layout: terminal_post`, do not include an `# H1` heading at the start of your content, as the layout automatically displays the post title from the front matter.

## Blockquotes for Commentary
- Use `>` blockquote formatting for in-character commentary, especially from Uriel-404 or other “reviewers.”

## Status/Impact Section
- Status, Impact, Severity, etc., are listed as bolded lines at the end of the post, sometimes with emoji for emphasis.

## Adler Hash and Incident Summary
- Miracle/incident posts begin with a “Miracle alert” block, including an Adler Hash and a one-line incident summary.

## Reviewer/Email Formatting
- Reviewer and user emails in posts should use on-theme domains ending in `.eternal` (e.g., `@divine.eternal`, `@archangels.eternal`, `@notifications.eternal`).
- The subdomain should fit the sender's role or function in the post (e.g., `notifications.eternal` for notification emails, `archangels.eternal` for archangel reviewers, etc.).
- Use `.eternal` wherever you would use `.internal` in a typical tech org.

## Code/Log Blocks
- Use fenced code blocks (with language, e.g., ```log or ```bash) for logs, commands, or system output.
- Use the correct language identifier for code blocks for syntax highlighting.



## Daemon Post Formatting

- Use `layout: terminal_post` in the YAML front matter.
- Do not include an H1 heading at the start; the layout uses the title.
- Structure the post with section headings (`###`, `####`) for lore, manifestations, rituals, incidents, etc.
- At the end of the post, add a post-credit section linking to the daemon registry entry for the daemon:
  ```html
  <div class="post-credit">
  <strong>class:</strong> <a href="{{ site.baseurl }}/assets/reference/daemon-registry/">passive.daemon.review.verrine</a>
  </div>
  ```
### Registry File Sync Reminder

Whenever you add, remove, or update a daemon entry, ensure both `docs/daemon-registry.md` (internal documentation) and `assets/reference/daemon-registry.md` (published universe) are updated together. This keeps the registry consistent for both contributors and readers.

## Angel Post Formatting

Angel posts should follow similar formatting conventions as daemon posts:

- **YAML front matter** at the top for metadata and layout (e.g., title, date, tags, layout).
- **Title** should include the angel's name and postfix (e.g., "Michael, Archangel of DevOps Defense").
- **Post-credit registry link** at the bottom, referencing the angel registry.
- **Confessions CTA**: Include a blockquoted call-to-action inviting readers to share stories of divine intervention, miraculous saves, or moments of unexpected clarity in DevOps. Use the `.comment-cta-link` class for styling.

Refer to the daemon post formatting section above for detailed examples. Adapt the confessions CTA to fit the angelic theme.

### Angel Registry File Sync Reminder

For the angel registry, maintain only the published universe file (e.g., `assets/reference/angel-registry.md`). There is no need to keep a separate internal documentation file. Always update the in-universe doc when adding, removing, or editing angel entries.

## Comment CTA Best Practice (All Posts)

Add a blockquoted call-to-action at the end of each post to encourage reader comments. Example:

```markdown
> 🗨️ [Confess your QA sins or share a test miracle in the Confession Booth.](#confessions){: .comment-cta-link }
```

This link will jump directly to the comment form on the post page.
Feel free to customize the wording and emoji to match the post’s theme (e.g., for daemon posts, tailor the CTA to the daemon’s domain).
