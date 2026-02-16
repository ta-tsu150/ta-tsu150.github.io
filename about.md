---
layout: default
title: About
---

<article class="post">
<div class="post-meta">
<p class="about-greeting">$ cat about.md</p>
</div>

<header class="post-header about-hidden" id="aboutHeader">
<h1 class="post-title">About</h1>
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
  var g = document.querySelector('.about-greeting');
  if (g) g.classList.add('animate');
  setTimeout(function() {
    document.getElementById('aboutHeader').classList.add('show');
  }, 1200);
  setTimeout(function() {
    document.getElementById('aboutContent').classList.add('show');
  }, 1300);
  setTimeout(function() {
    document.getElementById('aboutFooter').classList.add('show');
  }, 1600);
})();
</script>
