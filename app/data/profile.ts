import type { NavGroup, Profile } from '~/types/profile'

const GITHUB_URL = 'https://github.com/ta-tsu150'

export const profile: Profile = {
  handle: 'ta-tsu150',
  name: 'Tatsuya Ichino',
  nameJa: '市野 達也',
  role: 'Full-Stack Engineer (Frontend / Backend / Infra)',
  tagline: 'Cloud Infrastructure / DevOps / Platform Engineering',
  summary:
    '2025年4月に株式会社FIXERに新卒入社し、フルスタックエンジニアとしてWebアプリケーション・モバイルアプリ・クラウドインフラの設計・開発に従事。',
  avatar: '/images/tatsu.jpg',
  birthplace: '三重県 川越町',
  birthday: '2004/11/10',
  githubUrl: GITHUB_URL,

  heroInfo: [
    { key: 'role', value: 'Full-Stack Engineer (Frontend / Backend / Infra)' },
    {
      key: 'stack',
      value:
        'TypeScript, AWS, Azure, Vue.js / Nuxt, React Native, NestJS, C# / .NET, Docker',
    },
    { key: 'interests', value: 'AI活用' },
  ],

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

  skillTags: [
    // Languages
    'TypeScript',
    'C# / .NET',
    'Node.js',
    'SQL / DB Migration',
    // Frontend
    'Vue.js / Nuxt.js',
    'Composition API / Composables',
    'i18n',
    'アクセシビリティ対応',
    'UI/UX設計',
    // Mobile
    'Expo / React Native',
    'TestFlight / Xcode',
    // Backend
    'NestJS / Prisma',
    'Entity Framework Core',
    'DDD / Clean Architecture',
    'REST API / Swagger',
    'OAuth 2.0 / JWT',
    // Data
    'PostgreSQL',
    'Azure SQL Database',
    // Cloud
    'AWS Cognito',
    'AWS Lambda / S3 / SQS',
    'API Gateway / CloudFront',
    'Azure App Service',
    'Docker / Docker Compose',
    'GitHub Actions / CI-CD',
    // Quality
    'TDD / ユニットテスト',
    'ESLint / コーディング規約',
    'リファクタリング',
    'Git / GitHub',
    // AI / automation
    'Claude Code / Codex / Kiro',
    'LLM活用 / AIコードレビュー',
    'Zapier / Slack Bot',
    'Google Apps Script',
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
      title: '社内向け業務システム（勤怠・人事・組織管理）',
      period: '2026年3月 〜 現在',
      icon: 'lucide:building-2',
      challenge:
        '社内で使われていた既存の勤怠管理システムの置き換えと、人事・組織情報を扱う管理画面の整備。組織情報が複数システムに分散し、変更のたびに手作業で反映する運用になっていた。',
      role:
        'スコープと要件の検討に参加。組織図機能の実装、既存社内ツールとのUI統一、リポジトリおよびホスティング環境の移行を担当。',
      stack: ['Nuxt', 'TypeScript', 'PostgreSQL', 'Render', 'コンテナ'],
      topics: [
        {
          title: '組織図機能の実装',
          body: '階層構造の表示と並び順の制御を実装。並行して、他タブから浮いていた画面を既存社内ツールのデザインに合わせて改修した。改修の進め方自体を関係者に確認しながら進めた。',
        },
        {
          title: '組織情報の同期方針の検討',
          body: '変更を複数システムに手入力する運用だったため、マスタとなるDBから取得する方針を提案・検討した。月次の定期実行に加えて、変更日程がずれ込むケースに備えて手動実行の導線も用意する構成にした。',
        },
        {
          title: 'リポジトリ移行とホスティング移行の並行実施',
          body: '既存機能のフィードバック対応と並行して、リポジトリ移行とホスティング環境の移行を進めた。',
        },
        {
          title: '環境間のDB差異の洗い出し',
          body: '本番と開発環境でスキーマ・データに差異があったため、使用テーブルと差分を整理した。',
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
      date: '2004年11月～',
      paragraphs: [
        '誕生\n走り回りっては寝る生活で幼生を過ごす\n小～中学で7年間バスケを続ける\n運動神経に恵まれ、今に続く活発さの基礎を築く',
      ],
    },
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
