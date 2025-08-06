---
title: "pre-deploy.bless"
summary: "A sacred git pre-push hook to ensure all commits are spiritually pure and free of eldritch horrors."
layout: terminal_post
---

# pre-deploy.bless (Git Hook)

This sacred pre-push incantation is issued by the HeavenOps Bureau of Compliance. Place the blessed `pre-deploy.bless` scroll in your `.git/hooks/` directory and ensure it is executable by the angels (and your CI/CD pipeline).

```sh
#!/bin/sh
# HeavenOps Bureau of Compliance: pre-deploy.bless
# This sacred script ensures all code is pure before ascending to the remote repository.

# Divine Audit: Scan for forbidden incantations
if git diff --cached | grep -E 'eldritch|apocalypse|summon'; then
  echo "\033[31m[HeavenOps] Forbidden incantation detected in commit!\033[0m"
  exit 1
fi

# Divine Audit: No TODOs shall pass
if git diff --cached | grep -i 'TODO'; then
  echo "\033[33m[HeavenOps] Thou shalt not push with TODOs!\033[0m"
  exit 1
fi

# Blessing Complete
echo "\033[32m[HeavenOps] Commit is blessed. Proceed with the push!\033[0m"
exit 0
```

> _"Blessed are those who lint, for their code shall inherit the cloud."_
