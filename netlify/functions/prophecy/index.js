const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const jsonPath = path.join(__dirname, 'prophecies.json');
  let prophecies = [];
  try {
    const data = fs.readFileSync(jsonPath, 'utf8');
    prophecies = JSON.parse(data);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not read prophecies.' })
    };
  }
  if (!Array.isArray(prophecies) || prophecies.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'No prophecies found.' })
    };
  }
  const verse = prophecies[Math.floor(Math.random() * prophecies.length)];
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ verse })
  };
};
