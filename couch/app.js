var ddoc = {
  _id: '_design/app-user-events',
  views: {}
}

ddoc.views.by_user = {
  map: function(doc) {
    if (doc.type !== 'app-user-event') return;

    // repeatitive
    var d = new Date(doc.timestamp);
    var year = Number(d.getFullYear());
    var month = d.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    var day = d.getDate() ;
    if (day <=9) day = '0' + day;


    emit([doc.space, doc.user_id, Number(year), Number(month), Number(day), doc.timestamp, doc.event])
  },
  reduce: '_count'
}

ddoc.views.by_user_event = {
  map: function(doc) {
    if (doc.type !== 'app-user-event') return;

    // repeatitive
    var d = new Date(doc.timestamp);
    var year = Number(d.getFullYear());
    var month = d.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    var day = d.getDate() ;
    if (day <=9) day = '0' + day;


    emit([doc.space, doc.user_id, doc.event, Number(year), Number(month), Number(day), doc.timestamp])
  },
  reduce: '_count'
}

ddoc.views.by_user_event_tag = {
  map: function(doc) {
    if (doc.type !== 'app-user-event') return;
    if (!doc.tags) return;

    // repeatitive
    var d = new Date(doc.timestamp);
    var year = Number(d.getFullYear());
    var month = d.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    var day = d.getDate() ;
    if (day <=9) day = '0' + day;

    for (var i = doc.tags.length - 1; i >= 0; i--) {
      var tag = doc.tags[i];
      emit([doc.space, doc.user_id, doc.event, tag, Number(year), Number(month), Number(day), doc.timestamp])
    };
  },
  reduce: '_count'
}

ddoc.views.by_user_tag = {
  map: function(doc) {
    if (doc.type !== 'app-user-event') return;
    if (!doc.tags) return;

    // repeatitive
    var d = new Date(doc.timestamp);
    var year = Number(d.getFullYear());
    var month = d.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    var day = d.getDate() ;
    if (day <=9) day = '0' + day;
    for (var i = doc.tags.length - 1; i >= 0; i--) {
      var tag = doc.tags[i];
      emit([doc.space, doc.user_id, tag, Number(year), Number(month), Number(day), doc.timestamp, doc.event])
    };
  },
  reduce: '_count'
}

ddoc.views.by_event = {
  map: function(doc) {
    if (doc.type !== 'app-user-event') return;

    // repeatitive
    var d = new Date(doc.timestamp);
    var year = Number(d.getFullYear());
    var month = d.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    var day = d.getDate() ;
    if (day <=9) day = '0' + day;

    emit([doc.space, doc.event, Number(year), Number(month), Number(day), doc.timestamp, doc.user_id])
  },
  reduce: '_count'
}

ddoc.views.by_space = {
  map: function(doc) {
    if (doc.type !== 'app-user-event') return;

    // repeatitive
    var d = new Date(doc.timestamp);
    var year = Number(d.getFullYear());
    var month = d.getMonth() + 1;
    if (month <= 9) month = '0' + month;
    var day = d.getDate() ;
    if (day <=9) day = '0' + day;


    emit([doc.space, Number(year), Number(month), Number(day), doc.timestamp, doc.event, doc.user_id])
  },
  reduce: '_count'
}

ddoc.views.triggers = {
  map: function(doc) {
    if (doc.type !== 'app-user-event-trigger') return;

    emit([doc.space, doc.category, doc.name], null)
  }
}

module.exports = ddoc

