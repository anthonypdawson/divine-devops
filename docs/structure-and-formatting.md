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
