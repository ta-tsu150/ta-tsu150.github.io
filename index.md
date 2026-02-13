---
layout: default
---

<section class="hero">
  <p class="hero-greeting">$ whoami</p>
  <h1 class="hero-name">ta-tsu150</h1>
  <p class="hero-tagline">Cloud Infrastructure / DevOps / Platform Engineering</p>

  <div class="hero-terminal">
    <span class="line"><span class="key">role</span>: <span class="value">クラウド基盤 / 開発基盤</span></span>
    <span class="line"><span class="key">stack</span>: <span class="value">AWS, Kubernetes, Terraform</span></span>
    <span class="line"><span class="key">interests</span>: <span class="value">LLM活用, Observability, Security</span></span>
    <span class="line"><span class="cursor"></span></span>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Skills</h2>
  <div class="skill-grid">
    <span class="skill-tag">AWS</span>
    <span class="skill-tag">Kubernetes</span>
    <span class="skill-tag">Terraform</span>
    <span class="skill-tag">Docker</span>
    <span class="skill-tag">CI/CD</span>
    <span class="skill-tag">Observability</span>
    <span class="skill-tag">LLM</span>
    <span class="skill-tag">Security</span>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Recent Posts</h2>
  <ul class="post-list">
    {% for post in site.posts limit:5 %}
    <a href="{{ post.url | relative_url }}" class="post-item">
      <div class="post-item-date">{{ post.date | date: "%Y-%m-%d" }}</div>
      <div class="post-item-title">{{ post.title }}</div>
    </a>
    {% endfor %}
  </ul>
</section>
