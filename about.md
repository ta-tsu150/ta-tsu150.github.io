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

<div class="about-terminal about-hidden" id="aboutSlideshow">
<div class="slideshow">
<img src="{{ '/assets/images/slide1.png' | relative_url }}" class="slide active" alt="slide 1">
<img src="{{ '/assets/images/slide2.png' | relative_url }}" class="slide" alt="slide 2">
<img src="{{ '/assets/images/slide3.png' | relative_url }}" class="slide" alt="slide 3">
</div>
</div>

<div class="post-content about-hidden" id="aboutContent" markdown="1">

## Profile

#### name
市野 達也 / Tatsuya Ichino

#### birthday
2004/11/10

#### height
183.8cm
#### weight
75.2kg

#### birthplace
三重県

#### favorite
猫

#### hobby
ウィスキー, タバコ, 麻雀, サバゲー, ゲーム(FPS全般, アークナイツ, ZZZ, etc...)



## history

#### 2004年11月～
爆誕  

近所を走り回りめちゃくちゃ寝るガキンチョとして幼生を過ごす  

小～中学で7年間バスケ
運動神経はそこそこよかったけど頭は良くなかった  

#### 2020年4月～

地元工業高校に入学  

情報技術を専攻する学科に進み, 人生で初めてパソコンに触れる
工業高校らしく第二種電気工事士などの工業資格も取得しつつ, WordをはじめとするPCソフトの検定等も複数取得  

ハンドボール部に所属し, 初心者入部ながら主将に成るなど, ここでの経験が現在の自分の人格形成に大きく寄与した  
最後の大会で優秀選手賞受賞, 三重国体選手選抜に抜擢されるも, 進学を決意していたこともあり拒否, ラウンドワンで接客のアルバイトを始める  

#### 2023年4月～

名古屋の専門学校 情報学科に入学  
Webアプリケーション作成をはじめに情報技術を本格的に触り始める
IPAの基本/応用情報技術者をはじめとする複数の資格も取得  

#### 2025年4月

現在勤務している会社に新卒入社  
フルスタックエンジニアとしてWebアプリケーション・モバイルアプリ・クラウドインフラの設計・開発に従事  

本配属後はすったもんだあって会社の荒波にもまれることに...  


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
    document.getElementById('aboutSlideshow').classList.add('show');
  }, 1350);
  setTimeout(function() {
    document.getElementById('aboutContent').classList.add('show');
  }, 1500);
  setTimeout(function() {
    document.getElementById('aboutFooter').classList.add('show');
  }, 1800);

  var slides = document.querySelectorAll('.slideshow .slide');
  if (slides.length > 1) {
    var current = 0;
    setInterval(function() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4000);
  }
})();
</script>
