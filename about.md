---
layout: default
title: About
---

<article class="post">
<header class="post-header">
<h1 class="post-title about-hidden">About</h1>
<div class="post-meta">
<span class="prompt">$</span> <span id="aboutCmd"></span><span class="typing-cursor">_</span>
</div>
</header>

<div class="post-content about-hidden" id="aboutContent" markdown="1">

## Profile

市野 達也 / Tatsuya Ichino

2025年4月に新卒入社し、フルスタックエンジニアとしてWebアプリケーション・モバイルアプリ・クラウドインフラの設計・開発に従事。

## Focus

- **Backend**: NestJS / C# .NET によるREST API設計・DDD
- **Frontend**: Vue.js / Nuxt.js によるWebアプリケーション開発
- **Mobile**: Expo / React Native によるクロスプラットフォーム開発
- **Infra**: AWS / Azure のクラウドアーキテクチャ設計・構築
- **Quality**: TDD・AIコードレビュー・自動テストによる品質担保

## Links

- [GitHub](https://github.com/ta-tsu150)

</div>

<footer class="post-footer about-hidden" id="aboutFooter">
<a href="{{ '/' | relative_url }}" class="back-link">
<span class="prompt">$</span> cd ../ && clear<span class="cursor"></span>
</a>
</footer>
</article>

<script>
(function() {
  var cmd = 'cat about.md';
  var el = document.getElementById('aboutCmd');
  var typingCursor = document.querySelector('.typing-cursor');
  var i = 0;

  function typeCmd() {
    if (i < cmd.length) {
      el.textContent = cmd.substring(0, i + 1);
      i++;
      setTimeout(typeCmd, 20);
    } else {
      typingCursor.style.display = 'none';
      setTimeout(function() {
        document.querySelector('.post-title').classList.add('show');
      }, 200);
      setTimeout(function() {
        document.getElementById('aboutContent').classList.add('show');
      }, 500);
      setTimeout(function() {
        document.getElementById('aboutFooter').classList.add('show');
      }, 800);
    }
  }

  setTimeout(typeCmd, 300);
})();
</script>
