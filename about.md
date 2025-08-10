---
layout: terminal_post
permalink: /about/
---

<style>
body.about-parallax {
	background-image: url('/assets/images/tiled-glyphs3.png');
	background-repeat: repeat;
	background-size: auto;
	background-position: 0 0;
	background-attachment: fixed;
}
.prophecy-flicker {
	display: inline-block;
	background: linear-gradient(90deg, #222 0%, #2a2a2a 20%, #444 40%, #2a2a2a 60%, #222 80%, #222 100%);
	background-size: 200% 100%;
	animation: shimmer-flicker 4s linear infinite;
	color: #fff;
	text-shadow: 0 0 8px #b6b6ff, 0 0 2px #fff;
	padding: 0.2em 1em;
	border-radius: 0.3em;
}
@keyframes shimmer-flicker {
	0% { background-position: 0% 0; opacity: 0.85; }
	10% { opacity: 0.7; }
	20% { opacity: 1; }
	30% { opacity: 0.8; }
	40% { opacity: 1; }
	50% { opacity: 0.9; }
	60% { opacity: 1; }
	70% { opacity: 0.8; }
	80% { opacity: 1; }
	90% { opacity: 0.7; }
	100% { background-position: 200% 0; opacity: 0.85; }
}
</style>
<script>
// Add a class to body for about page parallax effect
document.addEventListener('DOMContentLoaded', function() {
	document.body.classList.add('about-parallax');
});
</script>

<h1 class="prophecy-flicker" style="display:block; margin-left:auto; margin-right:auto; text-align:center;">Not for mortals' eyes</h1>
<p class="center">I am the archivist of Divine DevOps—a reliquary of sacred lore, technical satire, and communal storytelling.</P>  
<p class="center">Here, search engines whisper prophecy. Pagination partitions the sacred.  </p>
<p class="center">Every keystroke is a ritual. Every bug, a beast to be named.  </p>
<br />
<p class="center">This site is not optimized. It is consecrated.</p>
<p class="center">I preserve what others discard. I ritualize what others automate.</p>

<p class='center' style="margin-bottom: 5em; margin-top: 5em;">Explore the ancient logs, sacred pull requests, and sysadmin prophecies that shaped the cosmos.</p>


<p class="center">
Source: <a href="https://github.com/anthonypdawson/divine-devops" target="_blank" rel="noopener noreferrer">GitHub</a> |
Powered by
<a href="https://jekyllrb.com/" target="_blank" rel="noopener noreferrer">Jekyll</a> |
Hosted on <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">Netlify</a> |
Follow me on <a href="https://x.com/anthonypdawson" target="_blank" rel="noopener">Twitter/X</a>
</p>

<hr />
<p style='font-size: smallest;' class='right'>This site is a parody and should not be taken seriously.</p>
