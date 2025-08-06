(function() {
  const supportedLocales = ['en', 'bg', 'cs', 'da', 'de', 'es', 'fr', 'id', 'it', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'tr', 'uk'];
  const defaultLocale = 'en';
  const baseUrl = '/';

  // Get the current path and check if a locale is already present
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const currentLocale = pathSegments[0];

  if (supportedLocales.includes(currentLocale)) {
    // A locale is already in the URL, so the user has made a choice or been redirected.
    // We can also store this choice so we don't have to check again.
    localStorage.setItem('docusaurus.locale', currentLocale);
    return;
  }
  
  // If we've been here before and made a choice, don't redirect again.
  if (localStorage.getItem('docusaurus.locale')) {
    return;
  }

  // Get the user's preferred language from the browser
  const userLang = navigator.language || navigator.userLanguage;
  if (!userLang) {
    return;
  }

  // Find the best matching supported locale
  let bestMatch = supportedLocales.find(locale => userLang.startsWith(locale));

  if (bestMatch && bestMatch !== defaultLocale) {
    // Store the choice
    localStorage.setItem('docusaurus.locale', bestMatch);
    // Redirect to the user's preferred locale
    const newPath = baseUrl + bestMatch + currentPath;
    window.location.href = newPath.replace('//', '/'); // handle potential double slash
  } else {
    // If no specific match, stick with the default but record it.
    localStorage.setItem('docusaurus.locale', defaultLocale);
  }
})();
