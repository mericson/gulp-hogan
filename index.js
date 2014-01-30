'use strict';
var map = require('map-stream');
var es = require('event-stream');;
var gutil = require('gulp-util');
var Hogan = require('hogan.js');

module.exports = function(data, partials) {
  data = data || {};
  return es.map(function (file, cb) {
    file.contents = new Buffer( Hogan.compile(file.contents.toString()).render(data, partials) );
    file.path = gutil.replaceExtension(file.path, '.html');
    cb(null,file);
  });
};