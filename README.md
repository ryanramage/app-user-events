# app-user-events

A way to store, retrive, and trigger app user events.

Be careful with user events. This form the base for triggering a workflow.


```
npm install app-user-events
```

## Usage


    var events = require('app-user-events')(dburl)

Posting events

    var data = {name: 'Ryan', awesome: true}
    events.post('space', 'event', 'userid', data)
    events.post('space', 'event', 'userid', ['tag1'], data)

Query events

    events.space('space').stream()
    events.space('space').by_user('38329823').stream()
    events.space('space').by_event('login').stream()
    events.space('space').by_user_event('38329823', 'login').stream()
    events.space('space').by_user_event_tag('38329823', 'request-showing', 'E138329').stream()

Add some couch options

    events.space('space')
      .addQueryOpts({limit:1}) // add traditional couchdb query params
      .stream()

    events.space('space')
      .by_user_event('38329823', 'login')
      .addQueryOpts({limit:3})
      .stream()

Settup Triggers

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


## License

MIT
