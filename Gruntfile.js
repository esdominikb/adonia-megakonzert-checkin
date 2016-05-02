module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '@*/grunt-*']});

    grunt.initConfig({
        clean: {
            www: ['www']
        },
        copy: {
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
        watch: {
            scripts: {
                files: ['src/scripts/**/*'],
                tasks: ['copy:scripts']
            },
            partials: {
                files: ['src/partials/**/*', 'scr/index.html'],
                tasks: ['copy:partials']
            }
        }
    });


    grunt.registerTask('default', ['clean', 'copy', 'watch']);
};