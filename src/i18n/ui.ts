/*
  All site copy. EN is the source; RU is the translation.
*/
export type AudienceKey = 'manufacturers' | 'distributors' | 'institutions' | 'consumers';
export type PillarKey = 'intelligence' | 'product' | 'development' | 'compliance';

interface Copy {
  meta: { siteName: string; title: string; description: string };
  nav: {
    about: string;
    services: string;
    directions: string;
    pavilion: string;
    contacts: string;
    skip: string;
    menu: string;
    close: string;
    language: string;
    home: string;
    footerMenu: string;
    footerLanguage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pavilionLink: string;
    /** Template; {count} = company.pavilionResidents, see withCount(). */
    cardTitle: string;
  };
  trust: { operator: string; pavilion: string; since: string; mark: string };
  status: { company: string; direction: string; line: string; lineShort: string; markAlt: string };
  audiences: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<AudienceKey, { title: string; text: string; cta: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    pillars: Record<PillarKey, { title: string; text: string; items: string[] }>;
  };
  directions: {
    eyebrow: string;
    title: string;
    lead: string;
    more: string;
    all: string;
    status: Record<'active' | 'launching' | 'planned', string>;
    category: Record<
      'food-and-drinks' | 'construction' | 'industrial' | 'consumer' | 'other',
      string
    >;
    visitSite: string;
    siteSoon: string;
    keyData: string;
    documents: string;
    backToContacts: string;
    contactsIntro: string;
    audiencesLabel: string;
    otherDirections: string;
  };
  pavilion: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    addressLabel: string;
    address: string[];
    map: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    lead: string;
    email: string;
    phone: string;
    whatsapp: string;
    telegram: string;
    address: string;
    placeholder: string;
  };
  footer: { legal: string; operator: string; rights: string; madeInRussia: string };
  notFound: { title: string; text: string; back: string };
}

