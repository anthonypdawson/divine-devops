const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

exports.handler = async function(event, context) {

  const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN; // Set this in Netlify dashboard
  const SITE_ID = process.env.SITE_ID_VAR;

  const response = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`, {
    headers: {
      'Authorization': `Bearer ${NETLIFY_API_TOKEN}`
    }
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'Failed to fetch comments' })
    };
  }

  const submissions = await response.json();

  // Get post identifier from query string
  const postId = event.queryStringParameters && event.queryStringParameters.post;

  // Filter for your comment form and current post
  const comments = submissions
    .filter(sub => sub.form_name === 'comment' && (!postId || sub.data.post === postId))
    .map(sub => ({
      name: sub.data.name || 'Anonymous',
      message: sub.data.message,
      date: sub.created_at
    }));

  return {
    statusCode: 200,
    body: JSON.stringify(comments)
  };
};