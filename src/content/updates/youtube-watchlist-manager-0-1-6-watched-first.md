---
title: YouTube Watchlist Manager 0.1.6 fixes watched-first sorting
summary: Watched-first sorting now recognises YouTube’s changed progress indicators; the repository records passing tests and a manual check.
publishedAt: 2026-09-22
draft: false
project: youtube-watchlist-manager
---

YouTube changed the markup used for playback progress, leaving watched-first sorting unable to recognise some videos. Version 0.1.6 adds support for the renamed progress indicator and for watched badges that run directly into the video duration.

The repository records 18 passing tests, a rebuilt 0.1.6 package, and a manual confirmation that watched-first sorting works after reloading the extension. Its latest task record still lists Chrome Web Store upload as the remaining step; this note does not establish store availability.

Sources: [implementation and regression tests](https://github.com/liewcf/youtube-watchlist-manager/commit/86720d8534722498da12a0ee67c681988be67b5b), [manual verification and upload status](https://github.com/liewcf/youtube-watchlist-manager/commit/1b1a7c82ca07272fdb9f569eabd6696562b9ff70).
