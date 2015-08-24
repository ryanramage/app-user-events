var request = require('request')
module.exports = function post (dburl, space, user_id, event, tags, data, cb) {
  if (!cb) cb = function (err, results) { console.log(err, results) }

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
  }, function(err, resp, body){
    if (err) return cb(err)

    doc._id = body.id
    doc._rev = body.rev
    cb(null, {
      id: body.id,
      doc: doc
    })
  })
}
