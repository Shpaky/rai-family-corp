/*
  All site copy. EN is the source; RU is the translation.
*/
export type AudienceKey = 'manufacturers' | 'distributors' | 'institutions' | 'consumers';
interface Photo {
  alt: string;
  caption: string;
}

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
    /** Pavilion card: what the pavilion covers. */
    cardTitle: string;
  };
  trust: { pavilion: string; since: string; b2b: string; b2c: string; mark: string };
  /** Expansions of B2B / B2C, read by screen readers at the first mention and shown as a tooltip on badges. */
  segmentsExpanded: { B2B: string; B2C: string };
  status: { company: string; direction: string; line: string; lineShort: string; markAlt: string };
  audiences: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Business model label shown on each card. */
    segments: Record<AudienceKey, 'B2B' | 'B2C'>;
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
    /** "All directions ({count})" button, template for withCount(). */
    allCount: string;
    /** "{count} directions", template for withCount(). */
    count: string;
    status: Record<'active' | 'on-order' | 'coming', string>;
    carousel: { label: string; prev: string; next: string };
    catalog: {
      title: string;
      lead: string;
      description: string;
      all: string;
      showing: string;
      filters: string;
      status: string;
      reset: string;
    };
    aboutLine: string;
    keyData: string;
    documents: string;
    docTypes: Record<
      'tds' | 'sds' | 'certificate' | 'test' | 'authorization' | 'leaflet' | 'presentation',
      string
    >;
    pdf: string;
    manufacturer: string;
    founded: string;
    references: string;
    faq: string;
    howToBuy: {
      title: string;
      inStock: string;
      madeToOrder: string;
      dispatch: string;
      moq: string;
      packaging: string;
      price: string;
      incoterms: string;
    };
    cta: { price: string; whatsapp: string; subject: string };
    similar: string;
    backToContacts: string;
    contactsIntro: string;
    audiencesLabel: string;
  };
  pavilion: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    addressLabel: string;
    address: string[];
    map: string;
    /** Photo captions; `alt` describes the picture, `caption` names the role of the space. */
    photos: { showroom: Photo; shelves: Photo; stage: Photo };
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
      cardTitle: 'From industrial technologies and agriculture to consumer goods.',
    },
    trust: {
      pavilion: 'First pavilion of the programme in India',
      since: 'Company since 2024, pavilion since August 2026',
      b2b: 'B2B: manufacturers, distributors, retail and government institutions',
      b2c: 'B2C: The Rus Store online shop',
      /** Used on the pavilion card only. */
      mark: '«Made in Russia» mark',
    },
    segmentsExpanded: { B2B: 'business to business', B2C: 'business to consumer' },
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
      segments: {
        manufacturers: 'B2B',
        distributors: 'B2B',
        institutions: 'B2B',
        consumers: 'B2C',
      },
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
          text: 'Products carrying the «Made in Russia» mark are imported, certified and distributed in India through our online store, The Rus Store.',
          cta: 'Open The Rus Store',
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
      lead: 'Russian brands and product lines we import, certify and distribute in India.',
      more: 'Learn more',
      all: 'All directions',
      allCount: 'All directions ({count})',
      count: '{count} {count:direction|directions}',
      status: { active: 'In stock', 'on-order': 'Made to order', coming: 'Coming soon' },
      carousel: { label: 'Directions carousel', prev: 'Previous', next: 'Next' },
      catalog: {
        title: 'All directions',
        lead: 'Every Russian brand and product line we bring to India, by category and availability.',
        description:
          'Catalogue of Russian products and technologies imported to India by Rai Family Corp: construction materials, equipment, industrial chemicals, agro.',
        all: 'All',
        showing: 'Showing {count}',
        filters: 'Filters',
        status: 'Availability',
        reset: 'Reset',
      },
      aboutLine: 'About the line',
      keyData: 'Key data',
      documents: 'Documents',
      docTypes: {
        tds: 'TDS',
        sds: 'SDS',
        certificate: 'Certificate',
        test: 'Test report',
        authorization: 'Authorization letter',
        leaflet: 'Leaflet',
        presentation: 'Presentation',
      },
      pdf: '(PDF)',
      manufacturer: 'Manufacturer',
      founded: 'since {count}',
      references: 'Applications and references',
      faq: 'FAQ',
      howToBuy: {
        title: 'How to buy in India',
        inStock: 'In stock in India',
        madeToOrder: 'Made to order',
        dispatch: 'Dispatch',
        moq: 'MOQ',
        packaging: 'Packaging',
        price: 'Price',
        incoterms: 'Incoterms',
      },
      cta: { price: 'Get best price', whatsapp: 'WhatsApp', subject: 'Price request: {title}' },
      similar: 'Similar directions',
      backToContacts: 'Contact the operator',
      contactsIntro:
        'Enquiries about this direction go through the pavilion operator, Rai Family Corp.',
      audiencesLabel: 'For',
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
      photos: {
        showroom: {
          alt: 'Showroom of the «Made in Russia» pavilion: shelves with Russian products, a round table and a lectern with the mark',
          caption: 'Showroom',
        },
        shelves: {
          alt: 'A long wall of shelves with cosmetics, sweets and groceries from Russian manufacturers',
          caption: 'Shelves of the residents',
        },
        stage: {
          alt: 'Lectern with the «Made in Russia» mark in front of the pavilion backdrop, product shelves on the left',
          caption: 'Venue for meetings and tastings',
        },
      },
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
        'От промышленных технологий и сельского хозяйства до товаров народного потребления.',
    },
    trust: {
      pavilion: 'Первый павильон программы в Индии',
      since: 'Компания с 2024 года, павильон с августа 2026',
      b2b: 'B2B: производители, дистрибьюторы, ритейл и госструктуры',
      b2c: 'B2C: интернет-магазин The Rus Store',
      /** Used on the pavilion card only. */
      mark: 'Знак «Сделано в России»',
    },
    segmentsExpanded: { B2B: 'бизнес для бизнеса', B2C: 'бизнес для потребителя' },
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
      segments: {
        manufacturers: 'B2B',
        distributors: 'B2B',
        institutions: 'B2B',
        consumers: 'B2C',
      },
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
          text: 'Товары со знаком «Сделано в России» ввозятся, сертифицируются и распространяются в Индии через наш интернет-магазин The Rus Store.',
          cta: 'Открыть The Rus Store',
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
      lead: 'Российские бренды и продуктовые линейки, которые мы ввозим, сертифицируем и распространяем в Индии.',
      more: 'Подробнее',
      all: 'Все направления',
      allCount: 'Все направления ({count})',
      count: '{count} {count:направление|направления|направлений}',
      status: { active: 'В наличии', 'on-order': 'Под заказ', coming: 'Готовится' },
      carousel: { label: 'Лента направлений', prev: 'Назад', next: 'Вперёд' },
      catalog: {
        title: 'Все направления',
        lead: 'Все российские бренды и линейки, которые мы привозим в Индию: по категориям и наличию.',
        description:
          'Каталог российских товаров и технологий, которые Rai Family Corp ввозит в Индию: стройматериалы, оборудование, промышленная химия, агро.',
        all: 'Все',
        showing: 'Показано {count}',
        filters: 'Фильтры',
        status: 'Наличие',
        reset: 'Сбросить',
      },
      aboutLine: 'О линейке',
      keyData: 'Ключевые данные',
      documents: 'Документы',
      docTypes: {
        tds: 'TDS',
        sds: 'SDS',
        certificate: 'Сертификат',
        test: 'Протокол испытаний',
        authorization: 'Письмо-авторизация',
        leaflet: 'Буклет',
        presentation: 'Презентация',
      },
      pdf: '(PDF)',
      manufacturer: 'Производитель',
      founded: 'с {count} года',
      references: 'Применение и референсы',
      faq: 'Вопросы и ответы',
      howToBuy: {
        title: 'Как купить в Индии',
        inStock: 'Склад в Индии',
        madeToOrder: 'Под заказ',
        dispatch: 'Отгрузка',
        moq: 'MOQ',
        packaging: 'Фасовка',
        price: 'Цена',
        incoterms: 'Incoterms',
      },
      cta: { price: 'Запросить цену', whatsapp: 'WhatsApp', subject: 'Запрос цены: {title}' },
      similar: 'Похожие направления',
      backToContacts: 'Связаться с оператором',
      contactsIntro:
        'Запросы по этому направлению проходят через оператора павильона, Rai Family Corp.',
      audiencesLabel: 'Для кого',
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
      photos: {
        showroom: {
          alt: 'Шоурум павильона «Сделано в России»: полки с российскими товарами, круглый стол и трибуна со знаком',
          caption: 'Шоурум',
        },
        shelves: {
          alt: 'Длинная стена полок с косметикой, сладостями и бакалеей российских производителей',
          caption: 'Полки резидентов',
        },
        stage: {
          alt: 'Трибуна со знаком «Сделано в России» на фоне пресс-волла павильона, слева полки с продуктами',
          caption: 'Площадка для встреч и дегустаций',
        },
      },
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
