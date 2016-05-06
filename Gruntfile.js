var appFiles = ['app/js/app.js', 'levelGenerator.js', 'levelGeneratorOperations.js'];

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'app/js/miby.min.js': appFiles
                }
            }
        },
        watch: {
            grunt: {files: ['Gruntfile.js']},
            client: {
                files: ['app/js/*.js'],
                tasks: ['build']
            }
        },
        jshint: {
          all: appFiles,
          strict: false
        }
    });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['jshint', 'uglify']);
    grunt.registerTask('default', ['watch']);
};