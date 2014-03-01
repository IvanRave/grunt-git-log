# grunt-git-log

A [grunt](https://github.com/cowboy/grunt) plugin for outputting commit messages from git log, between given dates.

## API

### Tasks

#### gitlog

Outputs git commit messages

Example:

gitlog: {
          options: {
            dest: 'doc/month.log',
            afterDate: new Date(2014, 1, 1),
            beforeDate: new Date(2014, 2, 1)
          }
        },

## License
Copyright (c) 2012 Jeremy Jannotta

Licensed under the MIT license.
