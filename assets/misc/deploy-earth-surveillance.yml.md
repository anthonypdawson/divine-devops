---
title: "deploy-earth-surveillance.yml"
description: "Original deployment manifest for the Roswell incident."
layout: terminal_post
---

```yaml
# deploy-earth-surveillance.yml
apiVersion: heavenops/v1
kind: Deployment
metadata:
  name: divine-surveillance-mission
  labels:
    classification: "top-secret-divine"
    target: "earth-military-monitoring"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: divine-probe
  template:
    metadata:
      labels:
        app: divine-probe
    spec:
      containers:
      - name: surveillance-container
        image: aeon-registry.heaven.divine/divine-probe:v1.0.0
        env:
        - name: STEALTH_MODE
          value: "maximum"
        - name: REVELATION_THRESHOLD  
          value: "never"
        - name: CRASH_ON_ERROR
          value: "false"  # THIS WAS SUPPOSED TO BE FALSE!
        resources:
          requests:
            divine-energy: "1000 units"
            quantum-entanglement: "50 qubits"
```
