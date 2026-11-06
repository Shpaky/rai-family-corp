/*
  All site copy. EN is the source; RU is the translation.
*/
export type AudienceKey = 'manufacturers' | 'distributors' | 'institutions' | 'consumers';
/** The two B2B audiences of the /about/ page. */
export type AboutB2bAudience = 'distributors' | 'manufacturers';
interface Photo {
  alt: string;
  caption: string;
}

interface Copy {
  meta: { siteName: string; title: string; description: string };
  nav: {
    about: string;
    /** Menu item of the services section and crumb of /manufacturers/. */
    manufacturers: string;
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
    /** Button labels; which two are shown, in which order, is HERO_ACTIONS in src/data/site.ts. */
    contact: string;
    directions: string;
    manufacturers: string;
    pavilionLink: string;
    /** Pavilion card: what the pavilion covers. */
    cardTitle: string;
  };
  /** Pavilion card facts (Pavilion.astro). */
  trust: { pavilion: string; since: string; mark: string };
  /** Expansions of B2B / B2C, read by screen readers at the first mention and shown as a tooltip on badges. */
  segmentsExpanded: { B2B: string; B2C: string };
  status: { company: string; direction: string; line: string; lineShort: string; markAlt: string };
  audiences: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Business model label shown on each card. */
    segments: Record<AudienceKey, 'B2B' | 'B2C'>;
    /** `cta` is the link label; manufacturers take services.more (link to /manufacturers/). */
    items: Record<AudienceKey, { title: string; text: string; cta?: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    /** Column label above the leadership rows. */
    leadership: string;
    /** Button under the leadership cards, leads to /about/. */
    more: string;
  };
  /** Home Services section; the groups and their services are in src/data/services.ts. */
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Button under the cards, leads to /manufacturers/; also the manufacturers link on /about/ and in Audiences. */
    more: string;
  };
  directions: {
    eyebrow: string;
    title: string;
    lead: string;
    more: string;
    /** "+N" tag when a compact card hides extra product tags. */
    moreProducts: string;
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
      | 'tds'
      | 'sds'
      | 'certificate'
      | 'test'
      | 'authorization'
      | 'reference'
      | 'leaflet'
      | 'catalogue'
      | 'presentation',
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
    more: string;
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
  footer: {
    legal: string;
    operator: string;
    rights: string;
    madeInRussia: string;
    socialMedia: string;
    socialLinks: { linkedin: string; facebook: string };
  };
  notFound: { title: string; text: string; back: string };
  /** External links: screen-reader note for target="_blank". */
  external: { newTab: string };
  /** /about/ page. Reused keys: about.eyebrow (crumb and eyebrow), about.leadership (H2), footer.operator and footer.madeInRussia (status), hero.pavilionLink, audiences.items.consumers.cta. */
  aboutPage: {
    title: string;
    description: string;
    h1: string;
    lead: string;
    b2b: {
      title: string;
      /** Order per locale: ABOUT_B2B_AUDIENCES in src/data/site.ts. */
      audiences: Record<AboutB2bAudience, { title: string; text: string }>;
      /** Link labels; manufacturers take services.more (link to /manufacturers/). */
      links: { distributors: string };
    };
    b2c: {
      title: string;
      audience: { title: string; text: string };
      /** Language note next to the shop link, null when the shop is in the page language. */
      linkNote: string | null;
    };
    leadershipIntro: string;
    status: {
      title: string;
      programme: string;
      /** Language note next to the programme link, null when the page is in Russian. */
      programmeNote: string | null;
    };
    details: {
      title: string;
      legalName: string;
      llpin: string;
      gstin: string;
      iec: string;
      registered: string;
      jurisdiction: string;
      office: string;
      /** Label above the document buttons and the buttons themselves. */
      documents: string;
      gstCertificate: string;
      iecCertificate: string;
    };
  };
  /** /manufacturers/ page: interface strings; the page copy is in src/data/manufacturers.ts, the services in src/data/services.ts. Reused keys: nav.manufacturers (crumb), hero.pavilionLink (link of the pavilion residency card). */
  manufacturersPage: {
    /** Row labels of a step card. */
    rows: { whatWeDo: string; fromYou: string; result: string; timing: string };
    /** Summary of the folded rows of a step on phones. */
    stepMore: string;
    /** Label of the row with links to the service groups of a step. */
    servicesLabel: string;
    /** Summary of the folded part of the common list on phones, template for withCount(). */
    listMore: string;
    forAnyProduct: string;
    byCategory: string;
    /** Bold lead-ins of the two paragraphs of a category. */
    access: string;
    prepare: string;
    /** Bottom line of a cooperation model card. */
    termsLabel: string;
  };
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
      manufacturers: 'For manufacturers',
      directions: 'Directions',
      pavilion: 'Pavilion',
      contacts: 'Contacts',
      skip: 'Skip to content',
      menu: 'Menu',
      close: 'Close',
      language: 'Language',
      home: 'Rai Family Corp - home',
      footerMenu: 'Footer navigation',
      footerLanguage: 'Language, footer',
    },
    hero: {
      eyebrow: 'Rai Family Corp LLP · India',
      title: 'Russian products and technologies for India. One operator, the whole route.',
      lead: 'Rai Family Corp LLP gives Indian businesses access to Russian products and technologies and handles import, certification, logistics and local distribution.',
      contact: 'Contact us',
      directions: 'Explore directions',
      manufacturers: 'Bring your product to India',
      pavilionLink: 'About the pavilion',
      cardTitle: 'From industrial technologies and agriculture to consumer goods.',
    },
    trust: {
      pavilion: 'First pavilion of the programme in India',
      since: 'Company since 2024, pavilion since August 2026',
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
      title: 'One entry point for every side of Russia-India trade',
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
        'Rai Family Corp LLP is an Indian company founded by a group of international entrepreneurs with many years of experience across countries and industries, including India. Since 21 August 2026 it has been the operator of the «Made in Russia» National Pavilion in Navi Mumbai, a Russian Export Center project. The pavilion is where Russian manufacturers meet Indian distributors, retail chains and institutions.',
        'The company provides direct distribution channels and marketing promotion and covers the full range of related work: market research, product and packaging adaptation, certification, import procedures, legal support and logistics.',
      ],
      leadership: 'Leadership',
      more: 'More about the company',
    },
    services: {
      eyebrow: 'Services',
      title: 'From market research to the shelf',
      lead: 'Eight service areas: from analytics and certification to marketplaces, exhibitions and legal support. Each service is available on its own or as part of a single programme.',
      more: 'How we work with manufacturers',
    },
    directions: {
      eyebrow: 'Directions',
      title: 'Products and technologies we bring to India',
      lead: 'Russian brands and product lines we import, certify and distribute in India.',
      more: 'Learn more',
      moreProducts: '+{count}',
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
        reference: 'Reference list',
        leaflet: 'Leaflet',
        catalogue: 'Catalogue',
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
      more: 'More about the pavilion',
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
      address: 'Office address',
      placeholder: 'to be provided',
    },
    footer: {
      legal: 'Rai Family Corp LLP',
      socialMedia: 'Social media',
      socialLinks: { linkedin: 'LinkedIn', facebook: 'Facebook' },
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
    external: { newTab: 'opens in a new tab' },
    aboutPage: {
      title: 'About Rai Family Corp: B2B and B2C operator of Russian products in India',
      description:
        'Rai Family Corp LLP works in two models: B2B as the operator of the «Made in Russia» National Pavilion in Navi Mumbai, importer and distributor, and B2C through its own online shop The Rus Store. Leadership, status, company details.',
      h1: 'Two business models: B2B and B2C',
      lead: 'Rai Family Corp LLP works with Russian products in India in two models: B2B as the operator of the «Made in Russia» National Pavilion, importer and distributor, and B2C as the owner of The Rus Store online shop.',
      b2b: {
        title: 'Pavilion, import and distribution',
        audiences: {
          distributors: {
            title:
              'Indian distributors, retail chains, government bodies and development institutions',
            text: 'Russian brands and product lines that we import, certify and distribute in India, with technical and safety documents on every direction page.',
          },
          manufacturers: {
            title: 'Russian manufacturers',
            text: 'Direct distribution channels and marketing in India, and the whole route to the shelf: market research, product and packaging adaptation, certification, import procedures, legal support and logistics.',
          },
        },
        links: { distributors: 'Directions catalogue' },
      },
      b2c: {
        title: 'The Rus Store, our online shop',
        audience: {
          title: 'Buyers in India',
          text: 'Russian products online, with delivery across India.',
        },
        linkNote: null,
      },
      leadershipIntro:
        'The company was founded in 2024 by a group of international entrepreneurs with many years of experience across countries and industries, including India.',
      status: {
        title: 'Status and the «Made in Russia» mark',
        programme: 'REC programme page: Russian national pavilions abroad',
        programmeNote: 'in Russian',
      },
      details: {
        title: 'Company details',
        legalName: 'Legal name',
        llpin: 'LLPIN',
        gstin: 'GSTIN',
        iec: 'IEC',
        registered: 'Registered',
        jurisdiction: 'Jurisdiction',
        office: 'Registered office',
        documents: 'Documents',
        gstCertificate: 'GST registration certificate (EN)',
        iecCertificate: 'IEC certificate (EN)',
      },
    },
    manufacturersPage: {
      rows: { whatWeDo: 'What we do', fromYou: 'From you', result: 'Result', timing: 'Timing' },
      stepMore: 'More about this step',
      servicesLabel: 'Services:',
      listMore: '{count} more {count:item|items}',
      forAnyProduct: 'For any product',
      byCategory: 'By category',
      access: 'Market access.',
      prepare: 'What to prepare.',
      termsLabel: 'Terms on request',
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
      manufacturers: 'Производителям',
      directions: 'Направления',
      pavilion: 'Павильон',
      contacts: 'Контакты',
      skip: 'Перейти к содержанию',
      menu: 'Меню',
      close: 'Закрыть',
      language: 'Язык',
      home: 'Rai Family Corp - на главную',
      footerMenu: 'Навигация в подвале',
      footerLanguage: 'Язык, подвал',
    },
    hero: {
      eyebrow: 'Rai Family Corp LLP · Индия',
      title: 'Российские товары и технологии для Индии. Один оператор, весь путь.',
      lead: 'Rai Family Corp LLP даёт российским производителям прямые каналы дистрибуции и маркетинговое продвижение в Индии и берёт на себя полный цикл импорта, сертификации и логистики.',
      contact: 'Связаться',
      directions: 'Смотреть направления',
      manufacturers: 'Вывести продукт в Индию',
      pavilionLink: 'О павильоне',
      cardTitle:
        'От промышленных технологий и сельского хозяйства до товаров народного потребления.',
    },
    trust: {
      pavilion: 'Первый павильон программы в Индии',
      since: 'Компания с 2024 года, павильон с августа 2026',
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
      title: 'Одна точка входа для всех сторон торговли Россия - Индия',
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
        'Rai Family Corp LLP - индийская компания, учреждённая группой международных предпринимателей с многолетним опытом работы в разных странах и отраслях, включая Индию. С 21 августа 2026 года является оператором Национального Павильона «Сделано в России» в Нави-Мумбаи - проекта Российского экспортного центра. Павильон - площадка, где российские производители встречаются с индийскими дистрибьюторами, торговыми сетями и институтами.',
        'Компания предоставляет прямые каналы дистрибуции и маркетинговое продвижение и закрывает весь спектр связанных задач - исследование рынка, адаптацию продукта и упаковки, сертификацию, импортные процедуры, юридическое сопровождение и логистику.',
      ],
      leadership: 'Руководство',
      more: 'Подробнее о компании',
    },
    services: {
      eyebrow: 'Услуги',
      title: 'От исследования рынка до полки',
      lead: 'Восемь направлений услуг: от аналитики и сертификации до маркетплейсов, выставок и юридического сопровождения. Каждая услуга доступна отдельно или в составе единой программы.',
      more: 'Как мы работаем с производителями',
    },
    directions: {
      eyebrow: 'Направления',
      title: 'Товары и технологии, которые мы привозим в Индию',
      lead: 'Российские бренды и продуктовые линейки, которые мы ввозим, сертифицируем и распространяем в Индии.',
      more: 'Подробнее',
      moreProducts: '+{count}',
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
        reference: 'Референс-лист',
        leaflet: 'Буклет',
        catalogue: 'Каталог',
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
      more: 'Подробнее о павильоне',
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
      lead: 'Производитель, дистрибьютор или институт - напишите нам, и мы направим запрос нужному человеку.',
      email: 'Почта',
      phone: 'Телефон',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      address: 'Адрес офиса',
      placeholder: 'будет добавлено',
    },
    footer: {
      legal: 'Rai Family Corp LLP',
      socialMedia: 'Социальные сети',
      socialLinks: { linkedin: 'LinkedIn', facebook: 'Facebook' },
      operator:
        'Оператор Национального Павильона «Сделано в России» в Индии, проекта Российского экспортного центра',
      rights: 'Все права защищены.',
      madeInRussia:
        '«Сделано в России» - товарный знак Российского экспортного центра, используется с разрешения.',
    },
    notFound: {
      title: 'Страница не найдена',
      text: 'Возможно, страница переехала или никогда не существовала.',
      back: 'На главную',
    },
    external: { newTab: 'откроется в новой вкладке' },
    aboutPage: {
      title: 'О компании Rai Family Corp: B2B и B2C оператор российских товаров в Индии',
      description:
        'Rai Family Corp LLP работает в двух моделях: B2B как оператор Национального Павильона «Сделано в России» в Нави-Мумбаи, импортёр и дистрибьютор, и B2C через собственный интернет-магазин The Rus Store. Руководство, статус, реквизиты.',
      h1: 'Две модели бизнеса: B2B и B2C',
      lead: 'Rai Family Corp LLP работает с российскими товарами в Индии в двух моделях: B2B как оператор Национального Павильона «Сделано в России», импортёр и дистрибьютор, и B2C как владелец интернет-магазина The Rus Store.',
      b2b: {
        title: 'Павильон, импорт и дистрибуция',
        audiences: {
          manufacturers: {
            title: 'Российские производители',
            text: 'Прямые каналы дистрибуции и маркетинговое продвижение в Индии, а за ними весь маршрут до полки: исследование рынка, адаптация продукта и упаковки, сертификация, импортные процедуры, юридическое сопровождение и логистика.',
          },
          distributors: {
            title: 'Индийские дистрибьюторы, ритейл, госструктуры и институты развития',
            text: 'Российские бренды и линейки, которые мы ввозим, сертифицируем и распространяем в Индии, с техническими документами на странице каждого направления.',
          },
        },
        links: { distributors: 'Каталог направлений' },
      },
      b2c: {
        title: 'The Rus Store, наш интернет-магазин',
        audience: {
          title: 'Покупатели в Индии',
          text: 'Российские товары онлайн с доставкой по Индии. Для производителя это розничный канал, где его продукт продаётся конечному покупателю.',
        },
        linkNote: 'на английском',
      },
      leadershipIntro:
        'Компания учреждена в 2024 году группой международных предпринимателей с многолетним опытом работы в разных странах и отраслях, включая Индию.',
      status: {
        title: 'Статус и знак «Сделано в России»',
        programme: 'Страница программы РЭЦ «Российские национальные павильоны за рубежом»',
        programmeNote: null,
      },
      details: {
        title: 'Реквизиты',
        legalName: 'Юридическое лицо',
        llpin: 'LLPIN',
        gstin: 'GSTIN',
        iec: 'IEC',
        registered: 'Регистрация',
        jurisdiction: 'Юрисдикция',
        office: 'Зарегистрированный офис',
        documents: 'Документы',
        gstCertificate: 'Свидетельство о регистрации GST (EN)',
        iecCertificate: 'Сертификат IEC (EN)',
      },
    },
    manufacturersPage: {
      rows: { whatWeDo: 'Что делаем', fromYou: 'От вас', result: 'Результат', timing: 'Срок' },
      stepMore: 'Подробнее о шаге',
      servicesLabel: 'Услуги:',
      listMore: 'Ещё {count} {count:пункт|пункта|пунктов}',
      forAnyProduct: 'Для любого продукта',
      byCategory: 'По категориям',
      access: 'Маршрут допуска.',
      prepare: 'Что подготовить.',
      termsLabel: 'Условия по запросу',
    },
  },
};

