const fetch = require('node-fetch');

exports.handler = async function(event, context) {

  const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN; // Set this in Netlify dashboard
  const SITE_ID = process.env.SITE_ID_VAR; // Set this in Netlify dashboard

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
  // Filter for your comment form if needed
  const comments = submissions
    .filter(sub => sub.form_name === 'comment')
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