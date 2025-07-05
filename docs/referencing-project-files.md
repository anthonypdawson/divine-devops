## Referencing Project Files in Documentation

When including project files (such as YAML workflows, configuration files, or code snippets) in your documentation, follow these best practices for clarity and compatibility with static site generators:

### 1. Use Markdown Wrappers for Non-Standard Files
- Rename files to include a `.md` extension (e.g., `linting-angels.yml.md`) so they are included in the site build output.
- Add YAML front matter at the top for proper rendering and discoverability.
- Wrap the file contents in a fenced code block with the appropriate language tag (e.g., <code>```yaml</code> for YAML files).

### 2. Reference Files in Posts and Docs
- In your posts, link to the file using the path and the original file extension for aesthetics (e.g., `[linting-angels.yml](/divine-devops/assets/misc/linting-angels.yml)`), even if the actual file is `.yml.md`.
- This keeps links clean and familiar for readers, while the `.md` extension ensures the file is published.

### 3. Example Formatting

```markdown
---
title: "Cloud of Glory Deployment Ritual"
description: "Releases miracles via the Ethereal Kubernetes cluster."
layout: terminal_post
---

```yaml
# Cloud of Glory Deployment Ritual
# Releases miracles via the Ethereal Kubernetes cluster.
name: Continuous Deployment
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  deploy-to-cloud:
    runs-on: throne-hosted
    steps:
      - name: Summon Miracle Artifacts
        uses: actions/checkout@v4
      - name: Deploy to Cloud of Glory
        run: |
          echo "Ascending miracles to the cloud of glory..."
          echo "Notifying cherubim for post-deployment blessings..."
          echo "Deployment status: MIRACULOUS (or flagged for divine intervention)"
```
```

### 4. Site Generator Configuration
- If using Jekyll or a similar static site generator, ensure your `_config.yml` includes the relevant `.md` files in the `assets` directory so they are published.

### 5. Summary
This approach ensures your project files are readable, linkable, and included in your published documentation, while maintaining a clean and user-friendly experience for your readers.
