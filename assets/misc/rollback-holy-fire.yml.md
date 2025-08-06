---
title: "rollback-holy-fire.yml"
summary: "Incident response workflow for rolling back failed divine interventions."
layout: terminal_post
---

```yaml
name: Rollback Holy Fire
on:
  workflow_dispatch:
jobs:
  rollback:
    runs-on: ethereal-k8s
    steps:
      - name: Identify Failed Miracles
        run: |
          faithctl list --failed
      - name: Rollback
        run: |
          faithctl rollback --all
```
