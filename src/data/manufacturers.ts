/*
  /manufacturers/ page: structured copy per locale (steps, categories, models,
  FAQ). Short interface strings (row labels, summaries, "Terms on request")
  live in src/i18n/ui.ts under manufacturersPage. The services themselves are
  in src/data/services.ts: the page lists them in the `catalog` section and the
  steps of the route link to their groups (`serviceGroups`).

  Empty data renders nothing, never a placeholder: a step without `timing` has
  no Timing row, empty `status.benefits` hides the benefits list, empty
  `notDoing.items` drops the whole section, a question with `a: null` is not
  shown and is not in the FAQPage JSON-LD. Pending facts are listed in TODO.md.
*/
import type { Locale } from '../i18n/config';
import { company } from './company';
import type { ServiceGroupSlug } from './services';

/**
 * Sections between the page header and the dark "Where to start" block, in
 * page order. Backgrounds alternate by position among the rendered sections
 * (white, paper, ...), as HOME_SECTIONS on the home page.
 */
export type ManufacturersSectionKey =
  'route' | 'catalog' | 'requirements' | 'models' | 'status' | 'notDoing' | 'faq';
export const MANUFACTURERS_SECTIONS: ManufacturersSectionKey[] = [
  'route',
  'catalog',
  'requirements',
  'models',
  'status',
  'notDoing',
  'faq',
];

/** Slugs match the directions catalogue categories (src/content/categories). */
export type RequirementCategory =
  'construction' | 'equipment' | 'electronics' | 'health' | 'industrial-chemicals' | 'agro';

export interface ManufacturersPage {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  route: {
    title: string;
    lead: string;
    steps: {
      num: string;
      title: string;
      whatWeDo: string;
      fromYou: string;
      result: string;
      /** Shown as the Timing row only when set. */
      timing: string | null;
      /** Groups of src/data/services.ts behind the step, shown as links to #services-<slug>. */
      serviceGroups: ServiceGroupSlug[];
    }[];
    footnote: string;
  };
  /** Heading of the full list of services; the groups come from src/data/services.ts. */
  catalog: { title: string; lead: string };
  requirements: {
    title: string;
    lead: string;
    /** The first three are always visible; the rest fold on phones. */
    common: string[];
    categories: { slug: RequirementCategory; title: string; access: string; prepare: string }[];
    footnote: string;
  };
  models: {
    title: string;
    lead: string;
    items: { title: string; text: string }[];
    footnote: string;
  };
  status: {
    title: string;
    text: string;
    benefitsTitle: string;
    /** What pavilion residency gives; empty until confirmed by the Russian Export Center. */
    benefits: string[];
    /** Home page anchor, resolved per locale. */
    pavilionHref: string;
    recHref: string;
  };
  /** The whole section is skipped while `items` is empty. */
  notDoing: { title: string; items: string[] };
  faq: { title: string; lead: string; items: { q: string; a: string | null }[] };
  start: {
    eyebrow: string;
    title: string;
    text: string;
    emailButton: string;
    whatsappButton: string;
    /** Email subject and WhatsApp text; the brackets are a hint for the sender and stay. */
    subject: string;
    firstEmailTitle: string;
    firstEmail: string[];
  };
}

const status = {
  pavilionHref: '#pavilion',
  recHref: company.proofLinks.recProgramme,
  benefits: [] as string[],
};

