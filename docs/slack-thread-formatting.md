# Slack Thread Formatting Guidelines

Slack threads are a recurring feature in the Divine DevOps Universe, used to add humor, context, or in-universe commentary to posts. Below are the guidelines for formatting and structuring Slack threads, along with an example.

## Purpose
Slack threads are used to:
- Simulate in-universe team discussions or banter.
- Provide additional context or humor related to the main event.
- Highlight reactions or commentary from key characters.

## Structure
1. **Container**: Use a `<div class="slack-log">` to wrap the entire thread.
2. **Message Block**: Each message is a `<div class="slack-msg">`.
3. **Header**: Include a `<div class="slack-header">` with:
   - `<span class="slack-user [username]">`: The sender's name.
   - `<span class="slack-time">`: The timestamp of the message.
4. **Message Text**: Use a `<div class="slack-text">` for the message content.

> **Note**: The modular includes (`slack-thread-start.html`, `slack-thread-message.html`, and `slack-thread-end.html`) will generate this structure automatically.

## Example 1: Using Includes

To simplify Slack thread creation, you can use the modular includes:

```liquid
{% include slack-thread-start.html %}

{% include slack-thread-message.html user="Gabriel" time="3:32pm" text="Did anyone check the quota limits?" %}
{% include slack-thread-message.html user="Michael" time="3:33pm" text="Confirmed. No throttling. This is above my pay grade." %}
{% include slack-thread-message.html user="Jesus" time="3:34pm" text="Just making sure everyone’s fed. 😇" %}

{% include slack-thread-end.html %}
```

This approach ensures consistency and reduces the need to write repetitive HTML.

---

## Example 2: Using Plain HTML

If you prefer to write the Slack thread manually, you can use the following structure:

```html
<div class="slack-log">
  <div class="slack-msg">
    <div class="slack-header">
      <span class="slack-user gabriel">Gabriel</span>
      <span class="slack-time">3:32pm</span>
    </div>
    <div class="slack-text">Did anyone check the quota limits?</div>
  </div>
  <div class="slack-msg">
    <div class="slack-header">
      <span class="slack-user michael">Michael</span>
      <span class="slack-time">3:33pm</span>
    </div>
    <div class="slack-text">Confirmed. No throttling. This is above my pay grade.</div>
  </div>
  <div class="slack-msg">
    <div class="slack-header">
      <span class="slack-user jesus">Jesus</span>
      <span class="slack-time">3:34pm</span>
    </div>
    <div class="slack-text">Just making sure everyone’s fed. 😇</div>
  </div>
</div>
```

This method gives you full control over the HTML but requires more effort to maintain consistency.

## Best Practices
- **Tone**: Keep the tone consistent with the post's theme (e.g., humorous, formal, critical).
- **Characterization**: Use distinct voices for each character to enhance immersion.
- **Length**: Keep threads concise and relevant to the main event.
- **Formatting**: Ensure proper nesting and indentation for readability.
- **User-Specific Classes**: For each user in a Slack thread, add their name as a class in the `_slack.scss` file and assign them a unique color. This helps visually distinguish messages from different users.
  - Example:
    ```scss
    .slack-user.gabriel {
      color: #3498db; /* Blue */
    }
    .slack-user.michael {
      color: #e74c3c; /* Red */
    }
    .slack-user.jesus {
      color: #2ecc71; /* Green */
    }
    ```

---

## User-Specific Colors

To assign distinct colors to specific users in Slack threads, use the `.slack-user.[username]` pattern. This allows for unique styling for key characters. For example:

```scss
.slack-user.jonah {
    color: yellowgreen; // Jonah's distinct color
}
```

### Example Usage

```html
<span class="slack-user jonah">Jonah</span>
```

This will render Jonah's username with the specified color defined in the CSS.

> **Note**: Ensure that the username matches the class name exactly (e.g., `jonah` for `.slack-user.jonah`).

---

## Header Title for Slack Threads

When adding a Slack thread to a post, use the header title `Slack Thread` at an appropriate level (e.g., `###`, `##`, or `####`) depending on the post's structure. Avoid including the channel name in the header, as it should be specified in the `slack-thread-start.html` include.

### Example

```markdown
### Slack Thread

{% include slack-thread-start.html channel="#example-channel" %}
{% include slack-thread-message.html user="user" time="time" text="message" %}
{% include slack-thread-end.html %}
```

By following these guidelines, Slack threads can effectively enhance the narrative and humor of your posts.

## Avatar Images

- You can pass an `avatar_url` parameter to the `slack-thread-message.html` include to specify a custom avatar image for a user.
- The image should be compatible with a size of 36x36 pixels for optimal display.
- If no `avatar_url` is provided, a default avatar image will be used.
- The avatar image will be displayed as a rounded circle to match the Slack thread styling.
- Example usage:
  ```liquid
  {% include slack-thread-message.html user="uriel" time="9:42AM" text="Message content here." avatar_url="/path/to/avatar.webp" %}
  ```

## Avatar Image Fallback

Each Slack message can include an avatar image for the user. The system attempts to load a user-specific avatar from the `/assets/images/slack/` directory, using the username to construct the filename (e.g., `uriel.webp` for the user `uriel`).

If a user-specific avatar is not found, the system automatically falls back to a default avatar image located at `/assets/images/slack/slack-avatar.webp`.

> **Tip**: To add a custom avatar for a user, place a `.webp` image file in the `/assets/images/slack/` directory with the username as the filename (e.g., `gabriel.webp`).

## Avatar Options

- You can pass a custom avatar using the `avatar` parameter in the include.
- The avatar can be a URL, a path to an image, or a text/emoji character (e.g., `avatar="😇"`).
- If you pass an emoji or text, it will be displayed as the avatar for that message.
- Example:
  ```liquid
  {% include slack-thread-message.html user="gabriel" avatar="😇" time="3:32pm" text="Did anyone check the quota limits?" %}
  ```

## Username Convention

- **Always use all lowercase usernames** in Slack thread includes (e.g., `user="gabriel"`).
- This ensures consistent styling and correct avatar image linking, especially on case-sensitive systems.
- Example:
  ```liquid
  {% include slack-thread-message.html user="gabriel" time="3:32pm" text="Did anyone check the quota limits?" %}
  ```
