# How to Create a New Topic

The `/topics` directory contains Markdown files that define and organize the various themes and categories for posts in the Divine DevOps Universe. Each topic file serves as a guide for contributors to create posts under that topic. Below are the rules and guidelines for creating and maintaining topic files:

## Purpose of Topic Files
- Provide a clear and concise description of the topic.
- Include example post ideas to inspire contributors.
- Define the layout and structure for posts under the topic.
- Specify any special conventions or rules unique to the topic.

## Steps to Create a New Topic File

1. **File Naming**
   - Use a descriptive, kebab-case filename (e.g., `divine-debugging-chronicles.md`).

2. **Front Matter**
   - Every topic file must include the following YAML front matter:
     ```yaml
     ---
     category: topic
     ---
     ```

3. **Content Structure**
   - Start with a clear and engaging title for the topic.
   - Add a section for **Incident Ideas** or **Post Ideas** to provide examples of potential posts.
   - Use the `## Recommended Post Structure` header to define the structure of posts under this topic. This section may include:
     - Summary
     - Incident Log
     - Root Cause Analysis
     - Mitigation Steps
     - Any unique sections relevant to the topic (e.g., "Divine Debugging Chronicles" or "Heavenly Metrics Dashboard").

4. **Special Conventions**
   - If the topic has unique rules or conventions, include a section to outline them (e.g., "Special Conventions").

5. **Example Post Structure**
   - Provide a detailed example of how a post under this topic should be formatted. Use in-universe language and humor to maintain the tone of the Divine DevOps Universe.

## Categorization Guidance

- Ensure posts are categorized under an existing topic where possible.
- If no suitable topic exists, create a new one using the steps outlined in this document.
- Collaborate with the team to maintain consistency in topic naming and structure.
- Refer to [AI-Assisted Post Categorization](./ai-categorization.md) for examples and progress.

## Example Topic File Template
```markdown
---
category: topic
---

# [Topic Title]

## Incident Ideas
- Example idea 1.
- Example idea 2.
- Example idea 3.

## Recommended Post Structure

### **Summary**
Provide a brief overview of the incident or post.

### **Incident Log**
- **Date:**
- **Location:**
- **Trigger:**
- **Outcome:**

### **Root Cause Analysis**
Explain the underlying reasons for the incident.

### **Mitigation Steps**
1. Step 1.
2. Step 2.
3. Step 3.

### **Special Conventions**
- Add any unique rules or conventions for this topic.

### **Status**
Current resolution status.
```
