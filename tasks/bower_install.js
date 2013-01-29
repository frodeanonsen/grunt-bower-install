/*
 * grunt-bower-task
 * https://github.com/frodeanonsen/grunt-bower-install
 *
 * Copyright (c) 2013 Frode Anonsen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var rimraf = require('rimraf').sync;
  var bower = require('bower');
  var colors = require('colors');

  grunt.registerMultiTask('bower_install', 'Simply install Bower packages.', function() {
    var done = this.async();

    var options = this.options({
      targetDir: './components',
      cleanup: false
    });

    bower.config.directory = options.targetDir;

    if (options.cleanup) {
      rimraf(options.targetDir);
      grunt.log.writeln(('[notice]').yellow + ' cleaning up ' + path.resolve(options.targetDir));
    }

    bower.commands.install()
      .on('data', function(data) {
        grunt.log.writeln(data);
      })
      .on('end', function() {
        grunt.log.writeln('Bower packages installed successfully.');
        done();
      })
      .on('error', function(error) {
        grunt.fail.fatal(error);
      });
  });

};