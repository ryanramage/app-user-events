module.exports = function (dburl) {
  return {
    post: require('./post').bind(null, dburl),
    space: require('./space').bind(null, dburl),
    createTrigger: require('./createTrigger').bind(null, dburl),
    removeTrigger: require('./removeTrigger').bind(null, dburl)
  }
}
