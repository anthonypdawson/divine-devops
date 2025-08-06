---
layout: terminal_post
title: "Categories"
permalink: /categories/
---

{% assign sorted_categories = site.categories | sort %}
{% assign uncategorized_posts = site.posts | where_exp: "post", "post.categories == empty" %}
<ul>
  {% for category in sorted_categories %}
    <li><a href="#{{ category[0] }}">{{ category[0] }} ({{ category[1].size }})</a></li>
  {% endfor %}
  <li><a href="#uncategorized">Uncategorized ({{ uncategorized_posts | size }})</a></li>
</ul>

--- 

{% for category in sorted_categories %}
  <h2 id="{{ category[0] }}">{{ category[0] }}</h2>
  <ul>
    {% for post in category[1] %}
      <li>
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<h2 id="uncategorized">Uncategorized</h2>
<ul>
  {% assign uncategorized_posts = site.posts | where_exp: "post", "post.categories == empty" %}
  {% for post in uncategorized_posts %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>