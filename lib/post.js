var request = require('request')
module.exports = function post (dburl, space, user_id, event, tags, data, cb) {
  if (!cb) cb = function (err, resp, body) { console.log(err, body) }

  if (!user_id) return cb('user_id required')
  if (!event) return cb('event required')

  var doc = {
    type: 'app-user-event',
    space: space,
    event: event,
    user_id: user_id,
    timestamp: Date.now()
  }
  if (tags) doc.tags = tags
  if (data) doc.data = data

  request({
    url: dburl,
    json: true,
    body: doc,
    method: 'POST'
  }, cb)
}
