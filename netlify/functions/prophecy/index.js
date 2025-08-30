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
  // Get count from query string, default to 1
  const params = event.queryStringParameters || {};
  let count = parseInt(params.count, 10);
  if (isNaN(count) || count < 1) count = 1;
  if (count > prophecies.length) count = prophecies.length;

  // Pick 'count' random unique prophecies
  const shuffled = prophecies.slice().sort(() => Math.random() - 0.5);
  const verses = shuffled.slice(0, count);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(count === 1 ? { verse: verses[0] } : { verses })
  };
};
