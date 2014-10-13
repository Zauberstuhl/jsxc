/* global module:false */
module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      app: grunt.file.readJSON('package.json'),
      jshint: {
         options: {
            jshintrc: '.jshintrc'
         },
         gruntfile: {
            src: 'Gruntfile.js'
         },
         files: [ 'jsxc.lib.webrtc.js', 'jsxc.lib.js' ]
      },
      copy: {
         main: {
            files: [ {
               expand: true,
               src: [ 'lib/strophe.jingle/*.js', 'lib/otr/build/**', 'lib/otr/lib/dsa-webworker.js', 'lib/otr/lib/sm-webworker.js', 'lib/otr/lib/const.js', 'lib/otr/lib/helpers.js', 'lib/otr/lib/dsa.js', 'lib/otr/vendor/*.js', 'lib/*.js', 'jsxc.lib.js', 'jsxc.lib.webrtc.js', '*.css', 'LICENSE', 'img/**', 'sound/**' ],
               dest: 'build/'
            } ]
         }
      },
      clean: [ 'build/' ],
      usebanner: {
         dist: {
            options: {
               position: 'top',
               banner: '<%= meta.banner %>'
            },
            files: {
               src: [ 'build/*.js' ]
            }
         }
      },
      replace: {
         version: {
            src: [ 'build/jsxc.lib.js' ],
            overwrite: true,
            replacements: [ {
               from: '< $ app.version $ >',
               to: "<%= app.version %>"
            } ]
         }
      },
      search: {
         console: {
            files: {
               src: ['*.js']
            },
            options: {
               searchString: /console\.log\((?!'[<>]|msg)/g,
               logFormat: 'console',
               failOnMatch: true
            }
         },
         changelog: {
            files: {
               src: ['CHANGELOG.md']
            },
            options: {
               searchString: "<%= app.version %>",
               logFormat: 'console',
               onComplete: function(m) {
                  if(m.numMatches === 0) {
                     grunt.fail.fatal("No entry in README.md for current version found.");
                  }
               }
            }
         }
      },
      compress: {
         main: {
            options: {
               archive: "jsxc-<%= app.version %>.zip"
            },
            files: [ {
               src: [ '**' ],
               expand: true,
               dest: 'jsxc/',
               cwd: 'build/'
            } ]
         }
      },
      shell: {
         hooks: {
            command: 'cp pre-commit .git/hooks/'
         }
      },
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: [
            "lib/strophe.js",
            "lib/strophe.disco.js",
            "lib/strophe.caps.js",
            "lib/strophe.jingle/strophe.jingle.adapter.js",
            "lib/strophe.jingle/strophe.jingle.js",
            "lib/strophe.jingle/strophe.jingle.sdp.js",
            "lib/strophe.jingle/strophe.jingle.session.js",
            "lib/strophe.muc.js",
            "lib/strophe.vcard.js",
            "lib/jquery.ui.min.js",
            "lib/jquery.colorbox-min.js",
            "lib/jquery.fullscreen.js",
            "lib/jquery.slimscroll.js",
            "lib/dsa-ww.js",
            "lib/otr/build/dep/bigint.js",
            "lib/otr/build/dep/crypto.js",
            "lib/otr/build/dep/eventemitter.js",
            "lib/otr/build/dep/salsa20.js",
            "lib/otr/build/dsa-webworker.js",
            "lib/otr/build/sm-webworker.js",
            "lib/otr/build/otr.min.js",
            "lib/otr/lib/const.js",
            "lib/otr/lib/dsa.js",
            "lib/otr/lib/dsa-webworker.js",
            "lib/otr/lib/helpers.js",
            "lib/otr/lib/sm-webworker.js",
            "lib/otr/vendor/bigint.js",
            "lib/otr/vendor/crypto.js",
            "lib/otr/vendor/eventemitter.js",
            "lib/otr/vendor/salsa20.js"
          ],
          dest: 'dependencies.js',
        }
      }
   });

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-banner');
   grunt.loadNpmTasks('grunt-text-replace');
   grunt.loadNpmTasks('grunt-search');
   grunt.loadNpmTasks('grunt-contrib-compress');
   grunt.loadNpmTasks('grunt-shell');

   // Default task.
   grunt.registerTask('default', [ 'jshint', 'search', 'clean', 'copy', 'usebanner', 'replace' ]);

   // Create alpha/beta build
   grunt.registerTask('pre', ['jshint', 'search:console', 'clean', 'copy', 'usebanner', 'replace', 'compress' ]);

   // before commit
   grunt.registerTask('commit', [ 'jshint', 'search:console' ]);
   
   // prepare pre-commit hook
   grunt.registerTask('hookmeup', ['shell:hooks']);
};
