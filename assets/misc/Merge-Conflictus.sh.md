---
title: "Merge-Conflictus.sh"
summary: "Judgement script for PRs. Tags with a crimson ❌ if merge conflicts are detected. Dantean Migration Bureau."
layout: terminal_post
---

```
git fetch origin "$BRANCH1" && git fetch origin "$BRANCH2"
git checkout "$BRANCH1" || exit 2
git merge --no-commit --no-ff "$BRANCH2" 2>&1 | tee merge_output.txt
git merge --abort
```

```bash
#!/bin/bash
# Merge-Conflictus.sh
# Dantean Migration Bureau: Judgement script for PRs
# As referenced in "The Nine Circles of Deployment" field report.
# Only to be run under a crimson moon or when the backlog howls.

# Usage: ./Merge-Conflictus.sh <branch1> <branch2>
# Tags PRs with a crimson ❌ if merge conflicts are detected
# If Lucifork appears, abort and deploy a hotfix directly to Production.

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <branch1> <branch2>"
  echo "(Summon a junior engineer for moral support.)"
  exit 1
fi

BRANCH1="$1"
BRANCH2="$2"

# Fetch latest code from the Limbo of Deprecated APIs
git fetch origin "$BRANCH1" && git fetch origin "$BRANCH2"

# Enter the Whirlwind of Conflicting Merge Requests
git checkout "$BRANCH1" || { echo "Abandoned in Circle I. Abandon hope."; exit 2; }

# Attempt the forbidden merge ritual
git merge --no-commit --no-ff "$BRANCH2" 2>&1 | tee merge_output.txt

if grep -q "CONFLICT" merge_output.txt; then
  echo -e "\e[31m❌ Merge conflict detected between $BRANCH1 and $BRANCH2!\e[0m"
  echo "Tagging PR with crimson ❌..."
  echo "You have entered Circle II. Prepare for eternal rebase."
  echo "Summoning Lucifork..."
  echo "If three heads appear, deploy a hotfix and update the changelog in fire."
  # Simulate tagging (replace with actual API call if needed)
else
  echo -e "\e[32m✅ No merge conflicts found. You may ascend to the next Circle.\e[0m"
fi

# Cleanse the repository of forbidden merge attempts
git merge --abort
rm -f merge_output.txt
```