---
title: "Disable Google Analytics Tracking"
date: 2025-08-24
layout: terminal_post
permalink: /notracking
---

<script>
function isTrackingDisabled() {
	return document.cookie.indexOf('ga-disable-UA-XXXXXXXXX-X=true') !== -1;
}

function toggleTracking() {
	var btn = document.getElementById('toggle-tracking-btn');
	if (isTrackingDisabled()) {
		// Tracking is currently disabled, so enable it
		document.cookie = 'ga-disable-UA-XXXXXXXXX-X=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
		alert('Google Analytics tracking enabled for this browser.');
	} else {
		// Tracking is currently enabled, so disable it
		document.cookie = 'ga-disable-UA-XXXXXXXXX-X=true; path=/';
		alert('Google Analytics tracking disabled for this browser.');
	}
	updateToggleButton();
}

function updateToggleButton() {
	var btn = document.getElementById('toggle-tracking-btn');
	if (isTrackingDisabled()) {
		btn.className = 'btn btn-success';
		btn.innerText = 'Enable Tracking';
	} else {
		btn.className = 'btn btn-warning';
		btn.innerText = 'Disable Tracking';
	}
}

document.addEventListener('DOMContentLoaded', updateToggleButton);
</script>


This is a secret page for users who wish to disable Google Analytics tracking on the Divine DevOps Universe site.

Click the link below to disable Google Analytics tracking for your session:

<a href="#" id="toggle-tracking-btn" onclick="toggleTracking(); return false;" class="btn btn-warning">Disable Tracking</a>

**How it works:**

- When you click the button above, a cookie is set to disable Google Analytics for your browser session.
- No personal data or analytics are collected while this setting is active.

If you want to re-enable tracking, clear your cookies or visit the site from a different browser.

> **Privacy matters.**

---

*This page is intentionally hidden from navigation and search. Share the link only with those who need it.*
