!function(n){function e(i){if(r[i])return r[i][t];var o=r[i]={exports:{},id:i,loaded:!1};return n[i].call(o[t],o,o[t],e),o.loaded=!0,o[t]}var t="exports",r={},i={0:0};return e.e=function(n,t){if(0===i[n])return t.call(null,e);if(void 0!==i[n])i[n].push(t);else{i[n]=[t];var r=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.charset="utf-8",o.src=e.p+"js/"+n+".js",r.appendChild(o)}},e.modules=n,e.cache=r,e.p="",window.webpackJsonp=function(t,r){for(var o,a,l=[];t.length;)a=t.shift(),i[a]&&l.push.apply(l,i[a]),i[a]=0;for(o in r)n[o]=r[o];for(;l.length;)l.shift().call(null,e)},e(0)}([function(module,exports,require){eval('require(1);\r\n\r\nrequire(3)(function(event) {\r\n	var titleToLink = require(5);\r\n	var linkToTitle = require(4);\r\n\r\n	var titleElement = document.getElementById("title");\r\n	var resultsElement = document.getElementById("results");\r\n	\r\n	var pathname = location.pathname.substr(1);\r\n	if(/404(\\.html)?$/.test(pathname))\r\n		pathname = location.search.substr(2);\r\n	var searchString = linkToTitle(pathname.replace(/\\.html$/i, "")).trim();\r\n	document.title = titleElement.textContent = "Search \'" + searchString + "\'";\r\n	\r\n	require.e/* require */(2, function(require) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [require(6), require(2), require(8)]; (function(extractRegExpFromText, downloadWiki, FullTextSearcher) {\r\n		var searcher = new FullTextSearcher(searchString);\r\n		\r\n		var processedWikis = {};\r\n		var matches = [];\r\n		processWiki("contents");\r\n\r\n		function processWiki(name) {\r\n			if(processedWikis["$"+name]) return;\r\n			processedWikis["$"+name] = true;\r\n			downloadWiki(name, function(err, md) {\r\n				if(err) return;\r\n				console.log("Searching in " + name);\r\n				var links = extractRegExpFromText(md, /\\[\\[(?:[^\\]\\|]+\\|\\s*)?([a-z0-9 \\-_\\.]+)\\]\\]/gi, titleToLink);\r\n				links.forEach(processWiki);\r\n				if(name === "contents") return;\r\n				var result = searcher.scanDocument(linkToTitle(name), md);\r\n				var score = result.score;\r\n				if(score > 0) {\r\n					var element = document.createElement("li");\r\n					var linkElement = document.createElement("a");\r\n					linkElement.setAttribute("href", name + ".html");\r\n					linkElement.textContent = linkToTitle(name);\r\n					element.appendChild(linkElement);\r\n					for(var i = 0; i < matches.length; i++) {\r\n						if(matches[i].score < score) {\r\n							resultsElement.insertBefore(element, matches[i].element);\r\n							matches.splice(i, 0, { score: score, element: element });\r\n							return;\r\n						}\r\n					}\r\n					resultsElement.appendChild(element);\r\n					matches.push({ score: score, element: element });\r\n				}\r\n			});\r\n		}\r\n	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});\r\n});\r\n\n\n// WEBPACK FOOTER\n// module.id = 0\n// module.readableIdentifier = ./app/404.js\n//@ sourceURL=webpack-module:///./app/404.js')},function(module,exports,require){eval("if(true) {\r\n	(function(window, document, script, url, r, tag, firstScriptTag) {\r\n		window['GoogleAnalyticsObject']=r;\r\n		window[r] = window[r] || function() {\r\n			(window[r].q = window[r].q || []).push(arguments)\r\n		};\r\n		window[r].l = 1*new Date();\r\n		tag = document.createElement(script),\r\n		firstScriptTag = document.getElementsByTagName(script)[0];\r\n		tag.async = 1;\r\n		tag.src = url;\r\n		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);\r\n	})(\r\n		window,\r\n		document,\r\n		'script',\r\n		'//www.google-analytics.com/analytics.js',\r\n		'ga'\r\n	);\r\n\r\n	var ga = window.ga;\r\n\r\n	ga('create', (\"UA-46921629-1\"), (\"webpack.github.io\"));\r\n	ga('send', 'pageview');\r\n\r\n	module.exports = function() {\r\n		return window.ga.apply(window.ga, arguments);\r\n	};\r\n} else {\r\n	module.exports = function() {}\r\n}\r\n\n\n// WEBPACK FOOTER\n// module.id = 1\n// module.readableIdentifier = ./app/googleAnalytics.js\n//@ sourceURL=webpack-module:///./app/googleAnalytics.js")},,function(module,exports,require){eval("/*!\r\n * contentloaded.js\r\n *\r\n * Author: Diego Perini (diego.perini at gmail.com)\r\n * Summary: cross-browser wrapper for DOMContentLoaded\r\n * Updated: 20101020\r\n * License: MIT\r\n * Version: 1.2\r\n *\r\n * URL:\r\n * http://javascript.nwbox.com/ContentLoaded/\r\n * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE\r\n *\r\n */\r\n\r\n// @win window reference\r\n// @fn function reference\r\nfunction contentLoaded(win, fn) {\r\n\r\n	var done = false, top = true,\r\n\r\n	doc = win.document, root = doc.documentElement,\r\n\r\n	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',\r\n	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',\r\n	pre = doc.addEventListener ? '' : 'on',\r\n\r\n	init = function(e) {\r\n		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;\r\n		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);\r\n		if (!done && (done = true)) fn.call(win, e.type || e);\r\n	},\r\n\r\n	poll = function() {\r\n		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }\r\n		init('poll');\r\n	};\r\n\r\n	if (doc.readyState == 'complete') fn.call(win, 'lazy');\r\n	else {\r\n		if (doc.createEventObject && root.doScroll) {\r\n			try { top = !win.frameElement; } catch(e) { }\r\n			if (top) poll();\r\n		}\r\n		doc[add](pre + 'DOMContentLoaded', init, false);\r\n		doc[add](pre + 'readystatechange', init, false);\r\n		win[add](pre + 'load', init, false);\r\n	}\r\n\r\n}\r\n\r\nmodule.exports = function(fn) {\r\n	contentLoaded(window, fn);\r\n};\n\n// WEBPACK FOOTER\n// module.id = 3\n// module.readableIdentifier = ./app/onContentLoaded.js\n//@ sourceURL=webpack-module:///./app/onContentLoaded.js")},function(module,exports,require){eval('module.exports = function linkToTitle(link) {\r\n	if(!link) return link;\r\n	return link.toLowerCase().replace(/[^a-z0-9\\.]/g, " ");\r\n}\r\n\n\n// WEBPACK FOOTER\n// module.id = 4\n// module.readableIdentifier = ./lib/linkToTitle.js\n//@ sourceURL=webpack-module:///./lib/linkToTitle.js')},function(module,exports,require){eval('module.exports = function titleToLink(title) {\r\n	if(!title) return title;\r\n	return title.replace(/[ _]/g, "-").toLowerCase();\r\n}\r\n\n\n// WEBPACK FOOTER\n// module.id = 5\n// module.readableIdentifier = ./lib/titleToLink.js\n//@ sourceURL=webpack-module:///./lib/titleToLink.js')}]);