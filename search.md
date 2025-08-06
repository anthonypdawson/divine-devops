---
layout: search
title: "Divine Query Interface"
permalink: /search/
---


<head>
  <meta charset="UTF-8">
  <title>Divine Query Interface</title>
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"></script>
  <style>
      .search-selected {
        background: #333 !important;
        border-left: 3px solid #ffd700 !important;
        color: #ffd700 !important;
      }


      #divine-query {
        display: block;
    margin: 0 auto 0 auto;
        padding: 0.75em 1em;
        border: 2px solid #00ffd0;
        background: #222;
        color: #eaeaea;
        width: 80%;
        
        font-size: 1.1em;
        border-radius: 4px;
        box-shadow: 0 2px 8px #0002;
      }


      #search-results {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      #search-results div {
        margin-top: 1em;
        padding: 1em;
        border-left: 3px solid #00ffd0;
        background: #232323;
        color: #eaeaea;
        border-radius: 3px;
        box-shadow: 0 1px 4px #0002;
        width: 80%;
        
      }

      #search-results div:nth-child(even) {
        background: #262626;
      }

    a {
      color: #00ffd0;
      text-decoration: none;
      font-weight: bold;
      letter-spacing: 0.02em;
    }

    a:hover {
      text-decoration: none;
      color: #ffd700;
    }
    .meta {
      font-size: 0.9em;
      color: #aaa;
    }

    .meta strong {
      color: #f0c674;
    }
  </style>
</head>
<body>

  <h1>🔍 Divine Query Interface</h1>
  <input id="divine-query" type="text" placeholder="Speak, mortal. What do you seek?" />
  <div id="search-results"><p>Search the divine records</p></div>

  <script>
    let fuse;

    fetch('/lore.json')
      .then(response => response.json())
      .then(data => {
        const options = {
          keys: ['title', 'summary', 'tags', 'categories'],
          threshold: 0.3
        };
        fuse = new Fuse(data, options);
      });

    let selectedIndex = -1;
    let currentResults = [];

    function renderResults(results) {
      currentResults = results;
      const output = results.map((result, idx) => {
        const item = result.item;
        const tagList = item.tags.join(', ');
        const categoryList = item.categories.join(', ');
        return `
          <div class="${selectedIndex === idx ? 'search-selected' : ''}" data-result-idx="${idx}">
            <a href="${item.url}" style="text-decoration: none;">
              ${item.title}
            </a>
            <p>${item.summary}</p>
            <p class="meta"><strong>Tags:</strong> ${tagList}</p>
            <p class="meta"><strong>Categories:</strong> ${categoryList}</p>
          </div>
        `;
      }).join('');
      document.getElementById('search-results').innerHTML = output || "<p>No divine records found.</p>";

      // Scroll selected result into view
      if (selectedIndex >= 0) {
        const selectedDiv = document.querySelector(`#search-results div[data-result-idx='${selectedIndex}']`);
        if (selectedDiv) {
          selectedDiv.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }

    document.getElementById('divine-query').addEventListener('input', function(e) {
      if (!fuse) return;
      const results = fuse.search(e.target.value);
      selectedIndex = results.length > 0 ? 0 : -1;
      renderResults(results);
    });

    document.getElementById('divine-query').addEventListener('keydown', function(e) {
      if (!currentResults || currentResults.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % currentResults.length;
        renderResults(currentResults);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
        renderResults(currentResults);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const item = currentResults[selectedIndex].item;
        window.location.href = item.url;
      }
    });
  </script>

</body>
