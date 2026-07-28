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
      { key: 'weight', value: '75.2kg' },
    ],
    [
      { key: 'favorite', value: '猫' },
      {
        key: 'hobby',
        value:
          'ウィスキー, タバコ, 麻雀, サバゲー, ゲーム',
      },
    ],
  ],

  skills: [
    { icon: 'lucide:server', title: 'Backend', detail: 'NestJS / C# .NET / REST API / DDD' },
    { icon: 'lucide:layout-dashboard', title: 'Frontend', detail: 'Vue.js / Nuxt.js / TypeScript' },
    { icon: 'lucide:smartphone', title: 'Mobile', detail: 'Expo / React Native' },
    { icon: 'lucide:cloud', title: 'Cloud', detail: 'AWS / Azure / Docker' },
    { icon: 'lucide:shield-check', title: 'Quality', detail: 'TDD / AI Code Review / Swagger' },
    { icon: 'lucide:database', title: 'Database', detail: 'PostgreSQL / Prisma' },
  ],

  skillTags: [
    'TypeScript',
    'C# / .NET',
    'Vue.js / Nuxt.js',
    'NestJS / Prisma',
    'Expo / React Native',
    'Node.js',
    'PostgreSQL',
    'AWS',
    'Azure',
    'Docker',
    'DDD / Clean Architecture',
    'TDD',
    'REST API / Swagger',
    'SQL / DB Migration',
    'Git / GitHub',
    'CI/CD',
    'Zapier / Slack Bot',
    'Claude / LLM活用',
    'TestFlight / Xcode',
    'Google Apps Script',
    'i18n',
    'UI/UX設計',
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
