#!/usr/bin/env node
var fs = require('fs')

var opts = require('rc')('app-user-events',{
  database: 'http://localhost:5984/app-user-events'
})

var app = require('../lib/index.js')(opts.database)
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

if (action === 'createTrigger') {

  if (opts._.length !== 3) return console.log('space, category, name specificly please')
  if (!opts.conditions) return console.log('need conditions')
  if (!opts.on_trigger) return console.log('need on_trigger')

  if (opts.conditions.tagsOR) opts.conditions.tagsOR = opts.conditions.tagsOR.split(',')
  if (opts.conditions.tagsAND) opts.conditions.tagsAND = opts.conditions.tagsAND.split(',')

  app.createTrigger(opts._[0], opts._[1], opts._[2], opts.conditions, opts.on_trigger)

}

