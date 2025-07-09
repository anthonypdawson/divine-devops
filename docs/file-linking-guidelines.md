---
title: "File Linking & Configuration Docs Guidelines"
summary: "How to create, document, and link to configuration or code files in the Divine DevOps Universe."
layout: terminal_post
---

# File Linking & Configuration Docs Guidelines

To keep documentation consistent, readable, and navigable, follow these steps when adding configuration, YAML, or other code files as documentation:

## 1. File Naming
- Name the file as `filename.ext.md` (e.g., `faith-failover.yml.md`, `miracle-backlog.md.md`).
- This preserves the original filename for clarity and makes it easy to reference in posts.

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
  [filename.ext]({{ site.baseurl }}/assets/misc/filename.ext.md)
  ```
- For links that should open in a new window, use HTML:
  ```html
  <a href="{{ site.baseurl }}/assets/misc/filename.ext.md" target="_blank" rel="noopener">filename.ext</a>
  ```

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
