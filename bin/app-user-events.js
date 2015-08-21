#!/usr/bin/env node
var fs = require('fs')

var opts = require('rc')('app-user-events',{
  dburl: 'http://localhost:5984/app-user-events'
})

var app = require('../lib/index.js')(opts.dburl)
var action = opts._.splice(0,1)[0]

if (action === 'post') {

  if (opts._[3]) {
    // tags are comma seperated
    opts._[3] = opts._[3].split(',')
  }

  if (opts.f) {
    var data = JSON.parse(fs.readFileSync(opts.f))
    opts._.push(data) // we should fill sparse opts
  }

  app[action].apply(null, opts._)
  return
}

if (action === 'query') {
  var space_name = opts._.splice(0,1)[0]
  var query = app.query(space_name)

  if (opts.q) {
    query = query[opts.q].apply(null, opts._)
  }


  if (opts.c) {
    var query_opts = {}
    if (typeof opts.c === 'string') {
      opts.c = [opts.c]
    }
    opts.c.forEach(function(couch_opt){
      var kv = couch_opt.split('=')
      if (kv.length === 2) query_opts[kv[0]] = kv[1]
    })
    query = query.addQueryOpts(query_opts)
  }

  query.stream().pipe(process.stdout)

}
