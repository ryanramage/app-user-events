var request = require('request')

module.exports = function createTrigger (dburl, space, category, name, conditions, on_trigger, cb) {

  if (!cb) cb = function (err, resp, body) { console.log(err, body) }
  if (!space) return cb('space required')
  if (!category) return cb('category require')
  if (!name) return cb('name required')
  if (!conditions) return cb('conditions required')
  if (!on_trigger) return cb('on_trigger required')

  if (!conditions.event && !conditions.tagsOR && !conditions.tagsAND && !conditions.module) {
    return cb('conditions requires one or more properties of [event, tagsOR, tagsAND, or module]')
  }

  if (!on_trigger.module) return cb('on_trigger requires a module property')

  var doc = {
    type: 'app-user-event-trigger',
    space: space,
    category: category,
    name: name,
    conditions: conditions,
    on_trigger: on_trigger
  }

  request({
    url: dburl,
    json: true,
    body: doc,
    method: 'POST'
  }, cb)

}

