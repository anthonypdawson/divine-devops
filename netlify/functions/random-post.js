// Netlify Function: Redirect to a random post (dynamic)
const fs = require('fs');
const path = require('path');

// Helper to recursively get all .md files in _posts/2025/*
function getAllPostFiles() {
  const postsDir = path.join(__dirname, '../../_posts/2025');
  let files = [];
  if (!fs.existsSync(postsDir)) return files;
  for (const month of fs.readdirSync(postsDir)) {
    const monthDir = path.join(postsDir, month);
    if (fs.statSync(monthDir).isDirectory()) {
      for (const file of fs.readdirSync(monthDir)) {
        if (file.endsWith('.md')) {
          files.push(`2025/${month}/${file}`);
        }
      }
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
  const urlPath = "/posts/" + postPath.replace(/\.md$/, "").replace(/_/g, "-");

  return {
    statusCode: 302,
    headers: {
      Location: urlPath
    }
  };
};
