---
layout: terminal_post
title: 'Post Archive'
permalink: /archive/
---

<div>Search through all posts by tag</div>
<hr />

{% assign min_size = 1.0 %}
{% assign max_size = 2.2 %}
{% assign max_count = 0 %}
{% for tag in site.tags %}
  {% if tag[1].size > max_count %}
    {% assign max_count = tag[1].size %}
  {% endif %}
{% endfor %}

<button id="toggle-tags" style="display:none;">Show all tags</button>
<div id="tag-collapsible" class="archive tag-cloud">
  {% for tag in site.tags %}
    {% assign count = tag[1].size %}
    {% if max_count > 0 %}
      {% assign size_diff = max_size | minus: min_size %}
      {% assign rel_size = count | times: size_diff | divided_by: max_count %}
      {% assign size = min_size | plus: rel_size %}
    {% else %}
      {% assign size = min_size %}
    {% endif %}
<a class='archive-tag' href="#{{ tag[0] }}" style="font-size:{{ size }}em;">{{ tag[0] }} ({{ count }})</a>
  {% endfor %}
</div>
<hr />
<br />
<div id="tags-list">
  {% for tag in site.tags %}
    <div class="tag-list">
      <h2 class="post-list-heading line-bottom">
        #{{ tag[0] }} [{{ tag[1].size }}]:
      </h2>
      <a name="{{ tag[0] | slugize }}"></a>
      <ul class="post-list post-list-narrow">
        {% for post in tag[1] %}
          <li>
            {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
            <b>
              <a href="{{ post.url | relative_url }}">
                {{ post.title | escape }}
              </a>
            </b><br /><i>{{ post.date | date: date_format }}</i>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>
