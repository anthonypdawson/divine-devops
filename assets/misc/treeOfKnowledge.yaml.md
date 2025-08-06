---
layout: terminal_post
title: "treeOfKnowledge.yaml"
description: "Configuration manifest for the Tree of Knowledge API."
---

# treeOfKnowledge.yaml

```yaml
apiVersion: eden/v1
kind: TreeOfKnowledge
metadata:
  name: forbidden-fruit
  location: eden-prod
spec:
  access:
    enabled: false  # WARNING: Do not set to true without divine approval
    audit:
      - cherubim-firewall
      - guilt-traceback
  fruit:
    type: apple
    status: forbidden
    sideEffects:
      - moral_ambiguity
      - recursive_choice
      - fig_leaf_patch
  rollback:
    allowed: false
    protocol: "Judgment Conflict"
  security:
    agents:
      - serpent-agent-v1.0
    permissions:
      - readOnly: true
      - admin: archangel
  notes:
    - "Do not merge curiosity-driven branches into main."
    - "Legacy code may bypass compliance checks."
```

---

_Summary: The infamous config that enabled forbidden fruit access and triggered the first rollback in Eden. Contains deprecated security settings and a warning about curiosity-driven branches._
