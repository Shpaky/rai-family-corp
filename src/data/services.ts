/*
  Company services: the single source. Eight groups, 36 services, both locales.
  Services are described once: the home Services section shows the groups
  (`title` and `brief`), the /manufacturers/ page publishes the full list
  (`title` and `items`), and the steps of its route link to the groups by `slug`.
  `headline` marks the three lead services of a group; it is kept for home
  cards with lists and is not rendered anywhere yet.

  No template literals in this file: check:content scans it for currency symbols.
*/
import type { Locale } from '../i18n/config';

export type ServiceGroupSlug =
  | 'analytics'
  | 'certification'
  | 'adaptation'
  | 'import'
  | 'logistics'
  | 'marketing'
  | 'b2b'
  | 'legal';

export interface ServiceGroup {
  /** Number shown on the card and in the list, '01' to '08'. */
  id: string;
  /** Anchor of the group on /manufacturers/: #services-<slug>. */
  slug: ServiceGroupSlug;
  title: string;
  /** One-line summary for the home card. */
  brief: string;
  items: { text: string; headline: boolean }[];
}

/** Order of the groups on the home page and on /manufacturers/. */
export const SERVICE_GROUP_SLUGS: ServiceGroupSlug[] = [
  'analytics',
  'certification',
  'adaptation',
  'import',
  'logistics',
  'marketing',
  'b2b',
  'legal',
];

const lead = (text: string) => ({ text, headline: true });
const more = (text: string) => ({ text, headline: false });

