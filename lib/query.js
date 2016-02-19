var request = require('request')

module.exports = function space (dburl, space) {

  var opts = {
    descending: true,
    reduce: false,
    startkey: [space],
    endkey: [space]
  }

  var stream = function (view) {
    var base_view = '/_design/app-user-events/_view/'
    if (!view) view = 'by_space'

    opts.startkey.push(999999999999)
    opts.startkey = JSON.stringify(opts.startkey)
    opts.endkey = JSON.stringify(opts.endkey)

    if (opts.descending === 'false') {
      // we must swap
      var temp = opts.startkey
      opts.startkey = opts.endkey
      opts.endkey = temp
    }

    var request_opts = {
      url: dburl + base_view + view,
      qs: opts,
      json: true
    }
    return request(request_opts)
  }

  var addQueryOpts = function (_stream, query_opts) {
    Object.keys(query_opts).forEach(function (opt) {
      opts[opt] = query_opts[opt]
    })
    return {
      stream: _stream
    }
  }

  var by_user = function (user_id) {
    var _stream = function () {
      opts.startkey.push(user_id)
      opts.endkey.push(user_id)
      return stream('by_user')
    }
    return {
      stream: _stream,
      addQueryOpts: addQueryOpts.bind(null, _stream)
    }
  }

  var by_event = function (event_id) {
    var _stream = function () {
      opts.startkey.push(event_id)
      opts.endkey.push(event_id)
      return stream('by_event')
    }
    return {
      stream: _stream,
      addQueryOpts: addQueryOpts.bind(null, _stream)
    }
  }

  var by_user_event = function (user_id, event_id) {
    var _stream = function () {
      opts.startkey.push(user_id, event_id)
      opts.endkey.push(user_id, event_id)
      return stream('by_user_event')
    }
    return {
      stream: _stream,
      addQueryOpts: addQueryOpts.bind(null, _stream)
    }
  }
  var by_user_event_tag = function (user_id, event_id, tag) {
    var _stream = function () {
      opts.startkey.push(user_id, event_id, tag)
      opts.endkey.push(user_id, event_id, tag)
      return stream('by_user_event_tag')
    }
    return {
      stream: _stream,
      addQueryOpts: addQueryOpts.bind(null, _stream)
    }
  }

  var by_user_tag = function (user_id, tag) {
    var _stream = function () {
      opts.startkey.push(user_id, tag)
      opts.endkey.push(user_id, tag)
      return stream('by_user_tag')
    }
    return {
      stream: _stream,
      addQueryOpts: addQueryOpts.bind(null, _stream)
    }
  }

  return {
    stream: stream,
    by_user: by_user,
    by_event: by_event,
    by_user_event: by_user_event,
    by_user_event_tag: by_user_event_tag,
    by_user_tag: by_user_tag,
    addQueryOpts: addQueryOpts
  }
}
