var request = require('request')
module.exports = function post (dburl, space, type, user_id, tags, data, cb) {
  if (!cb) cb = function (err, resp, body) { console.log(err, body) }

  var doc = {
    type: 'app-user-event',
    space: space,
    event: type,
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
