---
title: "cosmic-navigation.yml"
description: "The offending configuration that caused the Roswell incident."
layout: terminal_post
---

```yaml
# cosmic-navigation.yml - The offending configuration
apiVersion: aeon/v1
kind: DivineProbe
metadata:
  name: experimental-surveillance
  namespace: earth-monitoring
spec:
  trajectory:
    target: "military-installation-surveillance"
    coordinates: 
      latitude: 33.3942  # BUG: Missing negative sign!
      longitude: -104.5230
    altitude: "stealth-mode"
  payload:
    - consciousness-scanner-v2.1
    - reality-distortion-field
    - emergency-revelation-beacon
  # MERGE CONFLICT ARTIFACT BELOW:
  <<<<<<< HEAD
  landing_protocol: "gentle-descent"
  =======
  landing_protocol: "dramatic-crash"  # WHY IS THIS EVEN AN OPTION?!
  >>>>>>> feature/dramatic-revelations
```
