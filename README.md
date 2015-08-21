# app-user-events

A way to store, retrive, and trigger app user events.

Be careful with user events. This form the base for triggering a workflow.




## Module Usage

Install

    npm install app-user-events

Require and config

    var events = require('app-user-events')('http://localhost:5984/app-user-events')

Posting events

    var data = {name: 'Ryan', awesome: true}
    events.post('space', 'userid', 'E38293', data)
    events.post('space', 'userid', 'E38293', ['showing-request'], data)

Query events

    events.query('space').stream()
    events.query('space').by_user('userid').stream()
    events.query('space').by_event('E38293').stream()
    events.query('space').by_user_event('userid', 'E38293').stream()
    events.query('space').by_user_event_tag('userid', 'E138329', 'request-showing').stream()

Add some couch options

    events.query('space')
      .addQueryOpts({limit:1}) // add traditional couchdb query params
      .stream()

    events.query('space')
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


## Command Line Usage

Install

    npm install app-user-events

Config. We use the [rc configuration](https://github.com/dominictarr/rc#standards). The only
required option is `dburl` which by default is `http://localhost:5984/app-user-events` 

Post examples

post to space=timeline, event=E21221, user_id=1, tags=[star]

    > app-user-events post timeline 1 E21221 star

post to space=timeline, event=E21221, user_id=1, with data from a json file

    > app-user-events post timeline 1 E21221 -f ~/data/something.json

Query examples

All events in the timeline space

    > app-user-events query timeline 

Add couch options, like limit

    > app-user-events query timeline  -c limit=1

Query by_user=1

    > app-user-events query timeline -q by_user 1

Query by_user = 1 with event = E21221

    > app-user-events query timeline -q by_user_event 1 E21221

Query by_user = 1 with event = E21221, tagged star

    > app-user-events query timeline -q by_user_event_tag 1 E21221 star

Query by_event=E21221, all users

    > app-user-events query timeline -q by_event E21221


## License

MIT
