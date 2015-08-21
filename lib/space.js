var request = require('request')

module.exports = function space (dburl, space) {

  var opts = {
    reduce: false,
    startkey: [space],
    endkey: [space]
  }

  var stream = function (view) {
    var base_view = '/_design/app-user-events/_view/'
    if (!view) view = 'by_space'

    opts.endkey.push(999999999999)
    opts.startkey = JSON.stringify(opts.startkey)
    opts.endkey = JSON.stringify(opts.endkey)

    var request_opts = {
      url: dburl + base_view + view,
      qs: opts,
      json: true
    }
    return request(request_opts)
  }

  var addQueryOpts = function (query_opts) {
    Object.keys(query_opts).forEach(function (opt) {
      opts[opt] = query_opts[opt]
    })
    return {
      stream: stream
    }
  }

  var by_user = function (user_id) {
    return {
      stream: function () {
        opts.startkey.push(user_id)
        opts.endkey.push(user_id)
        return stream('by_user')
      },
      addQueryOpts: addQueryOpts
    }
  }

  var by_event = function (event_id) {
    return {
      stream: function () {
        opts.startkey.push(event_id)
        opts.endkey.push(event_id)
        return stream('by_event')
      },
      addQueryOpts: addQueryOpts
    }
  }

  var by_user_event = function (user_id, event_id) {
    return {
      stream: function () {
        opts.startkey.push(user_id, event_id)
        opts.endkey.push(user_id, event_id)
        return stream('by_user_event')
      },
      addQueryOpts: addQueryOpts
    }
  }
  var by_user_event_tag = function (user_id, event_id, tag) {
    return {
      stream: function () {
        opts.startkey.push(user_id, event_id, tag)
        opts.endkey.push(user_id, event_id, tag)
        return stream('by_user_event_tag')
      },
      addQueryOpts: addQueryOpts
    }
  }

  return {
    stream: stream,
    by_user: by_user,
    by_event: by_event,
    by_user_event: by_user_event,
    by_user_event_tag: by_user_event_tag,
    addQueryOpts: addQueryOpts
  }
}
