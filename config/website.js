module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/blog your pathPrefix should be "blog"
  siteTitle: 'Illia Korniev', // Navigation and Site Title
  siteTitleAlt: 'Illia is a fullstack developer', // Alternative Site title for SEO
  siteTitleShort: 'Illia Korniev', // short_name for manifest
  siteLanguage: 'en', // Language Tag on <html> element
  siteLogo: '/favicon.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription:
    'Illia Korniev is a full stack developer who specializes in transforming and developing digital experiences.',
  author: 'Illia Korniev', // Author for schemaORGJSONLD
  organization: 'Illia Korniev',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@davzoku', // Twitter Username
  ogSiteName: 'Illia Korniev', // Facebook Site Name
  ogLanguage: 'en_US',
  googleAnalyticsID: 'G-HP6C32D6T4',
  ogImage: '/og.png',

  // Manifest and Progress color
  themeColor: '#16161a',
  backgroundColor: '#16161a',

  // Social component
  github: 'https://github.com/oddgeeks',
  linkedin: 'https://www.linkedin.com/in/illia-korniev-b506882b6/',
  email: 'illiakorniev6@gmail.com',

  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
  ],

  navLinksShort: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
  ],

  projectDesc: "A collection of things I've built.",
};
