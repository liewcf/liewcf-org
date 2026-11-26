---
title: Public Draft Share 1.0.2 disables preview links while a post is in the trash
summary: Moving a WordPress draft to the trash stops reviewers from opening its preview. Restore the draft and the same link works again, provided it’s still valid.
publishedAt: 2026-10-09
draft: false
project: public-draft-share
---

If you send a draft for review and then move it to the trash, anyone who opens the link loses access to the preview. If you restore the draft, an unexpired, enabled link works again. To end the review even if you later restore the post, disable the link in the editor.

Version 1.0.2 also fixes a problem with themes and plugins that check whether a visitor can read the post. A reviewer with a valid link can now pass that check for the shared post.

[Release notes](https://github.com/liewcf/public-draft-share/releases/tag/v1.0.2) · [Plugin changelog at release](https://github.com/liewcf/public-draft-share/blob/3c40ad1c00eecc654fb7a2b3772269395569c912/readme.txt)
