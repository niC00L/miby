var appFiles = ['public/js/app.js', 'public/js/pixiSetup.js', 'public/js/levelGenerator.js', 'public/js/levelGeneratorOperations.js'];

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'public/js/miby.min.js': appFiles
                }
            }
        },
        watch: {
            grunt: {files: ['Gruntfile.js']},
            client: {
                files: appFiles,
                tasks: ['build']
            }
        },
        jshint: {
          all: appFiles,
          strict: true
        }
    });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['jshint', 'uglify']);
    grunt.registerTask('default', ['watch']);
};