---
title: "Publishing Future Posts"
summary: "How to move a post from the /future/ collection to the main blog in Divine DevOps."
layout: terminal_post
---

# Publishing Future Posts

This guide explains how to publish a post from the `_future/` collection so it appears as a standard blog post.

## Publishing Strategy

- **Spacing:** Posts should be spaced 2-4 days apart for optimal reader engagement
- **Timing:** Posts are typically published at 8:00 AM 
- **Scheduling:** Update the date in front matter to when you want the post to go live

## Steps to Publish a Future Post

### 1. Update Front Matter Date
- Change the `date` field to your desired publication date
- Use format: `YYYY-MM-DD HH:MM:SS` (typically `08:00:00`)
- Ensure the date doesn't conflict with existing posts (check your calendar)

### 2. Move and Rename File
- Move from `_future/` to `_posts/YYYY/MM/` directory
- Rename to match Jekyll convention: `YYYY-MM-DD-title.md`
- Create the year/month directories if they don't exist

### 3. Verify Front Matter
- Ensure all required fields are present: `layout`, `title`, `date`, `category`, `tags`, `summary`
- Check that `tags` include all proper names mentioned in the post
- Verify `image` and `image_alt` fields if post has featured image

### 4. Clean Up
- **Delete the original file** from `_future/` to avoid duplicates
- This step is required for a clean publish

### 5. Site Rebuild
- The site is published automatically at **9am**
- Also rebuilds on new pushes to the repository
- For local testing: `bundle exec jekyll serve` or `netlify dev`

## Example Complete Workflow

Here's the complete process we just used for the "Afterlife 2.0" post:

```powershell
# 1. Update front matter date (in VS Code)
# Change: date: 2025-08-24 08:00:00
# To:     date: 2025-09-03 08:00:00

# 2. Create directory structure if needed
New-Item -Path "_posts\2025\09" -ItemType Directory -Force

# 3. Move and rename file
Move-Item "_future\afterlife-2-0-onboarding-and-deployment.md" "_posts\2025\09\2025-09-03-afterlife-2-0-onboarding-and-deployment.md"

# 4. Clean up original (if move didn't remove it)
Remove-Item "_future\afterlife-2-0-onboarding-and-deployment.md" -ErrorAction SilentlyContinue
```

## Pre-Publication Checklist

- [ ] Front matter date updated to publication date
- [ ] File moved to `_posts/YYYY/MM/` with correct filename
- [ ] All proper names included in `tags`
- [ ] Image fields present if post has featured image
- [ ] Original file removed from `_future/`
- [ ] Publication date doesn't conflict with existing posts

---

> Following this process ensures your future posts are published cleanly and appear as intended in your Divine DevOps blog.
