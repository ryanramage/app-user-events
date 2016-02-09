var request = require('request')
module.exports = function put (dburl, event_id, space, user_id, event, tags, data, cb) {
  if (!cb) cb = function (err, results) { console.log(err, results) }
  if (!event_id) return cb('event_id required')
  if (!user_id) return cb('user_id required')
  if (!event) return cb('event required')

  var doc = {
    _id: event_id.toString(),
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
  }, function(err, resp, body){

    if (err) return cb(err)
    if (body.error) return cb(body.error)

    doc._rev = body.rev
    cb(null, {
      id: event_id,
      doc: doc
    })
  })
}
