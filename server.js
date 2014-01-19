
const http = require('http')
    , st = require('st')
    , path = require('path')
    , mount = st({ path: path.resolve(__dirname, 'public')
      , cache: false
      , passthrough: true
      })
    , haiku = require('haiku')
    , colors = require('colors')
    , chokidar = require('chokidar')
    , stylesheets = path.resolve(__dirname, 'stylesheets')
    , browser = path.resolve(__dirname, 'browser')
    , browserify = require('browserify')
    , fs = require('fs')
    , styl = require('styl')

// Just a simple dev server
http.createServer(function(req, res){
  if (req.url === '/') req.url = '/index.html'

  mount(req, res, function(){
    res.haiku = haiku(req, res, { src: __dirname })
    res.haiku(req.url)
  })
})
.listen(8080, function(){
  console.log('==>'.yellow, 'http://localhost:8080'.grey, '<=='.yellow)
  console.log()
})

chokidar
.watch(stylesheets, { persistent: true })
.add(browser)
.on('change', function(filename){
  var shortname = filename.replace(__dirname + '/', '')
  console.log('* changed detected', shortname.grey)
  if (filename.match('.css')) css(filename)
  if (filename.match('.js'))  js()
})

function css(filename){
  fs.readFile(filename, 'utf8', function(err, data){
    if (err) throw err
    var css = styl(data, { compress: true }).toString()
    fs.writeFile(path.resolve(__dirname, 'public/bundle.css'), css, function(err){
      console.log('* rebuilt', 'public/bundle.css'.grey)
    })
  })
}

function js(){
  browserify()
  .add(path.join(browser, 'index.js'))
  .bundle({ debug: true })
  .pipe(fs.createWriteStream(path.resolve(__dirname, 'public/bundle.js')))
  .on('finish', function(){
    console.log('* rebuilt', 'public/bundle.js'.grey)
  })
}

