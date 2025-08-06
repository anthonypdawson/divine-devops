---
layout: terminal_post
title: "Future Posts"
permalink: /future/
---


<ul>
  {% for post in site.future %}
  <li>
    <em>{{ post.date | date: "%Y-%m-%d" }}</em>:
    <a href="{{ post.url | relative_url }}#content" title="{{ post.summary | escape }}">{{ post.title }}</a>
    <br>
    {% if post.image %}
    <a href="{{ post.url | relative_url }}#content" title="{{ post.title }}">
      <img class="small-post-image" style="max-width: 40%;" src="{{ post.image | relative_url }}" alt="{{ post.title }} image">
    </a>
    {% endif %}
    <small class="post-summary">{{ post.summary }}</small>
  </li>
  {% endfor %}
</ul>