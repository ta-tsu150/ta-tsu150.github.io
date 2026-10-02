import type { NavGroup, Profile } from '~/types/profile'

const GITHUB_URL = 'https://github.com/ta-tsu150'

export const profile: Profile = {
  handle: 'ta-tsu150',
  name: 'Tatsuya Ichino',
  nameJa: '市野 達也',
  summary:
    '2025年4月に株式会社FIXERに新卒入社し、フルスタックエンジニアとしてWebアプリケーション・モバイルアプリ・クラウドインフラの設計・開発に従事。',
  avatar: '/images/tatsu.jpg',
  birthplace: '三重県 川越町',
  birthday: '2004/11/10',

  details: [
    [
      { key: 'height', value: '183.8cm' },
      { key: 'weight', value: '約75kg' },
    ],
    [
      { key: 'favorite', value: '猫' },
      {
        key: 'hobby',
        value:
          'ウィスキー, タバコ, 麻雀, ダーツ, サバゲー, ゲーム',
      },
    ],
  ],

  skills: [
    { icon: 'lucide:server', title: 'Backend', detail: 'NestJS / C# .NET / REST API / Clean Architecture' },
    { icon: 'lucide:layout-dashboard', title: 'Frontend', detail: 'Vue.js / Nuxt.js / TypeScript / Composition API' },
    { icon: 'lucide:smartphone', title: 'Mobile', detail: 'Expo / React Native / TestFlight' },
    { icon: 'lucide:cloud', title: 'Cloud', detail: 'AWS / Azure / Docker / GitHub Actions' },
    { icon: 'lucide:shield-check', title: 'Quality', detail: 'TDD / AI Code Review / Swagger / ESLint' },
    { icon: 'lucide:database', title: 'Database', detail: 'PostgreSQL / Prisma / Azure SQL / EF Core' },
  ],

  /*
   * `works` points at the entries that actually demonstrate each skill. The
   * evidence is sometimes in a topic body rather than the stack list, so this is
   * hand-maintained rather than string-matched against `works[].stack`.
   *
   * An empty array is a deliberate "nothing on this page backs it up yet" — the
   * chip then renders as plain text instead of a button.
   */
  skillTags: [
    // Languages
    { label: 'TypeScript', works: ['internal-hr', 'onprem-ai-apps', 'medical-ops', 'btoc-mobile'] },
    { label: 'C# / .NET', works: ['dotnet-training'] },
    { label: 'Node.js', works: ['btoc-mobile'] },
    { label: 'SQL / DB Migration', works: ['dotnet-training', 'internal-hr'] },
    // Frontend
    { label: 'Vue.js / Nuxt.js', works: ['internal-hr', 'onprem-ai-apps', 'medical-ops', 'btoc-mobile'] },
    { label: 'Composition API / Composables', works: ['internal-hr', 'medical-ops', 'btoc-mobile'] },
    { label: 'i18n', works: ['medical-ops'] },
    { label: 'アクセシビリティ対応', works: [] },
    { label: 'UI/UX設計', works: ['internal-hr', 'onprem-ai-apps', 'medical-ops'] },
    { label: '業務フロー設計', works: ['internal-hr', 'medical-ops'] },
    // Mobile
    { label: 'Expo / React Native', works: ['btoc-mobile'] },
    { label: 'TestFlight / Xcode', works: ['btoc-mobile'] },
    // Backend
    { label: 'NestJS / Prisma', works: ['btoc-mobile'] },
    { label: 'Entity Framework Core', works: ['dotnet-training'] },
    { label: 'DDD / Clean Architecture', works: ['btoc-mobile', 'dotnet-training'] },
    { label: 'REST API / Swagger', works: ['btoc-mobile', 'internal-hr'] },
    { label: 'OAuth 2.0 / JWT', works: ['btoc-mobile'] },
    { label: '権限設計 / ロール管理', works: ['internal-hr'] },
    // Data
    { label: 'PostgreSQL', works: ['btoc-mobile'] },
    { label: 'Azure SQL Database', works: ['dotnet-training', 'internal-hr'] },
    // Cloud
    { label: 'AWS Cognito', works: ['btoc-mobile'] },
    { label: 'AWS Lambda / S3 / SQS', works: ['btoc-mobile'] },
    { label: 'API Gateway / CloudFront', works: ['btoc-mobile'] },
    { label: 'Azure App Service', works: ['dotnet-training', 'internal-hr'] },
    { label: 'Docker / Docker Compose', works: ['medical-ops', 'internal-hr', 'onprem-ai-apps'] },
    { label: 'GitHub Actions / CI-CD', works: ['btoc-mobile'] },
    { label: 'Linux / SSH', works: ['onprem-ai-apps'] },
    { label: '閉域環境 / オンプレ運用', works: ['onprem-ai-apps'] },
    // Quality
    { label: 'TDD / ユニットテスト', works: ['dotnet-training'] },
    { label: 'ESLint / コーディング規約', works: [] },
    { label: 'リファクタリング', works: ['btoc-mobile', 'internal-hr'] },
    { label: 'Git / GitHub', works: ['btoc-mobile', 'dotnet-training'] },
    { label: '監査ログ', works: ['internal-hr'] },
    { label: 'ISMS / 情報セキュリティ運用', works: [] },
    { label: '手順書 / ドキュメント整備', works: ['onprem-ai-apps', 'internal-hr'] },
    // AI / automation
    { label: 'Claude Code / Codex / Kiro', works: ['onprem-ai-apps', 'internal-hr'] },
    { label: 'LLM活用 / AIコードレビュー', works: ['onprem-ai-apps', 'internal-hr'] },
    { label: 'プロンプト設計', works: ['onprem-ai-apps'] },
    { label: '文書検索 / RAG', works: ['onprem-ai-apps'] },
    { label: 'Zapier / Slack Bot', works: ['btoc-mobile'] },
    { label: 'Google Apps Script', works: ['medical-ops'] },
  ],

  /*
   * Newest first. Reordering is just moving items in this array.
   *
   * Client and product names must never appear here — industry and system type
   * only. Everything in this file ships in the client bundle, so an entry that
   * is not cleared for publication does not belong in the repository at all.
   * Drafts live in `Docs/works-draft.md`, which is gitignored.
   */
  works: [
    {
      id: 'internal-hr',
      title: '社内向け業務システム（組織管理・人事評価）',
      period: '2026年3月 〜 現在',
      icon: 'lucide:building-2',
      challenge:
        '社内で使われていた既存の勤怠管理システムの置き換えと、人事・組織情報を扱う管理画面の整備。組織情報が複数システムに分散し、変更のたびに手作業で反映する運用になっていた。後半は、同じ基盤の上に人事評価のワークフローを載せる段階に入った。',
      role:
        'スコープと要件の検討に参加。組織図機能の実装、既存社内ツールとのUI統一、リポジトリおよびホスティング環境の移行を担当。評価機能については、要件の整理から実装・本番展開・リリース後の修正までを一人で担当した。',
      stack: ['Nuxt', 'TypeScript', 'Azure SQL Database', 'Azure App Service', 'Render', 'コンテナ'],
      topics: [
        {
          title: '組織図機能の実装',
          body: '階層構造の表示と並び順の制御を実装した。全社の組織体制図は画像を差し込む運用も検討されていたが、登録済みの役職者や所属情報から描画する方式を選び、編集側の操作を変えずに表示だけが変わる形にした。並行して、他タブから浮いていた画面を既存社内ツールのデザインに合わせて改修した。改修の進め方自体を関係者に確認しながら進めた。',
        },
        {
          title: '組織情報の同期方針の検討',
          body: '変更を複数システムに手入力する運用だったため、マスタとなるDBから取得する方針を提案・検討した。月次の定期実行に加えて、変更日程がずれ込むケースに備えて手動実行の導線も用意する構成にした。',
        },
        {
          title: 'リポジトリ・ホスティングの移行と本番リリース',
          body: '既存機能のフィードバック対応と並行して、リポジトリ移行とホスティング環境の移行を進めた。本番と開発環境でスキーマ・データに差異があったため、使用テーブルと差分を整理したうえで臨んだ。移行作業自体はセキュリティ面の調整を担う所管チームと分担し、移行後に崩れた画面の修正を担当した。',
        },
        {
          title: '評価機能における閲覧権限の再定義',
          body: '評価機能を、同じシステムの日報機能で使っていた管理者権限をそのまま流用して実装していた。日報は横断的に見えてよいという判断で責任者層に管理者権限を付与していたため、評価では本来見えないはずの他者の評価や後段のステップまで閲覧できる状態になっていた。全社公開の直前に気づいて報告し、評価における管理者の定義を立て直したうえで、日報の可視範囲と評価の可視範囲を分離した。あわせて、等級情報を既存のDBに同居させると業務上それを見る必要のない担当者にも参照できてしまうため、権限設定を分けたDBを別に用意し、接続元を限定する構成にした。',
        },
        {
          title: '評価フローの再設計と兼務の判定',
          body: '当初は「一次・二次・最終」という段数でフローを表現していたが、組織の実態に合わなかった。同一人物が複数の役職を兼務していると同じ人が二度評価することになり、該当する役職者がいない場合は途中で止まる。段数ではなく役割そのものを明示する形に実装し直し、該当者がいない段は飛ばす構造にした。加えて、従業員情報を提供する基幹API側が兼務設定を正しく返しておらず、兼務者が片方の役割としてしか判定されない問題を特定し、API側に修正を入れて所管チームのレビューを受けた。',
        },
        {
          title: '監査ログの不足への対応',
          body: '本番運用に入ってから、データの入出力を追跡できる記録を残していないことに気づいた。ホスティング側のログ保持期間内で遡れる範囲を調査したうえで、以降はデータのやり取りを監査ログとして記録する実装に変更した。',
        },
      ],
    },
    {
      id: 'onprem-ai-apps',
      title: '閉域環境向けAI業務支援アプリ（金融・自治体・建設）',
      period: '2026年8月 〜 現在',
      icon: 'lucide:cpu',
      challenge:
        '外部ネットワークから切り離された環境で動作するAI基盤に載せる業務支援アプリを、複数の業種向けに立ち上げる必要があった。提案段階で見せるモックから、販売を前提とした実装までが対象になる。',
      role:
        '要件資料からのキャッチアップ、画面とバックエンドの実装、コンテナ構成、実機へのデプロイと動作確認を担当。初期は単独、その後は複数名の体制に加わり、参加者向けの手順書整備も行った。',
      stack: ['TypeScript', 'Nuxt', 'Docker', 'LLM連携', 'Linux / SSH', 'コンテナデプロイ'],
      topics: [
        {
          title: '提案用モックから本開発への移行',
          body: '業務要件の資料のみを手がかりに、フロントエンドだけの構成で短期間に動作するモックを作成した。共有の際は、そのまま販売できる状態ではないことを毎回明示するようにした。提案の場で評価を受けて本開発に進む判断がされ、販売を前提とした構成に作り直す段階から複数名のチームで進める形になった。',
        },
        {
          title: 'AIの役割を判定ではなく下読みに限定した設計',
          body: '記録の点検業務を支援する機能では、AIに最終判断をさせず、観点ごとの評価と根拠の提示までを担当させ、確定は人が行う構造にした。一次確認と二次確認は同一人物では行えないようにし、一次判定をやり直した場合は済んでいた二次確認を無効に戻す。承認の根拠が変わる以上そうあるべきという判断で、意図した挙動として手順書にも明記した。',
        },
        {
          title: 'AIに接続できていない状態を画面上で識別できるようにした',
          body: 'AI連携に失敗した際、固定のデモ用データを返す実装になっており、見た目では正常時と区別がつかなかった。実際の解析結果ではないことを画面上のタグで明示し、デモや動作確認の前に必ず確認する項目として手順書に落とした。',
        },
        {
          title: '更新のたびにデータが消える構成の修正',
          body: 'アプリを更新するとDBのコンテナも作り直され、取り込み済みの文書データが失われる構成になっていた。基盤側のリポジトリにあった永続化の記述を参照して構成を見直し、更新をまたいでデータが保持されるようにした。',
        },
        {
          title: '閉域環境での配布手順の整備',
          body: 'アプリを基盤に載せる手順が共有されておらず、関わる人が同じ箇所で詰まる状況だった。自分が詰まった点も含めて手順書にまとめ、後から参加したメンバーに共有した。',
        },
      ],
    },
    {
      id: 'medical-ops',
      title: '医療・調剤領域の業務システム',
      period: '2025年12月 〜 2026年2月',
      icon: 'lucide:clipboard-list',
      challenge:
        'スプレッドシートとGoogle Apps Scriptで運用されていた業務のWebアプリ化。既存運用がスプレッドシート前提で組まれており、そのまま移植すると使いにくい画面になる懸念があった。',
      role: '既存運用の棚卸しと要件整理、画面設計の検討、チーム開発でのフロントエンド実装を担当。',
      stack: ['Nuxt', 'TypeScript', 'Docker Compose', 'i18n'],
      topics: [
        {
          title: '「移植」ではなく「再設計」に切り替えた判断',
          body: '当初はスプレッドシートの一覧をそのまま画面に落とし込む方針で業務の洗い出しから着手したが、洗い出しが発散し運用の例外パターンも一貫していなかったため、この進め方は筋が悪いと判断した。チーム内の議論を経て、シートの見た目をなぞるのではなく対象の実体を軸にした一覧へ設計を変更し、他業務にも転用できる画面構成にした。',
        },
        {
          title: 'チーム開発環境の差異吸収',
          body: 'Docker Composeの設定変更が必要になり、メンバー間で動かなくなっていた開発環境を修正して復旧させた。',
        },
        {
          title: '多言語対応の後追い実装',
          body: '既に組まれていた画面に対してi18nを導入した。対応箇所の洗い出しと段階的な適用を行った。',
        },
      ],
    },
    {
      id: 'btoc-mobile',
      title: '寺社領域向け BtoC モバイルサービス',
      period: '2025年9月 〜 2026年2月',
      icon: 'lucide:smartphone',
      challenge:
        'スマートフォンから申込を行い、進行状況を確認できる新規サービスの立ち上げ。運営側が申込を管理するWeb画面も同時に必要だった。',
      role:
        'モバイルアプリ・管理Web・バックエンドAPI・クラウドインフラを横断して担当。入社1年目からコア機能の設計と実装、および他メンバーのPRレビューを担当した。',
      stack: [
        'Expo / React Native',
        'Nuxt',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'AWS Cognito',
        'Lambda / S3 / SQS',
        'API Gateway / CloudFront',
        'GitHub Actions',
      ],
      topics: [
        {
          title: '画像合成パイプラインの作り直し',
          body: 'リアルタイムプレビューを実現するため、SVGを組み立ててPNGに変換しS3へ保存する構成にしていた。ところがS3経由で配信するとフォントが正しく解決されず、意図した見た目にならない問題に直面した。変換段が原因と切り分けたうえで、SVGを経由せず最初からPNGを生成する方式へ改修し解消した。',
        },
        {
          title: 'ワークフロー再設計に伴う大規模リファクタリング',
          body: '申込のステータス遷移を2段階のプロセスへ再設計した。ドメインモデル・API・モバイル・管理Webを横断する変更で、状態を表す値オブジェクトから画面表示まで一貫させる必要があった。あわせて、ユースケース層が特定のORMに依存せずトランザクションを扱えるよう、インターフェースを切って実装をDIコンテナに登録する形に整理した。',
        },
        {
          title: '認証基盤の構築',
          body: 'Cognitoのマネージドログイン画面を用いたOAuth 2.0 Authorization Code Grantフローを実装。IDトークン・アクセストークンの管理と、環境変数による認証モードの切り替えに対応した。',
        },
        {
          title: 'サーバーレス関数のランタイム選定',
          body: 'LambdaからPostgreSQLに接続する処理をPythonで実装していたが、必要なライブラリの依存を解決できずに詰まった。原因を絞り込んだうえでNode.jsに切り替えて解消した。',
        },
        {
          title: 'KPI通知の自動化',
          body: '主要指標をSlackへ自動通知するBotを設計・実装。売上系は日次、クラウドコストは週次という、指標ごとの通知頻度を設計に落とし込んだ。',
        },
      ],
    },
    {
      id: 'dotnet-training',
      title: '新卒研修 — .NET / Azure による基礎構築',
      period: '2025年4月 〜 2025年8月',
      icon: 'lucide:graduation-cap',
      challenge:
        '課題形式でバックエンド・フロントエンドの基礎を習得する研修。実装物は毎回PRレビューを受ける形式だった。',
      role: '個人課題の実装とレビュー対応。チームでの技術調査レポート作成を担当。',
      stack: [
        'C# / .NET',
        'Entity Framework Core',
        'Azure SQL Database',
        'Azure App Service',
        'Moq / FluentAssertions',
      ],
      topics: [
        {
          title: 'EF Coreの発行SQLの可視化',
          body: 'EF Coreが生成するSQLが期待と異なる挙動をしたため、ログ出力を追加して確認できるようにし、本番構成でも動作するよう修正した。生成されたSQLをDB管理ツールで直接実行して挙動を検証した。',
        },
        {
          title: '設計パターンの技術調査',
          body: 'Entity Framework CoreとRepositoryパターンについての技術調査レポートをチームで作成した。後の案件でレイヤード構成を扱う下地になった。',
        },
        {
          title: 'ユニットテストの整備',
          body: 'Moqでモックを作り、FluentAssertionsでアサーションを記述する形でテストを整備した。',
        },
        {
          title: '接続情報の管理',
          body: '接続文字列をリポジトリに置かず、シークレット管理の仕組みで扱う運用にした。',
        },
      ],
    },
  ],

  timeline: [
    {
      date: '2020年4月～',
      paragraphs: [
        '地元工業高校に入学\n情報技術を専攻する学科に進み, 人生で初めてパソコンに触れる\n工業高校らしい第二種電気工事士などの工業資格も取得しつつ, WordをはじめとするPCソフトの検定等も複数取得',
        'ハンドボール部に所属し, 初心者入部ながら主将に成るなど, ここでの成功経験が現在の人格形成に大きく寄与\n最後の大会で優秀選手賞受賞し, 三重国体選手選抜に抜擢されるも, 進学を決意していたこともあり辞退してアルバイトに勤しむ',
      ],
    },
    {
      date: '2023年4月～',
      paragraphs: [
        '名古屋の専門学校 情報学科に入学\nWebアプリケーション作成をはじめに情報技術を本格的に触り始める\nIPAの基本/応用情報技術者をはじめとする複数の資格も取得',
        '放課には有名アミューズメント施設で接客のアルバイトに従事\n統率力と会話能力を活かし, 店舗に2人しかいないS評定スタッフに成る',
      ],
    },
    {
      date: '2025年4月～',
      paragraphs: [
        '株式会社FIXERに新卒入社\nフルスタックエンジニアとしてWebアプリケーション・モバイルアプリ・クラウドインフラの設計・開発に従事',
      ],
    },
  ],
}

/** Sections tracked for the active-link highlight, in document order. */
export const SECTION_IDS = ['hero', 'about', 'timeline', 'skills', 'works'] as const

/**
 * Contents of the navigation drawer.
 *
 * Once there is more than one page, add a route group above the anchors:
 *
 *   { label: 'Pages', items: [{ label: 'Home', href: '/' }, ...] },
 *   { label: 'On this page', items: [...anchors] },
 *
 * The anchor group is page-specific, so at that point it should be passed in
 * per page rather than read from here.
 */
export const navGroups: readonly NavGroup[] = [
  {
    items: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Timeline', href: '#timeline' },
      { label: 'Skills', href: '#skills' },
      { label: 'Works', href: '#works' },
    ],
  },
  {
    items: [{ label: 'GitHub', href: GITHUB_URL, external: true }],
  },
]
