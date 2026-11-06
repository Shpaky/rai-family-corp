import concreteBooth from '@/assets/pavilion/world-of-concrete-2026-booth.jpg';
import concreteMeeting from '@/assets/pavilion/world-of-concrete-2026-meeting.jpg';
import meetingArea from '@/assets/pavilion/meeting-area.jpg';
import openingGuests from '@/assets/pavilion/opening-guests.jpg';
import openingMoment from '@/assets/pavilion/opening-moment.jpg';
import openingGroup from '@/assets/pavilion/opening-group.jpg';
import openingHall from '@/assets/pavilion/opening-hall.jpg';
import openingConversations from '@/assets/pavilion/opening-conversations.jpg';
import openingHallWide from '@/assets/pavilion/opening-hall-wide.jpg';
import showroom from '@/assets/pavilion/showroom.jpg';
import shelves from '@/assets/pavilion/shelves.jpg';
import stage from '@/assets/pavilion/stage.jpg';
import logo1 from '@/assets/pavilion/residents/01.png';
import logo2 from '@/assets/pavilion/residents/02.png';
import logo3 from '@/assets/pavilion/residents/03.png';
import logo4 from '@/assets/pavilion/residents/04.png';
import logo5 from '@/assets/pavilion/residents/05.png';
import logo6 from '@/assets/pavilion/residents/06.png';
import logo7 from '@/assets/pavilion/residents/07.png';
import logo8 from '@/assets/pavilion/residents/08.png';
import logo9 from '@/assets/pavilion/residents/09.png';
import logo10 from '@/assets/pavilion/residents/10.png';
import logo11 from '@/assets/pavilion/residents/11.png';
import logo12 from '@/assets/pavilion/residents/12.png';
import logo13 from '@/assets/pavilion/residents/13.png';
import logo14 from '@/assets/pavilion/residents/14.png';
import logo15 from '@/assets/pavilion/residents/15.png';
import logo16 from '@/assets/pavilion/residents/16.png';
import logo17 from '@/assets/pavilion/residents/17.png';
import logo18 from '@/assets/pavilion/residents/18.png';
import logo19 from '@/assets/pavilion/residents/19.png';
import logo20 from '@/assets/pavilion/residents/20.png';
import logo21 from '@/assets/pavilion/residents/21.png';
import logo22 from '@/assets/pavilion/residents/22.png';
import logo23 from '@/assets/pavilion/residents/23.png';
import logo24 from '@/assets/pavilion/residents/24.png';
import logo25 from '@/assets/pavilion/residents/25.png';
import logo26 from '@/assets/pavilion/residents/26.png';
import logo27 from '@/assets/pavilion/residents/27.png';
import logo28 from '@/assets/pavilion/residents/28.png';
import logo29 from '@/assets/pavilion/residents/29.png';
import logo30 from '@/assets/pavilion/residents/30.png';
import logo31 from '@/assets/pavilion/residents/31.png';
import logo32 from '@/assets/pavilion/residents/32.png';
import logo33 from '@/assets/pavilion/residents/33.png';
import logo34 from '@/assets/pavilion/residents/34.png';
import logo35 from '@/assets/pavilion/residents/35.png';
import logo36 from '@/assets/pavilion/residents/36.png';
import logo37 from '@/assets/pavilion/residents/37.png';
import logo38 from '@/assets/pavilion/residents/38.png';
import logo39 from '@/assets/pavilion/residents/39.png';
import logo40 from '@/assets/pavilion/residents/40.png';
import logo41 from '@/assets/pavilion/residents/41.png';
import logo42 from '@/assets/pavilion/residents/42.png';
import logo43 from '@/assets/pavilion/residents/43.png';
import logo44 from '@/assets/pavilion/residents/44.png';
export const pavilionPhotos = {
  'world-of-concrete-2026-booth': concreteBooth,
  'world-of-concrete-2026-meeting': concreteMeeting,
  'meeting-area': meetingArea,
  'opening-guests': openingGuests,
  'opening-moment': openingMoment,
  'opening-group': openingGroup,
  'opening-hall': openingHall,
  'opening-conversations': openingConversations,
  'opening-hall-wide': openingHallWide,
  showroom,
  shelves,
  stage,
};
export const openingPhotoIds = [
  'opening-guests',
  'opening-moment',
  'opening-group',
  'opening-hall',
  'opening-conversations',
  'opening-hall-wide',
] as const;
export const interiorPhotoIds = ['showroom', 'shelves', 'stage'] as const;
export const worldOfConcretePhotoIds = [
  'world-of-concrete-2026-booth',
  'world-of-concrete-2026-meeting',
] as const;
export const worldOfConcreteMedia = [
  {
    url: 'https://www.nbmcw.com/news/reports-insights/world-of-concrete-india-2026-opens-amid-rs-12-2-lakh-cr-infra-push-growing-demand-for-advanced-construction-solutions.html',
    lang: 'EN',
    date: '04.06.2026',
  },
  {
    url: 'https://tradefairtimes.com/event-gallery-july-2026/',
    lang: 'EN',
    date: '13.07.2026',
  },
];
export const pavilionResidents = [
  { order: 1, url: 'https://wildsiberia.org/', logo: logo1, darkBacking: false },
  { order: 2, url: 'https://www.makfa.ru/', logo: logo2, darkBacking: false },
  { order: 3, url: 'https://glavproduct.ru/', logo: logo3, darkBacking: false },
  { order: 4, url: 'https://www.efko.ru/', logo: logo4, darkBacking: false },
  { order: 5, url: 'https://tatspirtprom.ru/', logo: logo5, darkBacking: false },
  { order: 6, url: 'https://miratorg.ru/products/catalog/', logo: logo6, darkBacking: false },
  { order: 7, url: 'https://www.uniconf.ru/', logo: logo7, darkBacking: false },
  { order: 8, url: 'https://almadez.ru/', logo: logo8, darkBacking: false },
  { order: 9, url: 'https://svitlogorie.ru/', logo: logo9, darkBacking: false },
  { order: 10, url: 'https://altay-rosa.ru/', logo: logo10, darkBacking: false },
  { order: 11, url: 'https://spp.ru/', logo: logo11, darkBacking: false },
  { order: 12, url: 'https://okbeauty.store/', logo: logo12, darkBacking: false },
  { order: 13, url: 'https://меренга.рф/catalog/', logo: logo13, darkBacking: false },
  { order: 14, url: 'https://passim.ru/', logo: logo14, darkBacking: true },
  { order: 15, url: 'https://salutalco.com/', logo: logo15, darkBacking: true },
  { order: 16, url: 'https://torero.ru/en', logo: logo16, darkBacking: false },
  { order: 17, url: 'https://www.derkonyak.ru/', logo: logo17, darkBacking: false },
  { order: 18, url: 'https://sibecohim.ru/', logo: logo18, darkBacking: false },
  { order: 19, url: 'https://stashevskoe.ru/', logo: logo19, darkBacking: false },
  { order: 20, url: 'https://bite.ru/', logo: logo20, darkBacking: false },
  { order: 21, url: 'https://helmetex.ru/', logo: logo21, darkBacking: false },
  { order: 22, url: 'https://botavikos.club/', logo: logo22, darkBacking: true },
  { order: 23, url: 'https://altaybuket.ru/', logo: logo23, darkBacking: false },
  { order: 24, url: 'https://altariaoil.ru/shop/', logo: logo24, darkBacking: false },
  { order: 25, url: 'https://allegro.ru/o-nas/', logo: logo25, darkBacking: false },
  { order: 26, url: 'https://platkinina.ru/', logo: logo26, darkBacking: false },
  { order: 27, url: 'https://kachety.com/', logo: logo27, darkBacking: false },
  { order: 28, url: 'https://pamilee.ru/', logo: logo28, darkBacking: true },
  { order: 29, url: 'https://socrimea.ru/', logo: logo29, darkBacking: false },
  { order: 30, url: 'https://www.afanasy-beer.com/', logo: logo30, darkBacking: false },
  { order: 31, url: 'https://hlebspas.ru/', logo: logo31, darkBacking: false },
  { order: 32, url: 'https://agroexportdv.com/rus/', logo: logo32, darkBacking: false },
  { order: 33, url: 'https://caviar-care.com/', logo: logo33, darkBacking: false },
  { order: 34, url: 'https://beandbe.ru/', logo: logo34, darkBacking: false },
  { order: 35, url: 'https://sladonezh.ru/', logo: logo35, darkBacking: false },
  { order: 36, url: 'https://akva-kristall.ru/', logo: logo36, darkBacking: false },
  { order: 37, url: 'https://berdinberg.ru/', logo: logo37, darkBacking: false },
  { order: 38, url: 'https://vsvkus.ru/', logo: logo38, darkBacking: false },
  { order: 39, url: 'https://kennertonaudio.ru/', logo: logo39, darkBacking: false },
  { order: 40, url: 'https://zerapy.ru/', logo: logo40, darkBacking: false },
  { order: 41, url: 'https://gls-pharma.com/', logo: logo41, darkBacking: true },
  { order: 42, url: 'https://globalwhite.ru/', logo: logo42, darkBacking: false },
  { order: 43, url: 'https://lavr.ru/', logo: logo43, darkBacking: false },
  { order: 44, url: 'https://lavage-global.ru/', logo: logo44, darkBacking: false },
];
export const pavilionNewsDates = [
  '2026-12-09',
  '2026-12-10',
  '2026-10-26',
  '2026-10-22',
  '2026-10-18',
  '2026-10-07',
  '2026-08-21',
  '2026-06-03',
];
export const pavilionMedia = [
  {
    url: 'https://timesofindia.indiatimes.com/business/made-in-russia-pavilion-seeks-to-deepen-business-ties-between-india-and-russia/articleshow/133376073.cms',
    lang: 'EN',
    date: '20.08.2026',
  },
  {
    url: 'https://www.hindustantimes.com/genesis/russia-opens-the-door-to-its-market-for-india-a-permanent-trading-floor-launches-in-navi-mumbai-101787197315043.html',
    lang: 'EN',
    date: '20.08.2026',
  },
  {
    url: 'https://finance.rambler.ru/business/56943473-rets-otkryl-v-indii-natsionalnyy-pavilon-sdelano-v-rossii/',
    lang: 'RU',
    date: '21.08.2026',
  },
  {
    url: 'https://fomag.ru/news-streem/pervyy-v-indii-postoyanno-deystvuyushchiy-pavilon-sdelano-v-rossii-otkrylsya-v-navi-mumbai/',
    lang: 'RU',
    date: '21.08.2026',
  },
  {
    url: 'https://news.abplive.com/brand-wire/first-permanent-russian-national-pavilion-under-made-in-russia-brand-opens-in-mumbai-to-deepen-india-russia-economic-ties-1864002',
    lang: 'EN',
    date: '26.08.2026',
  },
  {
    url: 'https://www.tribuneindia.com/partner-exclusives/new-trading-hub-in-navi-mumbai-connects-indian-retailers-with-russian-brands/',
    lang: 'EN',
    date: '27.08.2026',
  },
];
export const meetingPhone = '+917045743899';
export const meetingWhatsapp = 'https://wa.me/917045743899';
export const officePhone = '+918369393073';
