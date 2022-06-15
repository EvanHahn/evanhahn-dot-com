---
date: 2012-08-02
title: Nicer committing with Vim
author: Evan Hahn
layout: post
url: /nicer-committing-with-vim/
---

Add this to your `.vimrc` to automatically start in Insert mode when committing in Git. This will also enable spellchecking.

```viml
augroup commits
  autocmd!

  if has('spell')
    au BufNewFile,BufRead COMMIT_EDITMSG setlocal spell
  endif
  au BufNewFile,BufRead COMMIT_EDITMSG call feedkeys('ggi', 't')
augroup END
```

Of course, you'll need to make sure you're using Vim as your editor when committing.
