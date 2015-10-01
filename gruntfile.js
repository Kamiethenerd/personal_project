module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {

                separator: ''
            },
            dist: {
                // the files to concatenate
                src: ['public/src/gameLogic.js',
                    'public/src/leveling.js',
                    'public/src/battle.js',
                    'public/src/save.js'],
                // the location of the resulting JS file
                dest: 'public/scripts/fullGame.js'
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', [ 'concat']);
};