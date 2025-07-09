---
layout: terminal_post
title: 'Purgatory in a Dockerfile'
date: 2025-04-04
tags: [docker, containers, middleware, logs]
summary: "A middleware configuration for purgatory, containerized for eternal monitoring and penance."
image: /assets/images/icons/system_logs.webp
category: eternal-resource-allocation-issues
---

<p class='center'>This is required middleware</p>

```Dockerfile
FROM node:latest
WORKDIR /purgatory
COPY . .
RUN npm install && npm run penance
CMD ["npm", "start", "--", "--repent"]
```

Your logs will be monitored. Eternally.
