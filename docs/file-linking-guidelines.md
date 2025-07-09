---
title: "File Linking & Configuration Docs Guidelines"
summary: "How to create, document, and link to configuration or code files in the Divine DevOps Universe."
layout: terminal_post
---

# File Linking & Configuration Docs Guidelines

To keep documentation consistent, readable, and navigable, follow these steps when adding configuration, YAML, or other code files as documentation:

## 1. File Naming
- For configuration/code files (e.g., YAML, JSON), name the file as `filename.ext.md` (e.g., `faith-failover.yml.md`).
- For in-universe Markdown docs (files that are meant to look like `.md` files in the story), name the file as `filename.md.md` (e.g., `miracle-backlog.md.md`, `prophecy-history.md.md`).
- This preserves the original filename for clarity and makes it easy to reference in posts, and ensures Jekyll serves the file at the correct URL.

## 2. Front Matter
Add the following YAML front matter at the top of the file:
```yaml
---
title: "filename.ext"
summary: "Short description of the file's purpose."
layout: terminal_post
---
```

## 3. Content Structure
- For configuration/code files, include the actual code in a fenced code block (e.g., ```yaml, ```json, etc).
- Optionally, add a short description or usage notes above or below the code block.

## 4. Linking in Posts
- Always link to these files using the Jekyll `{{ site.baseurl }}` variable for compatibility with subdirectory deployments:
  ```markdown
  [filename.ext]({{ site.baseurl }}/assets/misc/filename.ext)
  ```
- For links that should open in a new window, use HTML:
  ```html
  <a href="{{ site.baseurl }}/assets/misc/filename.ext" target="_blank" rel="noopener">filename.ext</a>
  ```
- **Important:** The visible link text and the link href should both match the in-universe filename (e.g., `linting-angels.yml`), omitting the final `.md` extension, since Jekyll removes `.md` from URLs when generating the site. The actual file in the repo should still be named with `.md` (e.g., `linting-angels.yml.md`).

## 5. Example
To document and link to a config file:
1. Create `assets/misc/faith-failover.yml.md` with front matter and YAML code block.
2. In your post, link as:
   ```markdown
   [faith-failover.yml]({{ site.baseurl }}/assets/misc/faith-failover.yml.md)
   ```
   or
   ```html
   <a href="{{ site.baseurl }}/assets/misc/faith-failover.yml.md" target="_blank" rel="noopener">faith-failover.yml</a>
   ```

---

> Following these guidelines ensures your configuration/code docs are easy to find, visually consistent, and always work with your site's structure.
