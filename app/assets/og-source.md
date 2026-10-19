# og-source.png

SNS 共有用画像 `public/og.jpg` の生成元。デザインツールからの書き出し
（1733×907）をそのまま可逆圧縮したもの。

このディレクトリのファイルは import しない限りビルドに含まれないので、
配信物には出ない（元画像 474KB がそのまま載るのを避けるため public/ ではなくここ）。
favicon-source.png と同じ扱い。

作り直すとき:

```js
sharp('app/assets/og-source.png')
  .resize(1200, 630, { fit: 'fill' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg')
```

- 1200×630 は Open Graph の標準寸法。元は 1733×907（比 1.9107）で、目標の
  1.9048 とは 0.3% しか違わないので `fit: 'fill'` で潰して問題ない
- JPEG で、WebP にはしない。X と LinkedIn のクローラは WebP の扱いが安定しない
- 品質は 82。グラデーションが主体なので PNG は分が悪く（1200×630 の可逆 PNG で
  857KB）、q82 で 51KB になる。q90 は 72KB で PSNR 39.0dB、q82 は 37.3dB だが、
  グラデーション部と本文の縁を2倍に拡大して比べてもバンディング・リンギングは
  出ていない
- 文言は `app/data/profile.ts` の `role`・`tagline` と揃える。画像・`description`・
  `og:description`・本文で肩書きが食い違っていたのが、レビューの C-3
