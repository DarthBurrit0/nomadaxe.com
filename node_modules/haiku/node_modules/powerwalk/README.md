# powerwalk [![Build Status](https://travis-ci.org/jxson/powerwalk.png?branch=master)](https://travis-ci.org/jxson/powerwalk)

Recursively walks a directory and emits filenames. Also supports additional stats and content events (if you want them).

I keep writing and re-writing this code in one form or another for most of my node projects. I thought it might be useful to some of you. There are a few similar packages on npm already but none seem to have either the narrow focus I wanted or they use straight `fs` calls which can be harsh when EMFILE happens.

    powerwalk('./content')
    .on('error', function(err){
      throw err
    })
    .on('read', function(f){
      console.log(f)
    })
    .on('end', finish)

# powerwalk(dir)

Performs an async walk, returns an event emitter that will execute file calls and emit events appropriately.

# Events

* `end` when the walk is over this is emitted
* `file` every time a file is found this is emitted with the absolute filename of the file
* `stat` if there is a listener for this event an `fs.stat` call will be made and emit this event with a `powerwalk.File` object
* `read`
* `error` emitted when an fs error happens

# Class powerwalk.File

Objects emitted from `stat` and and `read` events will be of this type. `powerwalk.File` objects will have 3 properties:

* `filename` - the absolute pathname for the file
* `stats` - the stats result for the file
* `data` - the contents of the file
