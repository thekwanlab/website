module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
          dest: '_site'
        },
        uglify: {
            main: {
                src: 'js/<%= pkg.theme %>.js',
                dest: 'js/<%= pkg.theme %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/<%= pkg.theme %>.css": "less/<%= pkg.theme %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    compress: true,
                    cleancss: true
                },
                files: {
                    "css/<%= pkg.theme %>.min.css": "less/<%= pkg.theme %>.less"
                }
            }
        },
        uncss: {
          options: {
            ignore: [
              // Bootstrap selectors added via JS
              /\w\.in/,
              '.fade',
              '.collapse',
              '.collapsed',
              '.collapsing',
              /(#|\.)navbar(-[a-zA-Z]+)?/,
              /(#|\.)dropdown(-[a-zA-Z]+)?/,
              /(#|\.)(open)/,
              /(#|\.)carousel(-[a-zA-Z]+)?/,
              // injected via JS
              /disabled/,
              /\.no-js/,
              /\.defer/,
              /\.img-responsive/,
              /\.table-responsive/,
              /\.table/
            ],
            htmlroot: '<%= dirs.dest %>',
            ignoreSheets: [/fonts.googleapis/, /bootstrapcdn/],
            stylesheets: ['/css/bootstrap.min.css']
          },
          dist: {
            src: '<%= dirs.dest %>/**/*.html',
            dest: 'css/bootstrap.tiny.css'
          }
        },
        watch: {
            scripts: {
                files: ['js/<%= pkg.theme %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-uncss');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'uncss']);

};