export const manufacturersPage: Record<Locale, ManufacturersPage> = {
  en: {
    meta: {
      title: 'How we work with manufacturers - Rai Family Corp',
      description:
        'The route of a Russian product to the Indian shelf: steps, services, what we need from the manufacturer, cooperation models and the «Made in Russia» pavilion in Navi Mumbai.',
    },
    hero: {
      eyebrow: 'For Russian manufacturers',
      title: 'How we work with manufacturers',
      lead: 'This page is for the manufacturer and its export manager deciding whether to bring a product to India through the operator of the «Made in Russia» pavilion. It sets out the steps from the factory to the Indian dealer and shelf, what we will need from you, the models we work in, and what we do not do.',
    },
    route: {
      title: 'The route to the shelf',
      lead: 'Six steps a product goes through. Services are spread across the steps; the full list is below, and each is available on its own.',
      steps: [
        {
          num: '01',
          title: 'Enquiry and initial assessment',
          whatWeDo:
            'We study the product from your documents and answer whether it fits India as it is, which market-access route it faces, and which cooperation model makes sense to start with.',
          fromYou:
            'Product description, technical data sheet or specification, current certificates, price basis and minimum order.',
          result: 'A written assessment with the next step, or a reasoned decline.',
          timing: null,
          serviceGroups: ['analytics'],
        },
        {
          num: '02',
          title: 'Market assessment and pricing',
          whatWeDo:
            'Market and competitor monitoring, potential assessment, price positioning that accounts for duties, taxes, logistics and dealer margin.',
          fromYou:
            'EXW or FOB prices, the volumes you are ready to ship, any regional or channel restrictions.',
          result: 'A market brief with a recommended shelf price and sales channel.',
          timing: null,
          serviceGroups: ['analytics', 'adaptation'],
        },
        {
          num: '03',
          title: 'Contract and cooperation model',
          whatWeDo:
            'We agree the model (distribution, representation, pavilion or individual services), the split of certification and promotion costs, territory and exclusivity; we check counterparties, prepare the export contract and trademark protection in India.',
          fromYou: 'Your choice of model, signatory authority, company details.',
          result: 'A signed contract and a work plan for steps 4-6.',
          timing: null,
          serviceGroups: ['legal'],
        },
        {
          num: '04',
          title: 'Market access and adaptation',
          whatWeDo:
            'We identify the applicable Indian standards and mandatory schemes (BIS, FSSAI, FCO, CDSCO, depending on the product category), run certification and registration, and adapt the product, packaging and labelling to Indian requirements and the Indian buyer.',
          fromYou:
            'Technical documentation in English, samples for testing, factory access for inspectors where the scheme requires an inspection, trademark rights.',
          result: 'Approvals, labelling and packaging ready for import.',
          timing: null,
          serviceGroups: ['certification', 'adaptation'],
        },
        {
          num: '05',
          title: 'Import and warehouse',
          whatWeDo:
            'Import consulting (requirements, restrictions, duties and taxes), international transport and cargo insurance, customs clearance, storage at partner warehouses in India with the required temperature regime, last-mile delivery and inventory management.',
          fromYou: 'Shipping documents and packaging to the agreed specification.',
          result: 'Goods cleared and in stock in India, ready for sale.',
          timing: null,
          serviceGroups: ['import', 'logistics'],
        },
        {
          num: '06',
          title: 'Sales',
          whatWeDo:
            'We present the product at the «Made in Russia» pavilion in Navi Mumbai, arrange B2B meetings with distributors and retail chains, exhibitions, tastings and promotions, online and marketplace promotion, support contract signing, run distribution and regular reporting.',
          fromYou: 'Samples and materials for the pavilion, participation in key negotiations.',
          result: 'Contracts with Indian partners and the product on the shelf.',
          timing: null,
          serviceGroups: ['marketing', 'b2b', 'analytics'],
        },
      ],
      footnote:
        'Timing depends on the product category and the mandatory access scheme; we state it after the initial assessment.',
    },
    catalog: {
      title: 'Our services',
      lead: 'Eight groups. Each service is available on its own or as part of a single programme; we assemble the programme at step 3.',
    },
    requirements: {
      title: 'What we need from the manufacturer',
      lead: 'A common set for any product, plus category requirements. The fuller the package at step one, the shorter the assessment.',
      common: [
        'Product description and applications in English.',
        'Technical data sheet (TDS) and safety data sheet (SDS) in English; GHS format for chemicals.',
        'Current certificates and test reports (GOST, EAEU, ISO, CE), where available.',
        'Price basis (EXW or FOB), minimum order, lead time.',
        'Packaging, pack sizes, shelf life and storage conditions.',
        'Trademark rights and consent to use the brand in India.',
        'Samples for testing and for the pavilion.',
        'Export permits from Russia, where the product is subject to export control.',
      ],
      categories: [
        {
          slug: 'construction',
          title: 'Construction materials',
          access:
            'Cement and a number of building materials are on the BIS mandatory certification lists: for a foreign factory this means the FMCS scheme with a factory inspection and the ISI mark on every pack. Concrete admixtures, waterproofing, mastics and fire retardants are not on those lists as of September 2026: market access rests on the data sheet, test reports and references.',
          prepare:
            'Test reports to the applicable standards (EN or IS), certificates of conformity, consumption data and application conditions for a hot, humid climate, packaging labelled in English.',
        },
        {
          slug: 'equipment',
          title: 'Equipment',
          access:
            "From 1 September 2026 India's Machinery and Electrical Equipment Safety (Omnibus Technical Regulation) Order applies: equipment on its schedule requires BIS certification. Household and commercial electrical appliances are certified to IS 302 from 1 October 2026.",
          prepare:
            'Technical passport and drawings, certificates and declarations (CE, EAEU), power data for the Indian 230 V / 50 Hz grid, an English manual, warranty and service terms.',
        },
        {
          slug: 'electronics',
          title: 'Electronics and components',
          access:
            'Finished electronic and IT products go through mandatory BIS registration (CRS); discrete components are not on the registration list.',
          prepare:
            'Datasheets in English, RoHS and REACH declarations where available, export permits where the product is subject to export control.',
        },
        {
          slug: 'health',
          title: 'Health and wellness',
          access:
            'Food, dietary supplements and nutraceuticals are imported under FSSAI control: importer licence, border inspection with sampling, at least 60 % of shelf life remaining at import, Indian labelling with importer details, the veg / non-veg mark and country of origin; products outside Indian standards need prior approval. Medical devices and cosmetics are registered with CDSCO.',
          prepare:
            'Composition and specifications, test reports, registration documents from the country of origin, shelf life and storage data.',
        },
        {
          slug: 'industrial-chemicals',
          title: 'Industrial chemicals',
          access:
            'Mandatory BIS certification covers a limited list of basic chemicals; detergents, mastics and specialty formulations are not on it. Import rests on the safety data sheet and dangerous goods classification.',
          prepare:
            'SDS in GHS format, composition with CAS numbers, HS codes, hazard data, packaging and labelling under dangerous goods rules.',
        },
        {
          slug: 'agro',
          title: 'Agro',
          access:
            'Fertilisers and biostimulants are governed by the Fertilizer Control Order 1985: the product must be listed in its schedules, and biostimulants are registered with efficacy, toxicity and composition data; provisional permits were withdrawn in June 2025. Selling as organic requires NPOP certification.',
          prepare:
            'Composition and analytical method, field trial results, toxicology data, registrations in other countries.',
        },
      ],
      footnote:
        'Retail packs in India carry mandatory Legal Metrology declarations: importer details, product name, net quantity, month and year of import, maximum retail price, country of origin. We prepare these at step 4.',
    },
    models: {
      title: 'Cooperation models',
      lead: 'Four models; we choose at step 3 by product, volumes and market readiness.',
      items: [
        {
          title: 'Distribution',
          text: 'We act as importer and distributor: we bring the product in, hold it at a warehouse in India and sell to distributors, retail chains, projects and through our seller accounts on Amazon.in and Flipkart.',
        },
        {
          title: 'Representation',
          text: "We represent the manufacturer in India: we run certification, negotiations and promotion, while supplies go under the manufacturer's contracts with Indian buyers.",
        },
        {
          title: 'Pavilion residency',
          text: 'Product samples at the «Made in Russia» pavilion in Navi Mumbai, showings to Indian distributors and retail chains, tastings and meetings.',
        },
        {
          title: 'Individual services',
          text: 'Any service from the list is available on its own: market research, certification, packaging adaptation, exhibitions, marketplaces, import consulting.',
        },
      ],
      footnote:
        'Terms depend on the product category, volumes and the split of certification and promotion costs.',
    },
    status: {
      ...status,
      title: 'The pavilion and operator status',
      text: 'Rai Family Corp LLP is the operator of the «Made in Russia» National Pavilion in Navi Mumbai, a Russian Export Center project. The pavilion opened on 21 August 2026 and operates permanently.',
      benefitsTitle: 'What taking part in the pavilion gives',
    },
    notDoing: { title: 'What we do not do', items: [] },
    faq: {
      title: 'Questions and answers',
      lead: 'What manufacturers ask in their first email.',
      items: [
        {
          q: 'How much does bringing a product to India cost',
          a: 'Terms depend on the product category, the mandatory access scheme, volumes and the cooperation model. We state them after the initial assessment, together with the split of certification and promotion costs.',
        },
        {
          q: 'Do I need to set up a legal entity in India',
          a: 'Not required: under the distribution and representation models, import goes through our company. If you need your own legal entity in India, we help with registration, opening accounts and tax accounting.',
        },
        {
          q: 'Are samples needed, and how many',
          a: 'Yes, for certification testing and for the pavilion. The quantity depends on the access scheme and the product; we state it at step one.',
        },
        {
          q: 'What language do the documents need to be in',
          a: 'Technical documentation, certificates and labelling in English. Correspondence can be in Russian; at negotiations we provide Russian-Hindi-English interpreters.',
        },
        {
          q: 'Can I order only certification or only market research',
          a: 'Yes. Each service from the list is available on its own; the individual services model is described above.',
        },
        { q: 'Who will be the importer and hold the certificates', a: null },
        { q: 'How are payments made', a: null },
        { q: 'How long until the first shipment', a: null },
        { q: 'What is the pavilion, and is participation mandatory', a: null },
      ],
    },
    start: {
      eyebrow: 'Where to start',
      title: 'Bring your product to India',
      text: 'Write to us about the product. We will reply with an assessment and the next step.',
      emailButton: 'Write about the product',
      whatsappButton: 'WhatsApp',
      subject: 'Bringing a product to India: [company, product]',
      firstEmailTitle: 'With the first email',
      firstEmail: [
        'Product name and application.',
        'Technical data sheet or description.',
        'City of manufacture and price basis.',
      ],
    },
  },

  ru: {
    meta: {
      title: 'Как мы работаем с производителями - Rai Family Corp',
      description:
        'Маршрут российского продукта до индийской полки: шаги, услуги, что нужно от производителя, модели сотрудничества и павильон «Сделано в России» в Нави-Мумбаи.',
    },
    hero: {
      eyebrow: 'Российским производителям',
      title: 'Как мы работаем с производителями',
      lead: 'Эта страница для производителя и его экспортного менеджера, которые решают, выводить ли продукт в Индию через оператора павильона «Сделано в России». Здесь порядок шагов от завода до индийского дилера и полки, что понадобится от вас, в каких моделях мы работаем и чего не делаем.',
    },
    route: {
      title: 'Маршрут до полки',
      lead: 'Шесть шагов, которые проходит продукт. Услуги распределены по шагам; полный перечень ниже, каждая доступна и отдельно.',
      steps: [
        {
          num: '01',
          title: 'Заявка и первичная оценка',
          whatWeDo:
            'Изучаем продукт по вашим документам и отвечаем, подходит ли он для Индии в нынешнем виде, какой маршрут допуска его ждёт и с какой модели сотрудничества разумно начинать.',
          fromYou:
            'Описание продукта, технический лист или спецификация, действующие сертификаты, базис цены и минимальная партия.',
          result: 'Письменный ответ с оценкой и следующим шагом или мотивированный отказ.',
          timing: null,
          serviceGroups: ['analytics'],
        },
        {
          num: '02',
          title: 'Оценка рынка и цена',
          whatWeDo:
            'Мониторинг рынка и конкурентов, оценка потенциала, ценовое позиционирование с учётом пошлин, налогов, логистики и дилерской маржи.',
          fromYou:
            'Цены на базисе EXW или FOB, объёмы, которые вы готовы отгружать, ограничения по регионам и каналам.',
          result: 'Рыночная справка с рекомендацией по цене на полке и каналу продаж.',
          timing: null,
          serviceGroups: ['analytics', 'adaptation'],
        },
        {
          num: '03',
          title: 'Договор и модель сотрудничества',
          whatWeDo:
            'Согласуем модель (дистрибуция, представительство, павильон или отдельные услуги), распределение расходов на сертификацию и продвижение, территорию и эксклюзив; проверяем контрагентов, готовим экспортный контракт и защиту товарного знака в Индии.',
          fromYou: 'Решение по модели, полномочия подписанта, реквизиты.',
          result: 'Подписанный договор и план работ по шагам 4-6.',
          timing: null,
          serviceGroups: ['legal'],
        },
        {
          num: '04',
          title: 'Допуск на рынок и адаптация',
          whatWeDo:
            'Определяем применимые индийские стандарты и обязательные схемы (BIS, FSSAI, FCO, CDSCO - по категории продукта), ведём сертификацию и регистрацию, адаптируем продукт, упаковку и маркировку под требования Индии и индийского покупателя.',
          fromYou:
            'Техническая документация на английском, образцы для испытаний, доступ инспекторов на завод, если схема требует инспекции, права на товарный знак.',
          result: 'Разрешительные документы, маркировка и упаковка, готовые к ввозу.',
          timing: null,
          serviceGroups: ['certification', 'adaptation'],
        },
        {
          num: '05',
          title: 'Импорт и склад',
          whatWeDo:
            'Импорт-консалтинг (требования, ограничения, пошлины и налоги), международная перевозка и страхование груза, таможенное оформление, хранение на партнёрских складах в Индии с нужным температурным режимом, доставка последней мили и управление запасами.',
          fromYou: 'Отгрузочные документы и упаковка по согласованной спецификации.',
          result: 'Товар на складе в Индии, растаможенный и готовый к продаже.',
          timing: null,
          serviceGroups: ['import', 'logistics'],
        },
        {
          num: '06',
          title: 'Продажи',
          whatWeDo:
            'Представляем продукт в павильоне «Сделано в России» в Нави-Мумбаи, организуем B2B-встречи с дистрибьюторами и сетями, выставки, дегустации и промоакции, продвижение онлайн и на маркетплейсах, содействуем заключению контрактов, ведём дистрибуцию и регулярную отчётность.',
          fromYou: 'Образцы и материалы для павильона, участие в ключевых переговорах.',
          result: 'Контракты с индийскими партнёрами и продукт на полке.',
          timing: null,
          serviceGroups: ['marketing', 'b2b', 'analytics'],
        },
      ],
      footnote:
        'Сроки зависят от категории продукта и обязательной схемы допуска; называем их после первичной оценки.',
    },
    catalog: {
      title: 'Перечень услуг',
      lead: 'Восемь групп. Каждая услуга доступна отдельно или в составе единой программы; состав программы собираем на шаге 3.',
    },
    requirements: {
      title: 'Что нужно от производителя',
      lead: 'Общий набор для любого продукта и требования по категориям. Чем полнее пакет на первом шаге, тем короче оценка.',
      common: [
        'Описание продукта и области применения на английском.',
        'Технический лист (TDS) и паспорт безопасности (SDS) на английском; для химии в формате GHS.',
        'Действующие сертификаты и протоколы испытаний (ГОСТ, ЕАЭС, ISO, CE), если есть.',
        'Базис цены (EXW или FOB), минимальная партия, срок изготовления.',
        'Упаковка, фасовка, срок годности и условия хранения.',
        'Права на товарный знак и согласие на его использование в Индии.',
        'Образцы для испытаний и для павильона.',
        'Разрешительные документы на экспорт из России, если продукт подпадает под экспортный контроль.',
      ],
      categories: [
        {
          slug: 'construction',
          title: 'Стройматериалы',
          access:
            'Цемент и ряд стройматериалов входят в перечни обязательной сертификации BIS: для иностранного завода это схема FMCS с инспекцией производства и знаком ISI на каждой упаковке. Добавки в бетон, гидроизоляция, мастики и огнезащитные составы в этих перечнях на сентябрь 2026 года не значатся: допуск строится на техническом листе, протоколах испытаний и референсах.',
          prepare:
            'Протоколы по применимым стандартам (EN или IS), сертификаты соответствия, данные о расходе и условиях применения в жарком и влажном климате, упаковку с маркировкой на английском.',
        },
        {
          slug: 'equipment',
          title: 'Оборудование',
          access:
            'С 1 сентября 2026 года действует индийский технический регламент по безопасности машин и электрооборудования (Omnibus Technical Regulation): оборудование из его перечня требует сертификации BIS. Электроприборы бытового и коммерческого назначения с 1 октября 2026 года сертифицируются по IS 302.',
          prepare:
            'Технический паспорт и схемы, сертификаты и декларации (CE, ЕАЭС), данные по питанию под индийскую сеть 230 В / 50 Гц, руководство на английском, условия гарантии и сервиса.',
        },
        {
          slug: 'electronics',
          title: 'Электроника и компоненты',
          access:
            'Готовые электронные изделия и ИТ-оборудование проходят обязательную регистрацию BIS (CRS); дискретные компоненты в перечень регистрации не входят.',
          prepare:
            'Даташиты на английском, декларации RoHS и REACH при наличии, экспортные разрешения, если продукт подпадает под экспортный контроль.',
        },
        {
          slug: 'health',
          title: 'Здоровье и велнес',
          access:
            'Пищевые продукты, БАД и нутрицевтики ввозятся под контролем FSSAI: лицензия импортёра, проверка на границе с отбором проб, остаток срока годности не меньше 60 % на момент ввоза, индийская маркировка с данными импортёра, знаком veg / non-veg и страной происхождения; продукты вне индийских стандартов требуют предварительного одобрения. Медицинские изделия и косметика регистрируются в CDSCO.',
          prepare:
            'Состав и спецификации, протоколы испытаний, регистрационные документы страны происхождения, данные о сроке годности и условиях хранения.',
        },
        {
          slug: 'industrial-chemicals',
          title: 'Промышленная химия',
          access:
            'Обязательная сертификация BIS действует на ограниченный перечень базовых химикатов; моющие средства, мастики и специальные составы в него не входят. Ввоз строится на паспорте безопасности и классификации опасных грузов.',
          prepare:
            'SDS в формате GHS, состав с CAS-номерами, коды HS, данные об опасных свойствах, упаковку и маркировку по правилам перевозки опасных грузов.',
        },
        {
          slug: 'agro',
          title: 'Агро',
          access:
            'Удобрения и биостимуляторы регулируются Fertilizer Control Order 1985: продукт должен быть включён в его перечни, биостимуляторы регистрируются с данными по эффективности, токсичности и составу; временные разрешения отменены в июне 2025 года. Продажа как organic требует сертификации NPOP.',
          prepare:
            'Состав и метод анализа, результаты полевых испытаний, токсикологические данные, регистрации в других странах.',
        },
      ],
      footnote:
        'Для розничной упаковки в Индии обязательны декларации по правилам Legal Metrology: данные импортёра, наименование, нетто, месяц и год ввоза, максимальная розничная цена, страна происхождения. Их мы готовим на шаге 4.',
    },
    models: {
      title: 'Модели сотрудничества',
      lead: 'Четыре модели; выбираем на шаге 3 по продукту, объёмам и готовности к рынку.',
      items: [
        {
          title: 'Дистрибуция',
          text: 'Мы выступаем импортёром и дистрибьютором: ввозим продукт, храним на складе в Индии и продаём дистрибьюторам, сетям, в проекты и через наши аккаунты продавца на Amazon.in и Flipkart.',
        },
        {
          title: 'Представительство',
          text: 'Мы представляем производителя в Индии: ведём сертификацию, переговоры и продвижение, а поставки идут по контрактам производителя с индийскими покупателями.',
        },
        {
          title: 'Резидентство в павильоне',
          text: 'Образцы продукта в павильоне «Сделано в России» в Нави-Мумбаи, показы индийским дистрибьюторам и сетям, дегустации и встречи.',
        },
        {
          title: 'Отдельные услуги',
          text: 'Любая услуга из перечня доступна отдельно: исследование рынка, сертификация, адаптация упаковки, выставки, маркетплейсы, импорт-консалтинг.',
        },
      ],
      footnote:
        'Условия зависят от категории продукта, объёмов и распределения расходов на сертификацию и продвижение.',
    },
    status: {
      ...status,
      title: 'Павильон и статус оператора',
      text: 'Rai Family Corp LLP - оператор Национального Павильона «Сделано в России» в Нави-Мумбаи, проекта Российского экспортного центра. Павильон открыт 21 августа 2026 года и работает постоянно.',
      benefitsTitle: 'Что даёт участие в павильоне',
    },
    notDoing: { title: 'Чего мы не делаем', items: [] },
    faq: {
      title: 'Вопросы и ответы',
      lead: 'То, что производители спрашивают первым письмом.',
      items: [
        {
          q: 'Сколько стоит вывод продукта в Индию',
          a: 'Условия зависят от категории продукта, обязательной схемы допуска, объёмов и модели сотрудничества. Называем их после первичной оценки, вместе с распределением расходов на сертификацию и продвижение.',
        },
        {
          q: 'Нужно ли открывать юрлицо в Индии',
          a: 'Не требуется: в моделях дистрибуции и представительства ввоз идёт через нашу компанию. Если вам нужно собственное юрлицо в Индии, помогаем с регистрацией, открытием счетов и налоговым учётом.',
        },
        {
          q: 'Нужны ли образцы и сколько',
          a: 'Да, для испытаний при сертификации и для павильона. Количество зависит от схемы допуска и продукта; называем на первом шаге.',
        },
        {
          q: 'На каком языке нужны документы',
          a: 'Техническая документация, сертификаты и маркировка - на английском. Переписку ведём на русском, на переговорах предоставляем переводчиков русский-хинди-английский.',
        },
        {
          q: 'Можно ли заказать только сертификацию или только исследование рынка',
          a: 'Да. Каждая услуга из перечня доступна отдельно, модель «отдельные услуги» описана выше.',
        },
        { q: 'Кто будет импортёром и владельцем сертификатов', a: null },
        { q: 'Как проходят расчёты', a: null },
        { q: 'Сколько времени занимает путь до первой отгрузки', a: null },
        { q: 'Что такое павильон и обязательно ли в нём участвовать', a: null },
      ],
    },
    start: {
      eyebrow: 'С чего начать',
      title: 'Вывести продукт в Индию',
      text: 'Напишите нам о продукте. Ответим оценкой и следующим шагом.',
      emailButton: 'Написать о продукте',
      whatsappButton: 'WhatsApp',
      subject: 'Вывод продукта в Индию: [компания, продукт]',
      firstEmailTitle: 'К первому письму',
      firstEmail: [
        'Название продукта и область применения.',
        'Технический лист или описание.',
        'Город производства и базис цены.',
      ],
    },
  },
};

/** FAQ items that have an answer: the only ones shown and listed in the FAQPage JSON-LD. */
export const answeredFaq = (locale: Locale) =>
  manufacturersPage[locale].faq.items.filter(
    (item): item is { q: string; a: string } => item.a !== null,
  );

// Build-time validation: fixed counts from the page brief. No template literals in this
// file: check:content scans it for currency symbols.
for (const [locale, page] of Object.entries(manufacturersPage)) {
  const counts = [
    ['route.steps', page.route.steps.length, 6],
    ['requirements.common', page.requirements.common.length, 8],
    ['requirements.categories', page.requirements.categories.length, 6],
    ['models.items', page.models.items.length, 4],
    ['start.firstEmail', page.start.firstEmail.length, 3],
  ] as const;
  for (const [name, got, want] of counts) {
    if (got !== want)
      throw new Error(
        ['manufacturersPage', locale, name].join('.') +
          ': ' +
          [got, 'items, expected', want].join(' '),
      );
  }
  for (const step of page.route.steps) {
    if (step.serviceGroups.length === 0)
      throw new Error(
        ['manufacturersPage', locale, 'step', step.num].join('.') + ': no service groups',
      );
  }
}
