---
title: "Doubting Thomas: QA Won't Close the Resurrection Ticket"
date: 2025-07-22 08:30:00
layout: terminal_post
image: "/assets/images/posts/doubting-thomas-qa.webp"
summary: "HeavenOps incident report documenting QA engineer Thomas's refusal to approve resurrection deployment without tactile verification protocols."
tags: [thomas, qa, testing, resurrection, devops, heavenops, incident-report, verification]
category: divine-incident-report
---

*HeavenOps Incident Report #1127 - Post-Resurrection Deployment QA Blockage*

In the post-release chaos of the Resurrection deployment, the HeavenOps QA team was ready to sign off—except for one engineer: **Thomas**.

## The Incident

**Ticket #777: RESURRECTION-PROD-DEPLOY**
- Status: `BLOCKED - QA VERIFICATION PENDING`
- Assignee: Thomas (QA Lead)
- Sprint: Passion Week v3.3

The resurrection feature passed all automated tests, integration checks, and even a code review by Peter. However, Thomas refused to close the ticket, citing insufficient tactile verification:

> **Thomas:** "Unless I put my finger on the merge conflict and my hand into the side of the running process, I will not approve this release. The test coverage is incomplete."

## The Daily Standup

**Scrum Master:** "Any blockers?"

- **Product:** "The feature is live in production and users are reporting miraculous results."
- **QA (Thomas):** "Show me the logs. No, show me the running process. No, let me `exec` into the container and poke it myself."
- **DevOps:** "We have 100% uptime, all health checks are green, and monitoring shows zero errors."
- **QA (Thomas):** "Not good enough. I want to see the nail holes in the deployment and the wounds in the container runtime."

## Resolution Protocol

1. **Jesus appears in the staging environment** and invites Thomas to run a hands-on integration test.
2. **Thomas executes manual verification:**
   ```bash
   kubectl exec -it resurrection-pod -- /bin/bash
   curl -X POST /api/v1/wounds/verify --data '{"finger": true, "hand": true}'
   ```
3. **Response:** `{"status": "verified", "wounds": "visible", "doubts": "resolved"}`
4. **Thomas finally updates the ticket:** `Status: APPROVED - TACTILE VERIFICATION COMPLETE`

## Lessons Learned

- **Trust but verify:** Some QA engineers require more than green builds—they need physical proof and hands-on validation.
- **Budget for edge cases:** Always allocate extra story points for tactile verification in your post-miracle sprints.
- **Documentation matters:** Even miraculous deployments need proper test evidence and audit trails.
- **Staging environment access:** Ensure your QA team can directly interact with running processes when standard monitoring isn't enough.

## Team Retrospective Notes

> **Thomas:** "My bad for blocking the release, but you have to understand—resurrection is a pretty big feature. We can't just YOLO it to prod."
> 
> **Jesus:** "No worries, Thomas. Thorough QA prevents production incidents. Just maybe trust the process a little more next time?"

---

> _"Blessed are those who merge without seeing, but some QA will always want to poke the process."_
