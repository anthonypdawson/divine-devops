---
title: "Publishing Future Posts"
summary: "How to move a post from the /future/ collection to the main blog in Divine DevOps."
layout: terminal_post
---

# Publishing Future Posts

This guide explains how to publish a post from the `/future/` collection so it appears as a standard blog post.

## Steps to Publish a Future Post

1. **Move the File**
   - Move the markdown file from `_future/` to the appropriate `_posts/YYYY/MM/` directory.
   - Rename the file to match the Jekyll post convention: `YYYY-MM-DD-title.md`.

2. **Check Front Matter**
   - Ensure the front matter includes the correct `layout`, `title`, `date`, and any other required fields.
   - The `date` should match the filename and be set to today or earlier if you want it to appear immediately.
   - By convention, we usually use the time `8:00:00` for new posts.
   - The site is published twice daily at **9am** and **1pm**, and also whenever a new push is made—set your post date/time accordingly if you want it to appear in the next publish window.

3. **Update Links (if needed)**
   - If the post references other future docs or files, update links to point to their new locations if they move as well.

4. **Rebuild the Site**
   - Delete the `_site` directory to clear any cached builds.
   - Run `bundle exec jekyll build` or `bundle exec jekyll serve` to regenerate the site.

5. **Verify Appearance**
   - Check the site to ensure the post appears in the main blog feed and archives as expected.

6. **Remove from /future/**
   - Delete the original file from `/future/` to avoid duplicates. This step is required for a clean publish.

---

> Following this process ensures your future posts are published cleanly and appear as intended in your Divine DevOps blog.
