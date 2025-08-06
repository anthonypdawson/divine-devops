// Netlify Function: Redirect to a random post (dynamic)

const xml2js = require('xml2js');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

// Helper to fetch and parse sitemap.xml from the live site
async function getPostUrlsFromSitemap() {
  const sitemapUrl = 'https://divinedevops.com/sitemap.xml';
  let urls = [];
  try {
    const response = await fetch(sitemapUrl);
    if (!response.ok) return [];
    const xml = await response.text();
    const result = await xml2js.parseStringPromise(xml);
    if (result.urlset && result.urlset.url) {
      urls = result.urlset.url
        .map(u => u.loc && u.loc[0])
        .filter(u => u && /\/posts\//.test(u));
    }
  } catch (e) {
    return [];
  }
  return urls;
}

exports.handler = async function(event, context) {
  const postUrls = await getPostUrlsFromSitemap();
  if (postUrls.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ posts: [], message: 'No post URLs found in sitemap.' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
  // Pick a random post URL
  const randomUrl = postUrls[Math.floor(Math.random() * postUrls.length)];

  // Switch between redirect and JSON mode using query param ?mode=redirect
  const mode = event.queryStringParameters && event.queryStringParameters.mode;
  if (mode === 'redirect') {
    // Redirect to the random post
    // Remove any query string from the random post URL and append #content
    const cleanUrl = randomUrl.split('?')[0];
    const urlWithAnchor = cleanUrl.includes('#') ? cleanUrl : `${cleanUrl}#content`;
      return {
        statusCode: 302,
        headers: {
          Location: urlWithAnchor,
        },
      };
  } else {
    // Return JSON for AJAX usage
    return {
      statusCode: 200,
      body: JSON.stringify({ url: randomUrl }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};
