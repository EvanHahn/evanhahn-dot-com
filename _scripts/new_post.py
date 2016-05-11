#!/usr/bin/env python
from __future__ import print_function
from datetime import datetime
import sys
import os


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


if len(sys.argv) < 2:
    eprint('usage: ./new_post.py How to eat 100 hot dogs in 5 minutes')
    exit(1)

args = sys.argv[1:]

title = ' '.join(args)
permalink = '-'.join(args).lower()
today = datetime.now().strftime('%Y-%m-%d')

current_dir = os.path.dirname(os.path.abspath(__file__))
posts_dir = os.path.join(current_dir, '..', '_posts')
post_path = os.path.join(posts_dir, today + '-' + permalink + '.md')

with open(post_path, 'w') as file:
    file.write('---\n')
    file.write('title: %s\n' % title)
    file.write('layout: post\n')
    file.write('permalink: /%s/\n' % permalink)
    file.write('---\n')
