---
layout: default
---

# てすと

てすと

ふぁーすとてすとぷっしゅ

---

## Navigation
- 🏠 Home: /
- 📝 Blog一覧: /blog.html
- 📬 GitHub: https://github.com/ta-tsu150

---

## Links
- GitHub: https://github.com/ta-tsu150

---

## About
- 仕事: クラウド基盤 / 開発基盤
- 技術: AWS / Kubernetes / Terraform
- 興味: LLM活用 / Observability / Security

---

## Blog
ブログ一覧 → /blog.html

---

## 最近の投稿

{% for post in site.posts limit:3 %}
- {{ post.date | date: "%Y-%m-%d" }}  
  [{{ post.title }}]({{ post.url }})
{% endfor %}

→ すべて見る: /blog.html
