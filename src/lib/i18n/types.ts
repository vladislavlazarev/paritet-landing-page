/**
 * Shape of every locale dictionary. Adding a new key here forces every
 * dictionary file to provide a translation — TypeScript catches drift at
 * build time, no runtime surprises.
 */
export type Dictionary = {
  meta: {
    siteName: string;
    siteTitle: string;
    siteDescription: string;
    titleTemplate: string;
  };
  nav: {
    portfolio: string;
    services: string;
    teambuildings: string;
    about: string;
    contacts: string;
    articles: string;
    partners: string;
    openMenu: string;
    closeMenu: string;
    callUs: string;
    languageLabel: string;
  };
  hero: {
    h1: string;
    titleA: string;
    titleB: string;
    titleC: string;
    description: string;
    ctaCall: string;
    showreelAria: string;
  };
  about: {
    sectionAriaTitle: string;
    headlineLineA: string;
    headlineLineB: string;
    headlineLineC: string;
    intro: string;
    introCorp: string;
    introTeam: string;
    introConcert: string;
    introNye: string;
    ctaDiscuss: string;
    ctaAllServices: string;
    statYears: string;
    statProjects: string;
    statCities: string;
    cardsCorp: string;
    cardsCorpCaption: string;
    cardsConcerts: string;
    cardsConcertsCaption: string;
    cardsTeam: string;
    cardsTeamCaption: string;
    cardsPrivate: string;
    cardsPrivateCaption: string;
    cardsBusiness: string;
    cardsBusinessCaption: string;
    cardsHolidays: string;
    cardsHolidaysCaption: string;
  };
  partners: {
    headline: string;
    para1: string;
    para2: string;
    cta: string;
  };
  events: {
    title: string;
    allLink: string;
    moreLink: string;
  };
  servicesHome: {
    title: string;
    intro: string;
    nyeLinkLabel: string;
  };
  testimonials: {
    sectionTitle: string;
    eyebrow: string;
    readFull: string;
    closeAria: string;
    letterEyebrow: string;
    letterOriginal: string;
    letterOpenAria: string;
  };
  contact: {
    title: string;
    sub: string;
    callBtn: string;
    telegramBtn: string;
    nyeNote: string;
    nyeNoteLink: string;
  };
  footer: {
    intro: string;
    h_contacts: string;
    h_services: string;
    h_company: string;
    addressCity: string;
    addressStreet: string;
    sCorp: string;
    sTeam: string;
    sConcerts: string;
    sNYE: string;
    sWeddings: string;
    cProjects: string;
    cPartners: string;
    cArticles: string;
    cAbout: string;
    cContacts: string;
    rights: string;
    socialYT: string;
    socialVK: string;
  };
  contactsPage: {
    eyebrow: string;
    title: string;
    intro: string;
    addressFirst: string;
    addressSecond: string;
    callBtn: string;
    telegramBtn: string;
    mapTitle: string;
    openInMaps: string;
    metaTitle: string;
    metaDescription: string;
  };
  aboutPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    leadHeadline: string;
    leadPara1: string;
    leadPara2: string;
    leadPara3: string;
    statFounded: string;
    statEvents: string;
    statCities: string;
    promoEyebrow: string;
    promoTitle: string;
    teamTitle: string;
    teamPara1: string;
    teamPara2: string;
    teamRoleCEO: string;
    teamRoleEvent: string;
    teamRoleArtists: string;
    partnersEyebrow: string;
    partnersTitle: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaIntro: string;
    ctaCall: string;
    ctaTelegram: string;
  };
  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumbHome: string;
    breadcrumbServices: string;
    eyebrow: string;
    title: string;
    intro: string;
  };
  portfolioPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumbHome: string;
    breadcrumbPortfolio: string;
    title: string;
  };
  partnersPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumbHome: string;
    breadcrumbPartners: string;
    title: string;
    intro: string;
  };
  blogPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumbHome: string;
    breadcrumbBlog: string;
    title: string;
    intro: string;
  };
  longRead: {
    contentLanguageNotice: string;
    backToServices: string;
    backToPortfolio: string;
    backToPartners: string;
    backToBlog: string;
    breadcrumbHome: string;
    breadcrumbServices: string;
    breadcrumbPortfolio: string;
    breadcrumbPartners: string;
    breadcrumbBlog: string;
  };
  carousel: {
    prev: string;
    next: string;
  };
};