export const ui: Record<'en' | 'ru', Copy> = {
  en: {
    meta: {
      siteName: 'Rai Family Corp',
      title: 'Rai Family Corp: operator of the «Made in Russia» National Pavilion in India',
      description:
        'Rai Family Corp LLP is the operator of the «Made in Russia» National Pavilion in Navi Mumbai, a Russian Export Center project and the first in India. Distribution, marketing, import, certification and logistics for Russian products.',
    },
    nav: {
      about: 'About',
      services: 'Services',
      directions: 'Directions',
      pavilion: 'Pavilion',
      contacts: 'Contacts',
      skip: 'Skip to content',
      menu: 'Menu',
      close: 'Close',
      language: 'Language',
      home: 'Rai Family Corp — home',
      footerMenu: 'Footer navigation',
      footerLanguage: 'Language, footer',
    },
    hero: {
      eyebrow: 'Rai Family Corp LLP · India',
      title: 'Russian products and technologies for India. One operator, the whole route.',
      lead: 'Rai Family Corp LLP gives Russian manufacturers direct distribution channels and marketing in India, and handles the full cycle of import, certification and logistics.',
      ctaPrimary: 'Contact us',
      ctaSecondary: 'Explore directions',
      pavilionLink: 'About the pavilion',
      cardTitle: '{count} Russian {count:company is|companies are} already in the pavilion',
    },
    trust: {
      operator: '«Made in Russia» pavilion operator',
      pavilion: 'First pavilion of the programme in India',
      since: 'Company since 2024, pavilion since August 2026',
      mark: '«Made in Russia» mark',
    },
    status: {
      company: 'Rai Family Corp',
      // Top line for direction sites (D5 and the next ones), where the operator's name is not on the page.
      direction: 'A Rai Family Corp direction',
      line: '«Made in Russia» pavilion operator, India',
      lineShort: '«Made in Russia» pavilion operator',
      markAlt: 'Made in Russia mark',
    },
    audiences: {
      eyebrow: 'Who we work with',
      title: 'One entry point for every side of Russia–India trade',
      lead: 'Manufacturers, distributors, institutions and consumers meet Russian products through the same pavilion and the same operator.',
      items: {
        manufacturers: {
          title: 'Russian manufacturers',
          text: 'Enter the Indian market through the «Made in Russia» pavilion: market assessment, adaptation, certification, import and distribution under one contract.',
          cta: 'See services',
        },
        distributors: {
          title: 'Indian distributors and retail',
          text: 'Source certified Russian products from one accountable partner in Navi Mumbai, with documents, logistics and marketing support included.',
          cta: 'See directions',
        },
        institutions: {
          title: 'Government and development institutions',
          text: 'An official operator with a physical pavilion and a growing portfolio of Russian brands for programmes, missions and trade events.',
          cta: 'Visit the pavilion',
        },
        consumers: {
          title: 'Consumers in India',
          text: 'Products carrying the «Made in Russia» mark are imported, certified and distributed in India through this pavilion.',
          cta: 'Browse products',
        },
      },
    },
    about: {
      eyebrow: 'About the company',
      title: 'The official gateway for Russian products and technologies into India',
      paragraphs: [
        'Rai Family Corp LLP is an Indian company and the operator of the «Made in Russia» National Pavilion in Navi Mumbai, a Russian Export Center project. The pavilion is where Russian manufacturers meet Indian distributors, retail chains and institutions.',
        'We provide direct distribution channels and marketing promotion, and cover the full range of related work: market research, product and packaging adaptation, certification, import procedures, legal support and logistics.',
      ],
      facts: [
        { label: 'Status', value: '«Made in Russia» National Pavilion operator' },
        { label: 'Founded', value: 'September 2024' },
        { label: 'Registered', value: 'India, Maharashtra' },
        { label: 'Pavilion', value: 'Opened 21 August 2026, CBD Belapur, Navi Mumbai' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'From market research to the shelf',
      lead: 'Fourteen services, grouped into four stages of bringing a Russian product to India. Each is available separately or as one managed programme.',
      pillars: {
        intelligence: {
          title: 'Market intelligence',
          text: 'Know the market before committing to it.',
          items: [
            'Market monitoring and competitive research',
            'Market potential assessment',
            'Price positioning',
          ],
        },
        product: {
          title: 'Product and brand adaptation',
          text: 'Make the product fit the Indian shelf and the Indian buyer.',
          items: [
            'Product adaptation to the local market',
            'Packaging and design adaptation',
            'Branding and positioning',
          ],
        },
        development: {
          title: 'Business development',
          text: 'Turn interest into contracts and sales.',
          items: [
            'B2B meetings and negotiations',
            'Tastings and promotional events',
            'Contract facilitation',
            'Distribution',
          ],
        },
        compliance: {
          title: 'Compliance, import and logistics',
          text: 'Cross the border correctly, the first time.',
          items: [
            'Legal support of transactions',
            'Product certification, permits and licences',
            'Import consulting: requirements, restrictions, duties and taxes',
            'Logistics',
          ],
        },
      },
    },
    directions: {
      eyebrow: 'Directions',
      title: 'Products and technologies we bring to India',
      lead: 'Each direction is a Russian brand or product line with its own presentation. The portfolio grows in stages.',
      more: 'Learn more',
      all: 'All directions',
      status: { active: 'Available', launching: 'Launching', planned: 'Planned' },
      category: {
        'food-and-drinks': 'Food and drinks',
        construction: 'Construction materials',
        industrial: 'Industrial',
        consumer: 'Consumer goods',
        other: 'Other',
      },
      visitSite: 'Open the product site',
      keyData: 'Key data',
      documents: 'Documents',
      siteSoon: 'Product site coming soon',
      backToContacts: 'Contact the operator',
      contactsIntro:
        'Enquiries about this direction go through the pavilion operator, Rai Family Corp.',
      audiencesLabel: 'For',
      otherDirections: 'Other directions',
    },
    pavilion: {
      eyebrow: 'Pavilion',
      title: '«Made in Russia» National Pavilion, Navi Mumbai',
      subtitle:
        'A Russian Export Center project · opened 21 August 2026 · CBD Belapur, Navi Mumbai',
      text: 'The first «Made in Russia» pavilion in India, a Russian Export Center project opened on 21 August 2026. It is the physical home of Russian products in the country: a showroom for distributors and institutions, a venue for tastings and B2B meetings, and the office of the operator, Rai Family Corp.',
      addressLabel: 'Address',
      address: [
        'Office No. 1307 and 1308, NMS Titanium, 13th Floor',
        'Plot No. 74, Sector-15, CBD Belapur',
        'Navi Mumbai, Thane, Maharashtra 400614, India',
      ],
      map: 'Open in Google Maps',
    },
    contacts: {
      eyebrow: 'Contacts',
      title: 'Talk to the operator',
      lead: 'Whether you are a manufacturer, a distributor or an institution, write to us and we will route the request to the right person.',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      address: 'Pavilion address',
      placeholder: 'to be provided',
    },
    footer: {
      legal: 'Rai Family Corp LLP',
      operator:
        'Operator of the «Made in Russia» National Pavilion in India, a Russian Export Center project',
      rights: 'All rights reserved.',
      madeInRussia:
        '«Made in Russia» is a trademark of the Russian Export Center, used with permission.',
    },
    notFound: {
      title: 'Page not found',
      text: 'The page may have moved or never existed.',
      back: 'Back to home',
    },
  },

  ru: {
    meta: {
      siteName: 'Rai Family Corp',
      title: 'Rai Family Corp: оператор Национального Павильона «Сделано в России» в Индии',
      description:
        'Rai Family Corp LLP: оператор Национального Павильона «Сделано в России» в Нави-Мумбаи, проекта Российского экспортного центра и первого в Индии. Дистрибуция, маркетинг, импорт, сертификация и логистика российских товаров.',
    },
    nav: {
      about: 'О компании',
      services: 'Услуги',
      directions: 'Направления',
      pavilion: 'Павильон',
      contacts: 'Контакты',
      skip: 'Перейти к содержанию',
      menu: 'Меню',
      close: 'Закрыть',
      language: 'Язык',
      home: 'Rai Family Corp — на главную',
      footerMenu: 'Навигация в подвале',
      footerLanguage: 'Язык, подвал',
    },
    hero: {
      eyebrow: 'Rai Family Corp LLP · Индия',
      title: 'Российские товары и технологии для Индии. Один оператор, весь путь.',
      lead: 'Rai Family Corp LLP даёт российским производителям прямые каналы дистрибуции и маркетинговое продвижение в Индии и берёт на себя полный цикл импорта, сертификации и логистики.',
      ctaPrimary: 'Связаться',
      ctaSecondary: 'Смотреть направления',
      pavilionLink: 'О павильоне',
      cardTitle:
        '{count} {count:российская компания уже|российские компании уже|российских компаний уже} в павильоне',
    },
    trust: {
      operator: 'Оператор павильона «Сделано в России»',
      pavilion: 'Первый павильон программы в Индии',
      since: 'Компания с 2024 года, павильон с августа 2026',
      mark: 'Знак «Сделано в России»',
    },
    status: {
      company: 'Rai Family Corp',
      // Top line for direction sites (D5 and the next ones), where the operator's name is not on the page.
      direction: 'Направление Rai Family Corp',
      line: 'Оператор павильона «Сделано в России» в Индии',
      lineShort: 'Оператор павильона «Сделано в России»',
      markAlt: 'Знак «Сделано в России»',
    },
    audiences: {
      eyebrow: 'С кем мы работаем',
      title: 'Одна точка входа для всех сторон торговли Россия — Индия',
      lead: 'Производители, дистрибьюторы, институты и покупатели встречают российские товары через один павильон и одного оператора.',
      items: {
        manufacturers: {
          title: 'Российские производители',
          text: 'Выход на рынок Индии через павильон «Сделано в России»: оценка рынка, адаптация, сертификация, импорт и дистрибуция по одному договору.',
          cta: 'Смотреть услуги',
        },
        distributors: {
          title: 'Индийские дистрибьюторы и ритейл',
          text: 'Сертифицированные российские товары от одного ответственного партнёра в Нави-Мумбаи: документы, логистика и маркетинговая поддержка включены.',
          cta: 'Смотреть направления',
        },
        institutions: {
          title: 'Госструктуры и институты развития',
          text: 'Официальный оператор с физическим павильоном и растущим портфелем российских брендов для программ, миссий и торговых мероприятий.',
          cta: 'О павильоне',
        },
        consumers: {
          title: 'Покупатели в Индии',
          text: 'Товары со знаком «Сделано в России» ввозятся, сертифицируются и распространяются в Индии через этот павильон.',
          cta: 'Смотреть товары',
        },
      },
    },
    about: {
      eyebrow: 'О компании',
      title: 'Официальные ворота для российских товаров и технологий в Индию',
      paragraphs: [
        'Rai Family Corp LLP: индийская компания, оператор Национального Павильона «Сделано в России» в Нави-Мумбаи, проекта Российского экспортного центра. Павильон: точка, где российские производители встречаются с индийскими дистрибьюторами, торговыми сетями и институтами.',
        'Мы предоставляем прямые каналы дистрибуции и маркетинговое продвижение и закрываем весь спектр связанных задач: исследование рынка, адаптацию продукта и упаковки, сертификацию, импортные процедуры, юридическое сопровождение и логистику.',
      ],
      facts: [
        { label: 'Статус', value: 'Оператор Национального Павильона «Сделано в России»' },
        { label: 'Основана', value: 'Сентябрь 2024' },
        { label: 'Регистрация', value: 'Индия, Махараштра' },
        { label: 'Павильон', value: 'Открыт 21 августа 2026, CBD Belapur, Нави-Мумбаи' },
      ],
    },
    services: {
      eyebrow: 'Услуги',
      title: 'От исследования рынка до полки',
      lead: 'Четырнадцать услуг, сгруппированных в четыре этапа вывода российского товара в Индию. Каждая доступна отдельно или в составе единой программы.',
      pillars: {
        intelligence: {
          title: 'Аналитика рынка',
          text: 'Понять рынок до того, как в него вкладываться.',
          items: [
            'Мониторинг рынка и конкурентная разведка',
            'Оценка рыночного потенциала',
            'Ценовое позиционирование',
          ],
        },
        product: {
          title: 'Адаптация продукта и бренда',
          text: 'Сделать продукт подходящим для индийской полки и индийского покупателя.',
          items: [
            'Адаптация продукта к локальному рынку',
            'Адаптация упаковки и дизайна',
            'Брендинг и позиционирование',
          ],
        },
        development: {
          title: 'Развитие бизнеса',
          text: 'Превратить интерес в контракты и продажи.',
          items: [
            'Организация B2B-встреч и переговоров',
            'Дегустации и промо-акции',
            'Содействие в заключении контрактов',
            'Дистрибуция',
          ],
        },
        compliance: {
          title: 'Сертификация, импорт и логистика',
          text: 'Пересечь границу правильно с первого раза.',
          items: [
            'Юридическое сопровождение сделок',
            'Сертификация продукции, разрешения и лицензии',
            'Импорт-консалтинг: требования, ограничения, пошлины и налоги',
            'Логистика',
          ],
        },
      },
    },
    directions: {
      eyebrow: 'Направления',
      title: 'Товары и технологии, которые мы привозим в Индию',
      lead: 'Каждое направление — это российский бренд или линейка со своей презентацией. Портфель растёт поэтапно.',
      more: 'Подробнее',
      all: 'Все направления',
      status: { active: 'Доступно', launching: 'Запускается', planned: 'В планах' },
      category: {
        'food-and-drinks': 'Продукты и напитки',
        construction: 'Строительные материалы',
        industrial: 'Промышленность',
        consumer: 'Потребительские товары',
        other: 'Другое',
      },
      visitSite: 'Открыть сайт продукта',
      keyData: 'Ключевые данные',
      documents: 'Документы',
      siteSoon: 'Сайт продукта скоро появится',
      backToContacts: 'Связаться с оператором',
      contactsIntro:
        'Запросы по этому направлению проходят через оператора павильона, Rai Family Corp.',
      audiencesLabel: 'Для кого',
      otherDirections: 'Другие направления',
    },
    pavilion: {
      eyebrow: 'Павильон',
      title: 'Национальный Павильон «Сделано в России», Нави-Мумбаи',
      subtitle:
        'Проект Российского экспортного центра · открыт 21 августа 2026 · CBD Belapur, Нави-Мумбаи',
      text: 'Первый павильон «Сделано в России» в Индии, проект Российского экспортного центра, открыт 21 августа 2026 года. Это физический дом российских товаров в стране: шоурум для дистрибьюторов и институтов, площадка для дегустаций и B2B-встреч, офис оператора Rai Family Corp.',
      addressLabel: 'Адрес',
      address: [
        'Office No. 1307 and 1308, NMS Titanium, 13th Floor',
        'Plot No. 74, Sector-15, CBD Belapur',
        'Navi Mumbai, Thane, Maharashtra 400614, India',
      ],
      map: 'Открыть в Google Maps',
    },
    contacts: {
      eyebrow: 'Контакты',
      title: 'Напишите оператору',
      lead: 'Производитель, дистрибьютор или институт — напишите нам, и мы направим запрос нужному человеку.',
      email: 'Почта',
      phone: 'Телефон',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      address: 'Адрес павильона',
      placeholder: 'будет добавлено',
    },
    footer: {
      legal: 'Rai Family Corp LLP',
      operator:
        'Оператор Национального Павильона «Сделано в России» в Индии, проекта Российского экспортного центра',
      rights: 'Все права защищены.',
      madeInRussia:
        '«Сделано в России» — товарный знак Российского экспортного центра, используется с разрешения.',
    },
    notFound: {
      title: 'Страница не найдена',
      text: 'Возможно, страница переехала или никогда не существовала.',
      back: 'На главную',
    },
  },
};
