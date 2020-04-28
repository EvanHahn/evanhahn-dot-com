---
title: Nicer committing with Vim
author: Evan Hahn
layout: post
path: /nicer-committing-with-vim/
---

Add this to your `.vimrc` to automatically start in Insert mode when committing in Git. This will also enable spellchecking.

    if has('autocmd')
      if has('spell')
        au BufNewFile,BufRead COMMIT_EDITMSG setlocal spell
      endif
      au BufNewFile,BufRead COMMIT_EDITMSG call feedkeys('ggi', 't')
    endif

Of course, you'll need to make sure you're using Vim as your editor when committing.
