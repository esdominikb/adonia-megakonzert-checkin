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
            scripts: {
                files: [{
                    cwd: 'src',
                    expand: true,
                    src: ['scripts/**/*'],
                    dest: 'www/'
                    //filter: 'isFile'
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
                tasks: ['newer:copy:scripts']
            },
            styles: {
                files: ['src/styles/**/*'],
                tasks: ['sass']
            },
            partials: {
                files: ['src/partials/**/*', 'src/index.html'],
                tasks: ['newer:copy:partials', 'wiredep']
            }
        }
    });


    grunt.registerTask('default', ['clean', 'newer:copy', 'sass', 'wiredep', 'watch']);

};