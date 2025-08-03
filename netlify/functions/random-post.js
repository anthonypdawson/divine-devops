// Netlify Function: Redirect to a random post (dynamic)
const fs = require('fs');
const path = require('path');

// Helper to get all .md files in root/posts/
function getAllPostFiles() {
  const postsDir = path.join(__dirname, '../../posts');
  let files = [];
  if (!fs.existsSync(postsDir)) return files;
  for (const file of fs.readdirSync(postsDir)) {
    if (file.endsWith('.md')) {
      files.push(`posts/${file}`);
    }
  }
  return files;
}

exports.handler = async function(event, context) {
  const postFiles = getAllPostFiles();
  if (postFiles.length === 0) {
    return {
      statusCode: 404,
      body: 'No posts found.'
    };
  }
  // Pick a random post
  const randomIndex = Math.floor(Math.random() * postFiles.length);
  const postPath = postFiles[randomIndex];

  // Convert post filename to URL
  // Remove .md extension, replace underscores with hyphens, and build path
  const urlPath = "/posts/" + postPath.replace(/^posts\//, '').replace(/\.md$/, '').replace(/_/g, '-');

  return {
    statusCode: 302,
    headers: {
      Location: urlPath
    }
  };
};
