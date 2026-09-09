/*
  All site copy. EN is the source; RU and HI are translations.
  HI is a draft awaiting native review.
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
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
  };
  trust: { operator: string; pavilion: string; since: string; mark: string };
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
    backToContacts: string;
    contactsIntro: string;
    audiencesLabel: string;
    otherDirections: string;
  };
  pavilion: {
    eyebrow: string;
    title: string;
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

export const ui: Record<'en' | 'ru' | 'hi', Copy> = {
  en: {
    meta: {
      siteName: 'Rai Family Corp',
      title: 'Rai Family Corp — Official operator of the Russian Export Center pavilion in India',
      description:
        'Rai Family Corp LLP promotes Russian products in India as the official operator of the Russian Export Center pavilion: distribution, marketing, import, certification and logistics.',
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
    },
    hero: {
      eyebrow: 'Official operator of the Russian Export Center pavilion in India',
      title: 'Russian products in India. One operator, the whole route.',
      lead: 'Rai Family Corp LLP gives Russian manufacturers direct distribution channels and marketing in India, and handles the full cycle of import, certification and logistics.',
      ctaPrimary: 'Contact us',
      ctaSecondary: 'Explore directions',
      badge: 'Made in Russia. Trusted by the world',
    },
    trust: {
      operator: 'Official REC pavilion operator',
      pavilion: 'Pavilion in Navi Mumbai',
      since: 'Operating since 2024',
      mark: 'Made in Russia mark',
    },
    audiences: {
      eyebrow: 'Who we work with',
      title: 'One entry point for every side of Russia–India trade',
      lead: 'Manufacturers, distributors, institutions and consumers meet Russian products through the same pavilion and the same operator.',
      items: {
        manufacturers: {
          title: 'Russian manufacturers',
          text: 'Enter the Indian market through the official REC pavilion: market assessment, adaptation, certification, import and distribution under one contract.',
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
          text: 'Products carrying the Made in Russia mark are imported, certified and distributed in India through this pavilion.',
          cta: 'Browse products',
        },
      },
    },
    about: {
      eyebrow: 'About the company',
      title: 'The official gateway for Russian products into India',
      paragraphs: [
        'Rai Family Corp LLP is an Indian company and the official operator of the Russian Export Center pavilion in India. The pavilion is the point where Russian manufacturers meet Indian distributors, retail chains and institutions.',
        'We provide direct distribution channels and marketing promotion, and cover the full range of related work: market research, product and packaging adaptation, certification, import procedures, legal support and logistics.',
      ],
      facts: [
        { label: 'Status', value: 'Official REC pavilion operator' },
        { label: 'Founded', value: 'September 2024' },
        { label: 'Registered', value: 'India, Maharashtra' },
        { label: 'Pavilion', value: 'CBD Belapur, Navi Mumbai' },
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
      title: 'Products we bring to India',
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
      siteSoon: 'Product site coming soon',
      backToContacts: 'Contact the operator',
      contactsIntro: 'Enquiries about this direction go through Rai Family Corp, the operator.',
      audiencesLabel: 'For',
      otherDirections: 'Other directions',
    },
    pavilion: {
      eyebrow: 'Pavilion',
      title: 'Russian Export Center pavilion, Navi Mumbai',
      text: 'The pavilion is the physical home of Russian products in India: a showroom for distributors and institutions, a venue for tastings and B2B meetings, and the operator’s office.',
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
      operator: 'Official operator of the Russian Export Center pavilion in India',
      rights: 'All rights reserved.',
      madeInRussia:
        '“Made in Russia” is a trademark of the Russian Export Center, used with permission.',
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
      title:
        'Rai Family Corp — официальный оператор павильона Российского экспортного центра в Индии',
      description:
        'Rai Family Corp LLP продвигает российские товары в Индии как официальный оператор павильона Российского экспортного центра: дистрибуция, маркетинг, импорт, сертификация и логистика.',
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
    },
    hero: {
      eyebrow: 'Официальный оператор павильона Российского экспортного центра в Индии',
      title: 'Российские товары в Индии. Один оператор, весь путь.',
      lead: 'Rai Family Corp LLP даёт российским производителям прямые каналы дистрибуции и маркетинговое продвижение в Индии и берёт на себя полный цикл импорта, сертификации и логистики.',
      ctaPrimary: 'Связаться',
      ctaSecondary: 'Смотреть направления',
      badge: 'Сделано в России. Качество, которому доверяют',
    },
    trust: {
      operator: 'Официальный оператор павильона РЭЦ',
      pavilion: 'Павильон в Нави Мумбаи',
      since: 'Работаем с 2024 года',
      mark: 'Знак «Сделано в России»',
    },
    audiences: {
      eyebrow: 'С кем мы работаем',
      title: 'Одна точка входа для всех сторон торговли Россия — Индия',
      lead: 'Производители, дистрибьюторы, институты и покупатели встречают российские товары через один павильон и одного оператора.',
      items: {
        manufacturers: {
          title: 'Российские производители',
          text: 'Выход на рынок Индии через официальный павильон РЭЦ: оценка рынка, адаптация, сертификация, импорт и дистрибуция по одному договору.',
          cta: 'Смотреть услуги',
        },
        distributors: {
          title: 'Индийские дистрибьюторы и ритейл',
          text: 'Сертифицированные российские товары от одного ответственного партнёра в Нави Мумбаи: документы, логистика и маркетинговая поддержка включены.',
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
      title: 'Официальные ворота для российских товаров в Индию',
      paragraphs: [
        'Rai Family Corp LLP — индийская компания, официальный оператор павильона Российского экспортного центра в Индии. Павильон — это точка, где российские производители встречаются с индийскими дистрибьюторами, торговыми сетями и институтами.',
        'Мы предоставляем прямые каналы дистрибуции и маркетинговое продвижение и закрываем весь спектр связанных задач: исследование рынка, адаптацию продукта и упаковки, сертификацию, импортные процедуры, юридическое сопровождение и логистику.',
      ],
      facts: [
        { label: 'Статус', value: 'Официальный оператор павильона РЭЦ' },
        { label: 'Основана', value: 'Сентябрь 2024' },
        { label: 'Регистрация', value: 'Индия, Махараштра' },
        { label: 'Павильон', value: 'CBD Belapur, Нави Мумбаи' },
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
      title: 'Товары, которые мы привозим в Индию',
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
      siteSoon: 'Сайт продукта скоро появится',
      backToContacts: 'Связаться с оператором',
      contactsIntro: 'Запросы по этому направлению проходят через оператора — Rai Family Corp.',
      audiencesLabel: 'Для кого',
      otherDirections: 'Другие направления',
    },
    pavilion: {
      eyebrow: 'Павильон',
      title: 'Павильон Российского экспортного центра, Нави Мумбаи',
      text: 'Павильон — физический дом российских товаров в Индии: шоурум для дистрибьюторов и институтов, площадка для дегустаций и B2B-встреч, офис оператора.',
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
      operator: 'Официальный оператор павильона Российского экспортного центра в Индии',
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

  hi: {
    meta: {
      siteName: 'Rai Family Corp',
      title: 'Rai Family Corp — भारत में रूसी निर्यात केंद्र पवेलियन का आधिकारिक ऑपरेटर',
      description:
        'Rai Family Corp LLP रूसी निर्यात केंद्र पवेलियन के आधिकारिक ऑपरेटर के रूप में भारत में रूसी उत्पादों का प्रचार करता है: वितरण, मार्केटिंग, आयात, प्रमाणन और लॉजिस्टिक्स।',
    },
    nav: {
      about: 'कंपनी',
      services: 'सेवाएँ',
      directions: 'दिशाएँ',
      pavilion: 'पवेलियन',
      contacts: 'संपर्क',
      skip: 'सामग्री पर जाएँ',
      menu: 'मेनू',
      close: 'बंद करें',
      language: 'भाषा',
      home: 'Rai Family Corp — मुखपृष्ठ',
    },
    hero: {
      eyebrow: 'भारत में रूसी निर्यात केंद्र पवेलियन का आधिकारिक ऑपरेटर',
      title: 'भारत में रूसी उत्पाद। एक ऑपरेटर, पूरा रास्ता।',
      lead: 'Rai Family Corp LLP रूसी निर्माताओं को भारत में सीधे वितरण चैनल और मार्केटिंग प्रदान करता है, और आयात, प्रमाणन व लॉजिस्टिक्स का पूरा चक्र संभालता है।',
      ctaPrimary: 'संपर्क करें',
      ctaSecondary: 'दिशाएँ देखें',
      badge: 'Made in Russia. Trusted by the world',
    },
    trust: {
      operator: 'REC पवेलियन का आधिकारिक ऑपरेटर',
      pavilion: 'नवी मुंबई में पवेलियन',
      since: '2024 से कार्यरत',
      mark: 'Made in Russia चिह्न',
    },
    audiences: {
      eyebrow: 'हम किसके साथ काम करते हैं',
      title: 'रूस–भारत व्यापार के हर पक्ष के लिए एक प्रवेश बिंदु',
      lead: 'निर्माता, वितरक, संस्थान और उपभोक्ता एक ही पवेलियन और एक ही ऑपरेटर के माध्यम से रूसी उत्पादों से जुड़ते हैं।',
      items: {
        manufacturers: {
          title: 'रूसी निर्माता',
          text: 'आधिकारिक REC पवेलियन के माध्यम से भारतीय बाज़ार में प्रवेश: बाज़ार आकलन, अनुकूलन, प्रमाणन, आयात और वितरण — एक ही अनुबंध में।',
          cta: 'सेवाएँ देखें',
        },
        distributors: {
          title: 'भारतीय वितरक और रिटेल',
          text: 'नवी मुंबई में एक जवाबदेह साझेदार से प्रमाणित रूसी उत्पाद — दस्तावेज़, लॉजिस्टिक्स और मार्केटिंग सहायता सहित।',
          cta: 'दिशाएँ देखें',
        },
        institutions: {
          title: 'सरकारी और विकास संस्थान',
          text: 'भौतिक पवेलियन और रूसी ब्रांडों के बढ़ते पोर्टफोलियो वाला आधिकारिक ऑपरेटर — कार्यक्रमों, मिशनों और व्यापार आयोजनों के लिए।',
          cta: 'पवेलियन देखें',
        },
        consumers: {
          title: 'भारत में उपभोक्ता',
          text: 'Made in Russia चिह्न वाले उत्पाद इस पवेलियन के माध्यम से भारत में आयात, प्रमाणित और वितरित किए जाते हैं।',
          cta: 'उत्पाद देखें',
        },
      },
    },
    about: {
      eyebrow: 'कंपनी के बारे में',
      title: 'रूसी उत्पादों के लिए भारत का आधिकारिक प्रवेश द्वार',
      paragraphs: [
        'Rai Family Corp LLP एक भारतीय कंपनी है और भारत में रूसी निर्यात केंद्र पवेलियन का आधिकारिक ऑपरेटर है। पवेलियन वह स्थान है जहाँ रूसी निर्माता भारतीय वितरकों, रिटेल शृंखलाओं और संस्थानों से मिलते हैं।',
        'हम सीधे वितरण चैनल और मार्केटिंग प्रचार प्रदान करते हैं और संबंधित सभी कार्य संभालते हैं: बाज़ार अनुसंधान, उत्पाद और पैकेजिंग अनुकूलन, प्रमाणन, आयात प्रक्रियाएँ, कानूनी सहायता और लॉजिस्टिक्स।',
      ],
      facts: [
        { label: 'स्थिति', value: 'REC पवेलियन का आधिकारिक ऑपरेटर' },
        { label: 'स्थापना', value: 'सितंबर 2024' },
        { label: 'पंजीकरण', value: 'भारत, महाराष्ट्र' },
        { label: 'पवेलियन', value: 'CBD बेलापुर, नवी मुंबई' },
      ],
    },
    services: {
      eyebrow: 'सेवाएँ',
      title: 'बाज़ार अनुसंधान से शेल्फ़ तक',
      lead: 'चौदह सेवाएँ, रूसी उत्पाद को भारत लाने के चार चरणों में विभाजित। हर सेवा अलग से या एक प्रबंधित कार्यक्रम के रूप में उपलब्ध है।',
      pillars: {
        intelligence: {
          title: 'बाज़ार विश्लेषण',
          text: 'निवेश से पहले बाज़ार को समझें।',
          items: [
            'बाज़ार निगरानी और प्रतिस्पर्धी अनुसंधान',
            'बाज़ार क्षमता का आकलन',
            'मूल्य स्थिति निर्धारण',
          ],
        },
        product: {
          title: 'उत्पाद और ब्रांड अनुकूलन',
          text: 'उत्पाद को भारतीय शेल्फ़ और भारतीय खरीदार के अनुरूप बनाएँ।',
          items: [
            'स्थानीय बाज़ार के लिए उत्पाद अनुकूलन',
            'पैकेजिंग और डिज़ाइन अनुकूलन',
            'ब्रांडिंग और पोज़िशनिंग',
          ],
        },
        development: {
          title: 'व्यवसाय विकास',
          text: 'रुचि को अनुबंधों और बिक्री में बदलें।',
          items: [
            'B2B बैठकें और वार्ताएँ',
            'टेस्टिंग और प्रचार कार्यक्रम',
            'अनुबंध में सहायता',
            'वितरण',
          ],
        },
        compliance: {
          title: 'अनुपालन, आयात और लॉजिस्टिक्स',
          text: 'सीमा पार करें — पहली बार में सही तरीके से।',
          items: [
            'लेन-देन की कानूनी सहायता',
            'उत्पाद प्रमाणन, परमिट और लाइसेंस',
            'आयात परामर्श: आवश्यकताएँ, प्रतिबंध, शुल्क और कर',
            'लॉजिस्टिक्स',
          ],
        },
      },
    },
    directions: {
      eyebrow: 'दिशाएँ',
      title: 'जो उत्पाद हम भारत लाते हैं',
      lead: 'हर दिशा एक रूसी ब्रांड या उत्पाद शृंखला है, जिसकी अपनी प्रस्तुति है। पोर्टफोलियो चरणों में बढ़ता है।',
      more: 'और जानें',
      all: 'सभी दिशाएँ',
      status: { active: 'उपलब्ध', launching: 'शुरू हो रहा है', planned: 'योजनाबद्ध' },
      category: {
        'food-and-drinks': 'खाद्य और पेय',
        construction: 'निर्माण सामग्री',
        industrial: 'औद्योगिक',
        consumer: 'उपभोक्ता वस्तुएँ',
        other: 'अन्य',
      },
      visitSite: 'उत्पाद साइट खोलें',
      siteSoon: 'उत्पाद साइट जल्द ही',
      backToContacts: 'ऑपरेटर से संपर्क करें',
      contactsIntro: 'इस दिशा से जुड़ी पूछताछ ऑपरेटर Rai Family Corp के माध्यम से होती है।',
      audiencesLabel: 'किसके लिए',
      otherDirections: 'अन्य दिशाएँ',
    },
    pavilion: {
      eyebrow: 'पवेलियन',
      title: 'रूसी निर्यात केंद्र पवेलियन, नवी मुंबई',
      text: 'पवेलियन भारत में रूसी उत्पादों का भौतिक घर है: वितरकों और संस्थानों के लिए शोरूम, टेस्टिंग और B2B बैठकों का स्थल, और ऑपरेटर का कार्यालय।',
      addressLabel: 'पता',
      address: [
        'Office No. 1307 and 1308, NMS Titanium, 13th Floor',
        'Plot No. 74, Sector-15, CBD Belapur',
        'Navi Mumbai, Thane, Maharashtra 400614, India',
      ],
      map: 'Google Maps में खोलें',
    },
    contacts: {
      eyebrow: 'संपर्क',
      title: 'ऑपरेटर से बात करें',
      lead: 'आप निर्माता हों, वितरक हों या संस्थान — हमें लिखें और हम आपका अनुरोध सही व्यक्ति तक पहुँचाएँगे।',
      email: 'ईमेल',
      phone: 'फ़ोन',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      address: 'पवेलियन का पता',
      placeholder: 'जल्द उपलब्ध',
    },
    footer: {
      legal: 'Rai Family Corp LLP',
      operator: 'भारत में रूसी निर्यात केंद्र पवेलियन का आधिकारिक ऑपरेटर',
      rights: 'सर्वाधिकार सुरक्षित।',
      madeInRussia: '“Made in Russia” रूसी निर्यात केंद्र का ट्रेडमार्क है, अनुमति से प्रयुक्त।',
    },
    notFound: {
      title: 'पृष्ठ नहीं मिला',
      text: 'शायद यह पृष्ठ स्थानांतरित हो गया है या कभी था ही नहीं।',
      back: 'मुखपृष्ठ पर लौटें',
    },
  },
};
