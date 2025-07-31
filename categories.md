---
layout: terminal_post
title: "Categories"
permalink: /categories/
---

<h1>Categories</h1>
<ul>
  {% for category in site.categories %}
    <li>
      <a href="#{{ category[0] }}">{{ category[0] }}</a> ({{ category[1].size }})
    </li>
  {% endfor %}
</ul>

{% for category in site.categories %}
  <h2 id="{{ category[0] }}">{{ category[0] }}</h2>
  <ul>
    {% for post in category[1] %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
    {% endfor %}
  </ul>
{% endfor %}