/** Pavilion page copy, transferred from the customer’s 2026-11-03 review edition. */
const pavilionPageCopy = {
  ru: {
    kicker: 'Проект Российского экспортного центра',
    title: 'Национальный павильон «Сделано в России» в Нави-Мумбаи',
    lead: 'Постоянная площадка в Индии для знакомства с российской продукцией и технологиями, а также для деловых встреч. Официальный оператор павильона Rai Family Corp LLP помогает российским производителям и индийским партнёрам обсуждать поставки и развивать сотрудничество.',
    opened: 'Открыт 21 августа 2026 года · Нави-Мумбаи, Индия',
    visit: 'Как посетить',
    resident: 'Стать резидентом',
    aboutTitle: 'О павильоне',
    gallery: 'Открытие павильона',
    galleryLead: 'Официальное открытие павильона. Нави-Мумбаи, 21 августа 2026 года.',
    aboutP: [
      'Национальный павильон «Сделано в России» в Нави-Мумбаи входит в программу Российского экспортного центра по продвижению российских товаров за рубежом. Здесь производители могут представить продукцию, а индийские покупатели - познакомиться с образцами и обсудить сотрудничество.',
      'Rai Family Corp LLP - официальный оператор павильона в Индии. Компания сопровождает выход российских производителей на местный рынок: от импорта, сертификации и логистики до дистрибуции и маркетингового продвижения.',
    ],
    rec: 'Павильон на сайте РЭЦ',
    cap: 'Возможности павильона',
    caps: [
      [
        'Знакомство с продукцией',
        'Посмотрите представленные товары и обсудите их особенности с оператором.',
      ],
      [
        'Демонстрации и дегустации',
        'Обсудите с командой подходящий формат знакомства с интересующей продукцией.',
      ],
      [
        'Деловые встречи',
        'Встретьтесь с оператором, чтобы обсудить поставки, дистрибуцию и сотрудничество.',
      ],
      [
        'Поддержка производителей',
        'Обсудите представление продукции в павильоне и дальнейшую работу на индийском рынке.',
      ],
    ],
    residentEntries: [
      {
        name: 'Дикая Сибирь',
        legal: 'ООО «Дикая Сибирь»',
      },
      {
        name: 'MAKFA',
        legal: 'АО «МАКФА»',
      },
      {
        name: 'ГЛАВПРОДУКТ',
        legal: 'ООО «Гарант»',
      },
      {
        name: 'ЭФКО-Каскад',
        legal: 'ООО «КРЦ «ЭФКО-Каскад»',
      },
      {
        name: 'Татспиртпром',
        legal: 'АО «Татспиртпром»',
      },
      {
        name: 'Мираторг',
        legal: 'ООО «ТК «Мираторг»',
      },
      {
        name: 'Объединённые кондитеры',
        legal: 'ООО «Объединенные кондитеры»',
      },
      {
        name: 'Алмадез',
        legal: 'ООО «Базовая дезинфекция»',
      },
      {
        name: 'Свитлогорье',
        legal: 'АО «ДМЗ» · Дмитровский Молочный Завод',
      },
      {
        name: 'РОСА',
        legal: 'МК РОСА · «Алтайская сказка»',
      },
      {
        name: 'Союзпищепром',
        legal: 'ООО «Объединение «Союзпищепром»',
      },
      {
        name: 'OK Beauty',
        legal: 'ООО «Фэйм Лэйбл»',
      },
      {
        name: 'Меренга',
        legal: 'ООО «Карамелия»',
      },
      {
        name: 'PASSIM',
        legal: 'ООО «Первая Крупяная Компания»',
      },
      {
        name: 'Салют Алко',
        legal: 'ООО «Салют Алко»',
      },
      {
        name: 'TORERO',
        legal: 'ООО «Кондитер-Мастер»',
      },
      {
        name: 'Дербентский коньячный комбинат',
        legal: 'АО «ДКК»',
      },
      {
        name: 'Сибэкохим',
        legal: 'ООО ОПК «Сибэкохим»',
      },
      {
        name: 'Сташевское Био',
        legal: 'Сташевское',
      },
      {
        name: 'BioFoodLab',
        legal: 'Bite · Bitey',
      },
      {
        name: 'Helmetex',
        legal: 'ООО «Хелметекс»',
      },
      {
        name: 'BOTAVIKOS',
        legal: 'ООО «Ботавикос»',
      },
      {
        name: 'Алтайский букет',
        legal: 'ООО «Алтайский букет»',
      },
      {
        name: 'ALTARIA',
        legal: 'ООО «Алтария»',
      },
      {
        name: 'Саратов-Лавр',
        legal: '«Эстетика вкуса»',
      },
      {
        name: 'Модный дом Нины Ручкиной',
        legal: '«Русские в моде»',
      },
      {
        name: 'Кахети',
        legal: 'ООО «Кахети»',
      },
      {
        name: 'pamilee',
        legal: 'ООО «Джи-Эл-Пи»',
      },
      {
        name: 'Сокровища Крыма',
        legal: 'ООО «Экобренды»',
      },
      {
        name: 'Афанасий',
        legal: 'Частная пивоварня «Афанасий»',
      },
      {
        name: 'Хлебный Спас',
        legal: 'ООО «Диал-К»',
      },
      {
        name: 'Агро Экспорт ДВ',
        legal: 'ООО «Агро Экспорт ДВ»',
      },
      {
        name: 'RCH Cosmetics',
        legal: 'ООО «Рид-Косметикс»',
      },
      {
        name: 'B&B',
        legal: 'АО «Би-энд-Би»',
      },
      {
        name: 'Сладонеж',
        legal: 'ООО ТПК «Сладонеж»',
      },
      {
        name: 'Аква-Кристалл',
        legal: 'ООО «Аква-Кристалл»',
      },
      {
        name: 'Berdinberg',
        legal: 'ООО «ДигЗИВ-БЛ»',
      },
      {
        name: 'Высший Вкус',
        legal: 'ООО «Высший Вкус»',
      },
      {
        name: 'Kennerton',
        legal: 'ООО «Фишер Аудио»',
      },
      {
        name: 'ZERAPY',
        legal: 'ИП Леснов Георгий Феликсович',
      },
      {
        name: 'GLS Pharmaceuticals',
        legal: 'ООО «Джи Эл Эс Фармасьютикалз»',
      },
      {
        name: 'Global White',
        legal: 'ООО «Глобал Дент»',
      },
      {
        name: 'LAVR',
        legal: 'ООО ТД «ЛАВР»',
      },
      {
        name: 'Лаваж Глобал',
        legal: 'Научно-методический центр',
      },
    ],
    residents: 'Резиденты павильона',
    media: 'Публикации об открытии',
    residentsP:
      'Познакомьтесь с компаниями, представленными в павильоне. Подробнее о продукции - на их официальных сайтах.',
    more: 'Показать весь список',
    less: 'Свернуть список',
    news: 'Новости и события',
    newsP:
      'События павильона, новости Rai Family Corp LLP, предстоящие выставки и публикации в СМИ.',
    upcoming: 'Скоро',
    dates: [
      '9-11 декабря 2026',
      '10-12 декабря 2026',
      '26 октября 2026',
      '22 октября 2026',
      '18-19 октября 2026',
      '7 октября 2026',
      '21 августа 2026',
      '3-5 июня 2026',
    ],
    types: [
      'Анонс',
      'Анонс',
      'В СМИ · Партнёрский материал',
      'Событие · Пуна, Индия',
      'Новость компании',
      'В СМИ · Партнёрский материал',
      'Событие · Нави-Мумбаи',
      'Событие · Мумбаи',
    ],
    stands: ['Стенд A27', 'Стенд 1.A25 · Зал Jasmine 1'],
    details: 'Подробнее об участии',
    meeting: 'Договориться о встрече',
    mediaEntries: [
      {
        name: 'The Times of India',
        label: 'Spotlight',
      },
      {
        name: 'Hindustan Times',
        label: 'Genesis',
      },
      {
        name: 'Рамблер / ТАСС',
        label: 'Перепечатка ТАСС / TASS republication',
      },
      {
        name: 'Financial One / ТАСС',
        label: 'Перепечатка ТАСС / TASS republication',
      },
      {
        name: 'ABP Live',
        label: 'Sponsored',
      },
      {
        name: 'The Tribune',
        label: 'Sponsored',
      },
    ],
    past: 'События и публикации',
    visiting: 'Как посетить павильон',
    address: [
      'Офис 1307/1308, 13-й этаж, NMS Titanium',
      'Plot No 74, Sector-15, CBD Belapur',
      'Нави-Мумбаи, Махараштра 400614, Индия',
    ],
    addressIntro: 'Павильон находится по адресу офиса Rai Family Corp LLP.',
    map: 'Открыть карту',
    hours: 'Пн-Пт · 11:00-18:00',
    closed: 'По местному времени Индии (IST). Суббота, воскресенье и праздничные дни - выходные.',
    welcome: 'Приходите познакомиться',
    noRegistration:
      'Предварительная регистрация не требуется. Чтобы договориться о встрече с командой, позвоните или напишите в WhatsApp.',
    call: 'Позвонить',
    whatsapp: 'Написать в WhatsApp',
    office: 'Телефон офиса',
    close: 'Закрыть',
    photoDate: 'Нави-Мумбаи · 21 августа 2026',
    photos: {
      'meeting-area': 'Зона встреч и экспозиция',
      'opening-guests': 'Гости официального открытия',
      'opening-moment': 'Момент официального открытия',
      'opening-group': 'Групповой снимок на открытии',
      'opening-hall': 'Общий вид зала на открытии',
      'opening-conversations': 'Общение гостей на открытии',
      'opening-hall-wide': 'Гости в зале павильона',
    },
    articles: [
      {
        title: 'Rai Family Corp LLP примет участие в Annapoorna Inter Food 2026',
        paragraphs: [
          '9-11 декабря Rai Family Corp LLP примет участие в международной выставке продуктов питания и напитков Annapoorna Inter Food 2026 в Bombay Exhibition Centre, Мумбаи.',
          'Приглашаем импортёров, дистрибьюторов, представителей розничных сетей и HoReCa встретиться с нашей командой на стенде **A27**, познакомиться с деятельностью компании и обсудить возможности сотрудничества.',
          'Чтобы договориться о встрече, позвоните или напишите в WhatsApp: **{meetingPhone}**.',
          '[Договориться о встрече]({meetingWhatsapp})',
        ],
      },
      {
        title: 'Встречайте Rai Family Corp LLP на Cosmoprof India 2026',
        paragraphs: [
          '10-12 декабря Rai Family Corp LLP примет участие в Cosmoprof India 2026 - профессиональной выставке индустрии красоты в Jio World Convention Centre, Мумбаи.',
          'Приглашаем дистрибьюторов, представителей розничных сетей и других участников отрасли обсудить сотрудничество и продвижение российских брендов на индийском рынке. Наша команда будет работать на стенде **1.A25 в зале Jasmine 1**.',
          'Чтобы договориться о встрече, позвоните или напишите в WhatsApp: **{meetingPhone}**.',
          '[Договориться о встрече]({meetingWhatsapp})',
        ],
      },
      {
        title: 'The Economic Times - о роли павильона в продвижении российских товаров',
        paragraphs: [
          'The Economic Times рассматривает три направления развития российского экспорта в Индию: постоянный павильон в Нави-Мумбаи, электронную торговлю и деловые связи, формируемые на международном форуме «Сделано в России» в Москве.',
          'В материале показано, как павильон помогает индийским покупателям знакомиться с продукцией, запрашивать образцы и вести переговоры, а работа оператора поддерживает взаимодействие с российскими производителями между выставками и деловыми визитами.',
          '[Читать материал на английском](https://economictimes.indiatimes.com/industry/services/retail/mumbai-marketplace-moscow-three-ms-for-russian-exports-to-india/articleshow/135210953.cms)',
        ],
      },
      {
        title:
          'Павильон «Сделано в России» представлен на российско-индийском круглом столе в Пуне',
        paragraphs: [
          '22 октября в Пуне состоялся российско-индийский круглый стол, организованный Генеральным консульством России в Мумбаи совместно с Торгово-промышленной палатой Маратха (MCCIA). В мероприятии участвовали представители павильона «Сделано в России», Сбербанка, местных компаний и деловых объединений.',
          'В ходе презентации павильона участникам рассказали о возможностях продвижения российской продукции в Индии и установления прямых контактов с производителями. Обсуждение было посвящено развитию торгово-экономического и инвестиционного сотрудничества, с особым вниманием к деловым связям с предприятиями Пуны.',
          '[Сообщение Генконсульства в Telegram - на английском](https://t.me/rusmumbai/2924)',
        ],
      },
      {
        title: 'Rai Family Corp LLP и Helmetex обсудили локализацию производства в Индии',
        paragraphs: [
          '18-19 октября Rai Family Corp LLP провела встречу и переговоры с руководством российской компании Helmetex.',
          'Стороны обсудили планы локализации производства продукции Helmetex на территории Индии. Для создания совместного предприятия найден индийский партнёр. Проект находится на стадии подготовки к реализации.',
        ],
      },
      {
        title:
          'The Times of India - о павильоне и роли Rai Family в российско-индийском сотрудничестве',
        paragraphs: [
          'В материале об INNOPROM. India издание The Times of India рассматривает развитие торговых связей между российскими производителями и индийскими покупателями.',
          'Отдельное внимание уделено национальному павильону «Сделано в России» в Нави-Мумбаи и его оператору Rai Family Corp LLP. Публикация рассказывает о роли компании в продвижении продукции, логистике и работе с местными каналами продаж, а также о возможностях постоянной площадки для знакомства с товарами и обсуждения поставок.',
          '[Читать материал на английском](https://timesofindia.indiatimes.com/business/a-diverse-product-mix-and-new-markets-to-match-at-innoprom-india/articleshow/134760240.cms)',
        ],
      },
      {
        id: 'pavilion-opening',
        title: 'В Нави-Мумбаи открылся национальный павильон «Сделано в России»',
        paragraphs: [
          '21 августа 2026 года в Нави-Мумбаи состоялось официальное открытие первого в Индии постоянно действующего национального павильона «Сделано в России». Проект реализуется Российским экспортным центром, официальный оператор павильона - Rai Family Corp LLP.',
          'Павильон предоставляет российским производителям постоянную площадку для демонстрации продукции и деловых встреч. Индийские импортёры, дистрибьюторы и представители розничных сетей могут познакомиться с товарами, оценить образцы и обсудить возможности сотрудничества.',
          'Rai Family Corp LLP обеспечивает работу площадки и сопровождает выход российских производителей на индийский рынок, включая логистику, таможенное оформление и маркетинговую поддержку.',
        ],
      },
      {
        id: 'world-of-concrete-2026',
        title: 'Rai Family Corp LLP на World of Concrete India 2026',
        paragraphs: [
          '3-5 июня 2026 года Rai Family Corp LLP приняла участие в World of Concrete India 2026 в выставочном центре Bombay Exhibition Centre, Мумбаи.',
          'Работа команды проходила на стенде TOKAR LTD, RUSSIA (4.C90), где были представлены добавка Д-5 для бетона и образцы строительных материалов. Представители компании встречались с посетителями выставки и знакомили их с российскими решениями для строительной отрасли.',
        ],
      },
    ],
    worldOfConcrete: {
      detailCaption:
        'World of Concrete India 2026, Bombay Exhibition Centre, Мумбаи. 3-5 июня 2026.',
      media: 'Публикации о выставке',
      mediaLead: 'Материалы об отраслевой выставке в целом.',
      mediaEntries: [
        'NBM&CW: открытие World of Concrete India 2026',
        'TradeFairTimes: обзор World of Concrete India 2026',
      ],
      photos: {
        'world-of-concrete-2026-booth': {
          caption: 'У стенда TOKAR на World of Concrete India 2026',
          alt: 'Участники выставки у стенда TOKAR с материалами Д-5',
        },
        'world-of-concrete-2026-meeting': {
          caption: 'Рабочая встреча на стенде TOKAR',
          alt: 'Рабочая встреча за столом с образцами бетона на стенде TOKAR',
        },
      },
    },
    breadcrumb: 'Навигационная цепочка',
    enlarge: 'Увеличить',
    eventNames: ['Annapoorna Inter Food 2026', 'Cosmoprof India 2026'],
    venues: ['Bombay Exhibition Centre, Mumbai', 'Jio World Convention Centre, Mumbai'],
  },
  en: {
    kicker: 'A Russian Export Center project',
    title: '«Made in Russia» National Pavilion in Navi Mumbai',
    lead: 'A permanent venue in India for exploring Russian products and technologies, as well as for business meetings. Rai Family Corp LLP, the pavilion’s official operator, helps Russian manufacturers and Indian partners discuss supply opportunities and develop cooperation.',
    opened: 'Opened on 21 August 2026 · Navi Mumbai, India',
    visit: 'Plan your visit',
    resident: 'Become a resident',
    aboutTitle: 'About the pavilion',
    gallery: 'Pavilion opening',
    galleryLead: 'The pavilion’s official opening. Navi Mumbai, 21 August 2026.',
    aboutP: [
      'The «Made in Russia» National Pavilion in Navi Mumbai is part of the Russian Export Center’s programme promoting Russian products abroad. It provides a venue where manufacturers can present their products and Indian buyers can explore samples and discuss cooperation.',
      'Rai Family Corp LLP is the pavilion’s official operator in India. The company supports Russian manufacturers entering the local market through import services, certification support, logistics, distribution and marketing.',
    ],
    rec: 'Pavilion on the REC website · RU',
    cap: 'Pavilion capabilities',
    caps: [
      [
        'Explore products',
        'View the products on display and discuss their features with the operator.',
      ],
      [
        'Product demonstrations and tastings',
        'Contact the team to discuss a suitable format for exploring the products that interest you.',
      ],
      [
        'Business meetings',
        'Meet the operator to discuss supply, distribution and partnership opportunities.',
      ],
      [
        'Support for manufacturers',
        'Discuss showcasing your products at the pavilion and developing your presence in India.',
      ],
    ],
    residentEntries: [
      {
        name: 'Wild Siberia',
        legal: 'Wild Siberia LLC',
      },
      {
        name: 'MAKFA',
        legal: 'MAKFA JSC',
      },
      {
        name: 'GLAVPRODUCT',
        legal: 'Garant LLC',
      },
      {
        name: 'EFKO-Kaskad',
        legal: 'KRC EFKO-Kaskad LLC',
      },
      {
        name: 'Tatspirtprom',
        legal: 'Tatspirtprom JSC',
      },
      {
        name: 'Miratorg',
        legal: 'Trading Company Miratorg LLC',
      },
      {
        name: 'United Confectioners',
        legal: 'United Confectioners LLC',
      },
      {
        name: 'Almadez',
        legal: 'Bazovaya Dezinfektsiya LLC',
      },
      {
        name: 'Svitlogorye',
        legal: 'DMZ JSC · Dmitrov Dairy Plant',
      },
      {
        name: 'ROSA',
        legal: 'MK ROSA · Altayskaya Skazka',
      },
      {
        name: 'Soyuzpishcheprom',
        legal: 'Soyuzpishcheprom Association',
      },
      {
        name: 'OK Beauty',
        legal: 'Fame Label LLC',
      },
      {
        name: 'Merenga',
        legal: 'Karameliya LLC',
      },
      {
        name: 'PASSIM',
        legal: 'Pervaya Krupyanaya Kompaniya LLC',
      },
      {
        name: 'Salut Alko',
        legal: 'Salut Alko LLC',
      },
      {
        name: 'TORERO',
        legal: 'Konditer-Master LLC',
      },
      {
        name: 'Derbent Cognac Plant',
        legal: 'DKK JSC',
      },
      {
        name: 'Sibekohim',
        legal: 'OPK Sibekohim LLC',
      },
      {
        name: 'Stashevskoe Bio',
        legal: 'Stashevskoe',
      },
      {
        name: 'BioFoodLab',
        legal: 'Bite · Bitey',
      },
      {
        name: 'Helmetex',
        legal: 'Helmetex LLC',
      },
      {
        name: 'BOTAVIKOS',
        legal: 'Botavikos LLC',
      },
      {
        name: 'Altai Buket',
        legal: 'Altai Buket LLC',
      },
      {
        name: 'ALTARIA',
        legal: 'Altaria LLC',
      },
      {
        name: 'Saratov-Lavr',
        legal: 'Estetika Vkusa',
      },
      {
        name: 'Nina Ruchkina Fashion House',
        legal: 'Russkie v Mode',
      },
      {
        name: 'Kaheti',
        legal: 'Kaheti LLC',
      },
      {
        name: 'pamilee',
        legal: 'JLP LLC',
      },
      {
        name: 'Sokrovishcha Kryma',
        legal: 'Ecobrands LLC',
      },
      {
        name: 'Afanasiy',
        legal: 'Afanasiy Private Brewery',
      },
      {
        name: 'Khlebny Spas',
        legal: 'Dial-K LLC',
      },
      {
        name: 'Agro Export DV',
        legal: 'Agro Export DV LLC',
      },
      {
        name: 'RCH Cosmetics',
        legal: 'Reed-Cosmetics LLC',
      },
      {
        name: 'B&B',
        legal: 'B&B JSC',
      },
      {
        name: 'Sladonezh',
        legal: 'TPK Sladonezh LLC',
      },
      {
        name: 'Akva-Kristall',
        legal: 'Akva-Kristall LLC',
      },
      {
        name: 'Berdinberg',
        legal: 'DigZIV-BL LLC',
      },
      {
        name: 'Vysshiy Vkus',
        legal: 'Vysshiy Vkus LLC',
      },
      {
        name: 'Kennerton',
        legal: 'Fischer Audio LLC',
      },
      {
        name: 'ZERAPY',
        legal: 'Georgiy Feliksovich Lesnov · Sole proprietor',
      },
      {
        name: 'GLS Pharmaceuticals',
        legal: 'GLS Pharmaceuticals LLC',
      },
      {
        name: 'Global White',
        legal: 'Global Dent LLC',
      },
      {
        name: 'LAVR',
        legal: 'LAVR Trading House LLC',
      },
      {
        name: 'Lavage Global',
        legal: 'Scientific and Methodological Center',
      },
    ],
    residents: 'Pavilion residents',
    media: 'Media coverage',
    residentsP:
      'Explore the companies represented at the pavilion. Visit their official websites to learn more about their products.',
    more: 'View all residents',
    less: 'Show fewer residents',
    news: 'News & Events',
    newsP: 'Pavilion events, Rai Family Corp LLP news, upcoming exhibitions and media coverage.',
    upcoming: 'Upcoming',
    dates: [
      '9-11 December 2026',
      '10-12 December 2026',
      '26 October 2026',
      '22 October 2026',
      '18-19 October 2026',
      '7 October 2026',
      '21 August 2026',
      '3-5 June 2026',
    ],
    types: [
      'Upcoming event',
      'Upcoming event',
      'In the media · Partner content',
      'Event · Pune, India',
      'Company news',
      'In the media · Partner content',
      'Event · Navi Mumbai',
      'Event · Mumbai',
    ],
    stands: ['Stand A27', 'Stand 1.A25 · Jasmine Hall 1'],
    details: 'About our participation',
    meeting: 'Arrange a meeting',
    mediaEntries: [
      {
        name: 'The Times of India',
        label: 'Spotlight',
      },
      {
        name: 'Hindustan Times',
        label: 'Genesis',
      },
      {
        name: 'Рамблер / ТАСС',
        label: 'TASS republication',
      },
      {
        name: 'Financial One / ТАСС',
        label: 'TASS republication',
      },
      {
        name: 'ABP Live',
        label: 'Sponsored',
      },
      {
        name: 'The Tribune',
        label: 'Sponsored',
      },
    ],
    past: 'Events & media coverage',
    visiting: 'Visiting the pavilion',
    address: [
      'Office No 1307/1308, 13th Floor, NMS Titanium',
      'Plot No 74, Sector-15, CBD Belapur',
      'Navi Mumbai, Maharashtra 400614, India',
    ],
    addressIntro: 'The pavilion is located at the Rai Family Corp LLP office.',
    map: 'Open map',
    hours: 'Mon-Fri · 11:00 am-6:00 pm',
    closed: 'India Standard Time (IST). Closed on Saturdays, Sundays and public holidays.',
    welcome: 'Come and meet us',
    noRegistration:
      'No advance registration is required. To arrange a meeting with the team, call or message us on WhatsApp.',
    call: 'Call us',
    whatsapp: 'Message on WhatsApp',
    office: 'Office telephone',
    close: 'Close',
    photoDate: 'Navi Mumbai · 21 August 2026',
    photos: {
      'meeting-area': 'Meeting area and product displays',
      'opening-guests': 'Guests at the official opening',
      'opening-moment': 'A moment from the official opening',
      'opening-group': 'Group photograph at the opening',
      'opening-hall': 'The room during the official opening',
      'opening-conversations': 'Guests in conversation at the opening',
      'opening-hall-wide': 'Guests in the pavilion hall',
    },
    articles: [
      {
        title: 'Meet Rai Family Corp LLP at Annapoorna Inter Food 2026',
        paragraphs: [
          'Rai Family Corp LLP will take part in Annapoorna Inter Food 2026, the international food and beverage trade exhibition, on 9-11 December at the Bombay Exhibition Centre in Mumbai.',
          'We invite importers, distributors, retailers and hospitality professionals to meet our team at **Stand A27**, learn about our work and explore opportunities for cooperation.',
          'To arrange a meeting, call or message us on WhatsApp: **{meetingPhone}**.',
          '[Arrange a meeting]({meetingWhatsapp})',
        ],
      },
      {
        title: 'Meet Rai Family Corp LLP at Cosmoprof India 2026',
        paragraphs: [
          'Rai Family Corp LLP will participate in Cosmoprof India 2026, the beauty industry trade exhibition, on 10-12 December at the Jio World Convention Centre in Mumbai.',
          'We welcome distributors, retailers and other beauty industry professionals to discuss partnerships and opportunities to bring Russian brands to the Indian market. Meet our team at **Stand 1.A25 in Jasmine Hall 1**.',
          'To arrange a meeting, call or message us on WhatsApp: **{meetingPhone}**.',
          '[Arrange a meeting]({meetingWhatsapp})',
        ],
      },
      {
        title: 'The Economic Times explores the pavilion’s role in bringing Russian goods to India',
        paragraphs: [
          'The Economic Times examines three channels supporting Russian exports to India: the permanent pavilion in Navi Mumbai, e-commerce and business connections developed through the «Made in Russia» International Export Forum in Moscow.',
          'The article explains how the pavilion gives Indian buyers a place to explore products, request samples and hold discussions, while the operator maintains contact with Russian manufacturers between exhibitions and business visits.',
          '[Read the article](https://economictimes.indiatimes.com/industry/services/retail/mumbai-marketplace-moscow-three-ms-for-russian-exports-to-india/articleshow/135210953.cms)',
        ],
      },
      {
        title: '«Made in Russia» Pavilion presented at Russia-India roundtable in Pune',
        paragraphs: [
          'On 22 October, Pune hosted a Russia-India roundtable jointly organised by the Consulate General of Russia in Mumbai and the Mahratta Chamber of Commerce, Industries and Agriculture (MCCIA). Representatives of the «Made in Russia» Pavilion, Sberbank, local companies and business associations attended the event.',
          'A presentation of the pavilion introduced opportunities to promote Russian products in India and connect directly with manufacturers. Discussions focused on expanding trade, economic and investment cooperation, with particular attention to business ties with companies in Pune.',
          '[Read the Consulate General’s update on Telegram](https://t.me/rusmumbai/2924)',
        ],
      },
      {
        title: 'Rai Family Corp LLP and Helmetex discuss local production in India',
        paragraphs: [
          'On 18-19 October, Rai Family Corp LLP met with the management of Russian company Helmetex for business discussions.',
          'The talks focused on plans to establish local production of Helmetex products in India. An Indian partner has been identified for the planned joint venture. The project is at the preparatory stage.',
        ],
      },
      {
        title:
          'The Times of India highlights the pavilion and Rai Family’s role in Russia-India trade',
        paragraphs: [
          'In an article about INNOPROM. India, The Times of India explores the development of trade connections between Russian manufacturers and Indian buyers.',
          'The publication also features the «Made in Russia» National Pavilion in Navi Mumbai and its operator, Rai Family Corp LLP. It describes the company’s role in product promotion, logistics and local sales channels, and explains how the permanent venue enables buyers to explore products and discuss supply opportunities.',
          '[Read the article](https://timesofindia.indiatimes.com/business/a-diverse-product-mix-and-new-markets-to-match-at-innoprom-india/articleshow/134760240.cms)',
        ],
      },
      {
        id: 'pavilion-opening',
        title: '«Made in Russia» National Pavilion opens in Navi Mumbai',
        paragraphs: [
          'India’s first permanent «Made in Russia» National Pavilion officially opened in Navi Mumbai on 21 August 2026. The project is run by the Russian Export Center, with Rai Family Corp LLP serving as the pavilion’s official operator.',
          'The pavilion gives Russian manufacturers a permanent venue for product displays and business meetings. Indian importers, distributors and retailers can explore products, assess samples and discuss opportunities for cooperation.',
          'Rai Family Corp LLP operates the venue and supports Russian manufacturers entering the Indian market, including assistance with logistics, customs clearance and marketing.',
        ],
      },
      {
        id: 'world-of-concrete-2026',
        title: 'Rai Family Corp LLP at World of Concrete India 2026',
        paragraphs: [
          'Rai Family Corp LLP took part in World of Concrete India 2026, held on 3-5 June at the Bombay Exhibition Centre in Mumbai.',
          'The team worked at the TOKAR LTD, RUSSIA stand (4.C90), which featured the D-5 concrete admixture and samples of construction materials. Company representatives met exhibition visitors and introduced Russian solutions for the construction industry.',
        ],
      },
    ],
    worldOfConcrete: {
      detailCaption:
        'World of Concrete India 2026, Bombay Exhibition Centre, Mumbai. 3-5 June 2026.',
      media: 'Exhibition coverage',
      mediaLead: 'Coverage of the exhibition as a whole.',
      mediaEntries: [
        'NBM&CW: World of Concrete India 2026 opens',
        'TradeFairTimes: World of Concrete India 2026 review',
      ],
      photos: {
        'world-of-concrete-2026-booth': {
          caption: 'At the TOKAR stand at World of Concrete India 2026',
          alt: 'Exhibition participants at the TOKAR stand displaying D-5 materials',
        },
        'world-of-concrete-2026-meeting': {
          caption: 'A business meeting at the TOKAR stand',
          alt: 'A business meeting around concrete samples at the TOKAR stand',
        },
      },
    },
    breadcrumb: 'Breadcrumb',
    enlarge: 'Enlarge',
    eventNames: ['Annapoorna Inter Food 2026', 'Cosmoprof India 2026'],
    venues: ['Bombay Exhibition Centre, Mumbai', 'Jio World Convention Centre, Mumbai'],
  },
};

/** Resolve both event paragraphs and editorial links from the selected locale contact. */
export function getPavilionPageCopy(
  locale: import('./config').Locale,
  meetingContact: { label: string; whatsapp: string },
) {
  const copy = pavilionPageCopy[locale];
  return {
    ...copy,
    articles: copy.articles.map((article, index) =>
      index < 2
        ? {
            ...article,
            paragraphs: article.paragraphs.map((paragraph) =>
              paragraph
                .replace('{meetingPhone}', meetingContact.label)
                .replace('{meetingWhatsapp}', meetingContact.whatsapp),
            ),
          }
        : article,
    ),
  };
}
