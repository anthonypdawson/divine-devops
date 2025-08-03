// netlify/functions/prophecy.js

exports.handler = async function(event, context) {
  const prophecies = [
    "The pipeline shall break thrice before the dawn.",
    "Only the purest commit shall pass the gates of prod.",
    "Beware the false positive test—it leads to ruin.",
    "The container shall rise, but only if the logs are clean.",
    "A merge without review is a pact with chaos.",
    "The sacred uptime shall be broken by hubris and cron jobs.",
    "In the shadow of deprecated services, no light shall deploy."
  ];

  const verse = prophecies[Math.floor(Math.random() * prophecies.length)];

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verse })
  };
};
