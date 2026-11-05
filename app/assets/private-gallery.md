# private-gallery

`/private` のスライドショーが使う `public/images/private/*.jpg` の作り方。
og-source.png・favicon-source.png と同じ扱いで、**元写真はこのリポジトリに入れない。**

元は手元の写真フォルダにあり、1枚 1〜2MB・最大 5184×3456。そのまま入れると、

- `public/` の中身は原寸でそのまま配信される（表示には 1920 しか要らないのに）
- git に入った画像は削除しても履歴から消えない

の2つを同時に踏む。実際このリポジトリには、旧 Jekyll 版で使って削除済みの写真が
**6.3MB 分、履歴に residue として残っている**（全 blob 10.9MB の58%）。

## 仕様

| | |
| --- | --- |
| 寸法 | **1920×1080**（16:9） |
| 品質 | JPEG q80 / mozjpeg |
| メタデータ | 落とす（sharp の既定。元は EXIF なしだが ICC が残るものがある） |
| 1枚あたり | 110〜200KB |

1920 なのは、`.section` の本文幅 912px を 2倍 DPR で満たす最小が 1824 だから。
これ以上大きくしても、配信されるのは `<NuxtImg>` が作る 912/1824 の WebP なので
画面では何も変わらず、`public/` の原寸と git の履歴だけが重くなる。

## 作り直すとき

runnable な版が `tools/prep-gallery.mjs`（gitignore 済み）にある。無ければこれ:

```js
// bike だけ position: 'top'。縦長（2038×2358）で、中央で切ると
// 乗っている本人の頭が落ちる。残りは 3:2 か 16:9 なので中央でいい。
await sharp(src)
  .resize(1920, 1080, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' })
  .toFile('public/images/private/bike.jpg')
```

切り出し位置は、候補を並べて見てから決める。`fit: 'cover'` の既定は中央で、
人物が端に寄っている写真では必ず外す。

## 足すとき

1. 上の仕様で `public/images/private/` に書き出す
2. `app/data/profile.ts` の `privateGallery` に `src`・`title`・`note`・`alt` を足す
3. `alt` は `title` の繰り返しにしない。見えない人に渡るのは `alt` だけで、
   `title`・`note` はキャプションとして別に読まれる
4. 写っているのが自分だけか確認する。他人が写っているものは本人の了解がいる
