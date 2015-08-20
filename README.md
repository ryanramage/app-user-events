# gus-user-events

A way to store, retrive, and trigger app user events.

Be careful with user events. This form the base for triggering a workflow.


```
npm install gus-user-events
```

## Usage

``` js
var events = require('gus-user-events')(dburl)

var data = {name: 'Ryan', awesome: true}

events.post('space', 'type', 'userid', data)
events.post('space', 'type', 'userid', ['tag1'], data)


events.by('space').stream()
events.by('space', 'type').stream()
events.by('space', 'type', 'userid').stream()
events.by('space', 'type', 'userid')
  .addQueryOpts({limit:1}) // add traditional couchdb query params
  .stream()

events.by('space', 'type')
  .tagsOR(['a', 'b']) // events have tags a OR b
  .stream()
events.by('space', 'type')
  .tagsAND(['a', 'b']) //events have tags a AND b
  .stream()

var conditions = {
  tagsOR: ['tag1', 'tag2'], // only trigger OR of these tags
  validator: 'validatejs',
  valid: { // some declaritve object validator
    awesome: {equality: true}
  }
}

var hook = require('webhook-event')('http://salesforce.com/newPerson', {
  headers: { accessToken: 'dasdsadsasdaas' }
})

events.createTrigger('space', 'type', conditions, hook, function(err, success){
  success._id
  events.removeTrigger(success._id, function(err){
    
  })
})

```

## License

MIT