export const services: Record<Locale, { groups: ServiceGroup[] }> = {
  en: {
    groups: [
      {
        id: '01',
        slug: 'analytics',
        title: 'Analytics: market and reporting',
        brief: 'Market monitoring, audience and potential, entry strategy, reporting and ROI',
        items: [
          lead('Market monitoring and competitive intelligence'),
          lead('Target audience and market potential analysis'),
          lead('Market entry strategy'),
          more('Regular reports on sales, stock and campaign performance'),
          more('Marketing ROI analysis and strategy adjustments'),
        ],
      },
      {
        id: '02',
        slug: 'certification',
        title: 'Certification and registration',
        brief: 'FSSAI, CDSCO, BIS, permits and licences, government registers',
        items: [
          lead('Product compliance check against Indian standards and requirements'),
          lead('FSSAI for food, CDSCO for cosmetics and medical devices, BIS for technical goods'),
          lead('Permits and licences'),
          more('Listing the brand and product in the required Indian government registers'),
        ],
      },
      {
        id: '03',
        slug: 'adaptation',
        title: 'Product and packaging adaptation',
        brief: 'Range and pricing, label and packaging, Hindi localisation',
        items: [
          lead('Recommendations on range, composition and pricing for India'),
          lead('Label and packaging adaptation to local rules and preferences'),
          lead(
            'Localisation: instructions, descriptions and slogans in Hindi and regional languages',
          ),
          more('Adapting advertising materials to Indian advertising law'),
        ],
      },
      {
        id: '04',
        slug: 'import',
        title: 'Import and customs',
        brief: 'Import support, HS codes, duties and taxes, import requirements',
        items: [
          lead('Legal, logistics and customs support for import'),
          lead('HS classification, duties and taxes'),
          lead('Import requirements, restrictions and prohibitions'),
        ],
      },
      {
        id: '05',
        slug: 'logistics',
        title: 'Logistics and storage',
        brief: 'Partner warehouses, transport, insurance, last mile, inventory',
        items: [
          lead('Partner warehouses in India with any temperature regime'),
          lead('Consolidation and international transport: sea, air, rail, road'),
          lead('Last-mile delivery to retail, marketplaces and B2B customers'),
          more('Cargo insurance at every stage'),
          more('Inventory management, demand forecasting, turnover control'),
        ],
      },
      {
        id: '06',
        slug: 'marketing',
        title: 'Marketing and promotion',
        brief: 'Marketplaces, digital marketing, in-store promotion, PR',
        items: [
          lead(
            "Marketplaces: Amazon.in, Flipkart, Nykaa - sales through our seller accounts or running the manufacturer's own account",
          ),
          lead(
            'Digital marketing: SMM and influencers, search and social ads, SEO, websites and online shops',
          ),
          lead('Promotions, tastings and demonstrations, POSM in stores'),
          more('Local brand strategy, USP and identity adaptation'),
          more('Outdoor advertising and event sponsorship'),
          more('PR: business and trade media, press events, reputation management'),
        ],
      },
      {
        id: '07',
        slug: 'b2b',
        title: 'B2B, retail chains and exhibitions',
        brief: 'B2B meetings, partner search, turnkey exhibitions',
        items: [
          lead(
            'B2B meetings and negotiations with distributors, retailers and corporate customers',
          ),
          lead('Partner search and verification'),
          lead(
            'Turnkey exhibitions: selection, stand, promoters, tasting and meeting zones, interpreters',
          ),
          more('Commercial proposals and document adaptation'),
          more('POSM and branded merchandise, photo and video'),
        ],
      },
      {
        id: '08',
        slug: 'legal',
        title: 'Legal support',
        brief:
          'Deals and counterparties, contracts and IP, legal entity and accounts, currency control',
        items: [
          lead('Transaction support and counterparty checks'),
          lead('Export contracts and intellectual property protection'),
          lead('Registering a legal entity in India, opening accounts, tax accounting'),
          more('Currency control and international settlements'),
        ],
      },
    ],
  },

  ru: {
    groups: [
      {
        id: '01',
        slug: 'analytics',
        title: 'Аналитика: рынок и отчётность',
        brief: 'Мониторинг рынка, аудитория и потенциал, стратегия выхода, отчётность и ROI',
        items: [
          lead('Мониторинг рынка и конкурентная разведка'),
          lead('Анализ целевой аудитории и рыночного потенциала'),
          lead('Стратегия выхода на рынок'),
          more('Регулярные отчёты о продажах, остатках и эффективности кампаний'),
          more('Анализ ROI маркетинговых активностей и корректировка стратегии'),
        ],
      },
      {
        id: '02',
        slug: 'certification',
        title: 'Сертификация и регистрация',
        brief: 'FSSAI, CDSCO, BIS, разрешения и лицензии, государственные реестры',
        items: [
          lead('Проверка соответствия продукции индийским стандартам и требованиям'),
          lead(
            'FSSAI для продуктов питания, CDSCO для косметики и медицинских изделий, BIS для технических товаров',
          ),
          lead('Получение разрешений и лицензий'),
          more('Внесение бренда и товара в необходимые государственные реестры Индии'),
        ],
      },
      {
        id: '03',
        slug: 'adaptation',
        title: 'Адаптация продукта и упаковки',
        brief: 'Ассортимент и цена, этикетка и упаковка, локализация на хинди',
        items: [
          lead('Рекомендации по ассортименту, составу и ценообразованию для Индии'),
          lead('Адаптация этикетки и упаковки под местные нормы и предпочтения'),
          lead('Локализация: инструкции, описания и слоганы на хинди и региональных языках'),
          more('Адаптация рекламных материалов под индийское законодательство о рекламе'),
        ],
      },
      {
        id: '04',
        slug: 'import',
        title: 'Импорт и таможня',
        brief: 'Сопровождение импорта, коды HS, пошлины и налоги, требования ввоза',
        items: [
          lead('Юридическое, логистическое и таможенное сопровождение импорта'),
          lead('Классификация по HS, пошлины и налоги'),
          lead('Требования ввоза, ограничения и запреты'),
        ],
      },
      {
        id: '05',
        slug: 'logistics',
        title: 'Логистика и хранение',
        brief: 'Партнёрские склады, перевозка, страхование, последняя миля, запасы',
        items: [
          lead('Партнёрские склады в Индии с любым температурным режимом'),
          lead('Консолидация и международная перевозка: море, авиа, ж/д, авто'),
          lead('Доставка последней мили до розницы, маркетплейсов и B2B-клиентов'),
          more('Страхование грузов на всех этапах'),
          more('Управление запасами, прогнозирование спроса, контроль оборачиваемости'),
        ],
      },
      {
        id: '06',
        slug: 'marketing',
        title: 'Маркетинг и продвижение',
        brief: 'Маркетплейсы, цифровой маркетинг, промо в магазинах, PR',
        items: [
          lead(
            'Маркетплейсы: Amazon.in, Flipkart, Nykaa - продажи через наши аккаунты продавца или ведение аккаунта производителя',
          ),
          lead(
            'Цифровой маркетинг: SMM и инфлюенсеры, контекстная и таргетированная реклама, SEO, сайты и интернет-магазины',
          ),
          lead('Промоакции, дегустации и демонстрации, POSM в торговых точках'),
          more('Локальная бренд-стратегия, УТП и адаптация айдентики'),
          more('Наружная реклама и спонсорство мероприятий'),
          more(
            'PR: публикации в деловых и отраслевых изданиях, пресс-мероприятия, управление репутацией',
          ),
        ],
      },
      {
        id: '07',
        slug: 'b2b',
        title: 'B2B, сети и выставки',
        brief: 'B2B-встречи, поиск партнёров, выставки под ключ',
        items: [
          lead(
            'B2B-встречи и переговоры с дистрибьюторами, ритейлерами и корпоративными клиентами',
          ),
          lead('Поиск и верификация партнёров'),
          lead(
            'Выставки под ключ: подбор, стенд, промоутеры, дегустационные и переговорные зоны, переводчики',
          ),
          more('Коммерческие предложения и адаптация документов'),
          more('POSM и сувенирная продукция, фото- и видеосъёмка'),
        ],
      },
      {
        id: '08',
        slug: 'legal',
        title: 'Юридическое сопровождение',
        brief: 'Сделки и контрагенты, контракты и ИС, юрлицо и счета, валютный контроль',
        items: [
          lead('Сопровождение сделок и проверка контрагентов'),
          lead('Экспортные контракты и защита интеллектуальной собственности'),
          lead('Регистрация юрлица в Индии, открытие счетов, налоговый учёт'),
          more('Валютный контроль и международные расчёты'),
        ],
      },
    ],
  },
};

/** A group of the locale by slug, for the links from the route steps. */
export const serviceGroup = (locale: Locale, slug: ServiceGroupSlug): ServiceGroup => {
  const group = services[locale].groups.find((g) => g.slug === slug);
  if (!group) throw new Error(['services', locale, 'no group', slug].join(' '));
  return group;
};

// Build-time validation: eight groups in the fixed order, 36 services, three headline ones per group.
for (const [locale, { groups }] of Object.entries(services)) {
  const fail = (message: string) => {
    throw new Error(['services', locale, message].join(': '));
  };
  if (groups.map((g) => g.slug).join() !== SERVICE_GROUP_SLUGS.join())
    fail('groups must follow SERVICE_GROUP_SLUGS');
  groups.forEach((g, i) => {
    if (g.id !== String(i + 1).padStart(2, '0')) fail('group id out of order: ' + g.id);
    if (g.items.filter((item) => item.headline).length !== 3)
      fail('three headline services expected in ' + g.slug);
  });
  const total = groups.reduce((sum, g) => sum + g.items.length, 0);
  if (total !== 36) fail('36 services expected, got ' + total);
}
