module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '@*/grunt-*']});

    grunt.initConfig({
        clean: {
            www: ['www']
        },
        copy: {
            assets: {
                files: [{
                    cwd: 'bower_components',
                    expand: true,
                    src: ['**/*'],
                    dest: 'www/.libs/'
                }]
            },
            partials: {
                files:[{
                    cwd:'src',
                    expand: true,
                    src:  ['index.html', 'partials/**/*'],
                    dest: 'www'
                }]
            }
        },
        wiredep: {
            bower: {
                options:{
                    directory: 'www/.libs/'
                },
                src: ['www/index.html']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compact',
                    compass: true
                },
                files: {
                    'www/css/styles.css': 'src/styles/styles.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/scripts/**/*'],
                tasks: ['newer:uglify']
            },
            styles: {
                files: ['src/styles/**/*'],
                tasks: ['sass']
            },
            partials: {
                files: ['src/partials/**/*', 'src/index.html'],
                tasks: ['newer:copy:partials', 'wiredep']
            }
        },
        uglify: {
            options: {
                sourceMapIncludeSources: true
            },
            development: {
                options: {
                    mangle: false,
                    sourceMap: true,
                    compress: false
                },
                files: {
                    'www/scripts/app.min.js': [
                        'src/scripts/modules/app.module.js',
                        'src/scripts/modules/**/*.module.js',

                        'src/scripts/services/**/*.js',
                        'src/scripts/controller/**/*.js',
                        'src/scripts/directives/**/*.js',
                        'src/scripts/**/*.js'
                    ]
                }
            }
        }
    });


    grunt.registerTask('default', ['clean', 'newer:copy', 'newer:uglify', 'sass', 'wiredep']);
    grunt.registerTask('run', ['default', 'watch']);

};