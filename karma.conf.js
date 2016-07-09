module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'browserify'],
    basePath: 'dist',
    files: [
      '**/*.spec.js'
    ],
    preprocessors: {
      '**/*.spec.js': [ 'browserify' ]
    },
    browserify: {
      debug: true
    },
    watchify: {
      poll: true
    }
  })
}
