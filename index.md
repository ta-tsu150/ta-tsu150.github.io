---
layout: default
---

<section class="hero">
  <p class="hero-greeting">$ whoami</p>
  <h1 class="hero-name">Tatsuya Ichino</h1>
  <p class="hero-tagline">Cloud Infrastructure / DevOps / Platform Engineering</p>

  <div class="hero-terminal">
    <span class="line"><span class="key">role</span>: <span class="value">Full-Stack Engineer (Frontend / Backend / Infra)</span></span>
    <span class="line"><span class="key">stack</span>: <span class="value">TypeScript, AWS, Azure, Vue.js / Nuxt, React Native, NestJS, C# / .NET, Docker</span></span>
    <span class="line"><span class="key">interests</span>: <span class="value">AI活用</span></span>
    <a href="{{ '/about' | relative_url }}" class="terminal-cmd"><span class="prompt">$</span> cat about.md<span class="cursor"></span></a>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Skills</h2>
  <div class="skill-grid">
    <span class="skill-tag">TypeScript</span>
    <span class="skill-tag">C# / .NET</span>
    <span class="skill-tag">Vue.js / Nuxt.js</span>
    <span class="skill-tag">NestJS / Prisma</span>
    <span class="skill-tag">Expo / React Native</span>
    <span class="skill-tag">Node.js</span>
    <span class="skill-tag">PostgreSQL</span>
    <span class="skill-tag">AWS</span>
    <span class="skill-tag">Azure</span>
    <span class="skill-tag">Docker</span>
    <span class="skill-tag">DDD / Clean Architecture</span>
    <span class="skill-tag">TDD</span>
    <span class="skill-tag">REST API / Swagger</span>
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
  <h2 class="section-title">Trajectory</h2>
  <div class="git-log">
    <div class="git-log-cmd">$ git log --oneline --graph</div>
    {% for post in site.posts %}
    <a href="{{ post.url | relative_url }}" class="git-log-entry">
      <span class="git-graph">{% if forloop.last %}└{% else %}├{% endif %}─</span>
      <span class="git-hash">{{ post.date | date: "%y%m%d" }}</span>
      <span class="git-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <span class="git-msg">{{ post.title }}</span>
    </a>
    {% endfor %}
  </div>
</section>
