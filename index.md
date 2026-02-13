---
layout: default
---

<section class="hero">
  <p class="hero-greeting">$ whoami</p>
  <h1 class="hero-name">ta-tsu150</h1>
  <p class="hero-tagline">Cloud Infrastructure / DevOps / Platform Engineering</p>

  <div class="hero-terminal">
    <span class="line"><span class="key">role</span>: <span class="value">Full-Stack Engineer (Frontend / Backend / Infra)</span></span>
    <span class="line"><span class="key">stack</span>: <span class="value">AWS, React, Expo, Node.js, Docker</span></span>
    <span class="line"><span class="key">interests</span>: <span class="value">LLM活用, Security, DX改善</span></span>
    <span class="line"><span class="cursor"></span></span>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Skills</h2>
  <div class="skill-grid">
    <span class="skill-tag">AWS (S3 / CloudFront / Lambda / Cognito)</span>
    <span class="skill-tag">React</span>
    <span class="skill-tag">Expo / React Native</span>
    <span class="skill-tag">Node.js</span>
    <span class="skill-tag">Docker</span>
    <span class="skill-tag">SQL / DB Migration</span>
    <span class="skill-tag">Git / GitHub</span>
    <span class="skill-tag">CI/CD</span>
    <span class="skill-tag">Zapier / Slack Bot</span>
    <span class="skill-tag">Claude / LLM活用</span>
    <span class="skill-tag">TestFlight / Xcode</span>
    <span class="skill-tag">Google Apps Script</span>
    <span class="skill-tag">i18n</span>
    <span class="skill-tag">UI/UX設計</span>
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
