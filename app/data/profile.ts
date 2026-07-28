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
export const SECTION_IDS = ['hero', 'about', 'skills', 'timeline'] as const

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
      { label: 'Skills', href: '#skills' },
      { label: 'Timeline', href: '#timeline' },
    ],
  },
  {
    items: [{ label: 'GitHub', href: GITHUB_URL, external: true }],
  },
]
