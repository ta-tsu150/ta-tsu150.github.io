---
layout: default
title: Blog
---

<section class="section">
  <h2 class="section-title">All Posts</h2>
  <ul class="post-list">
    {% for post in site.posts %}
    <a href="{{ post.url | relative_url }}" class="post-item">
      <div class="post-item-date">{{ post.date | date: "%Y-%m-%d" }}</div>
      <div class="post-item-title">{{ post.title }}</div>
    </a>
    {% endfor %}
  </ul>
</section>
