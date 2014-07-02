module.exports = function (grunt) {

	var gitLogLib = require('./git-log-lib');

	grunt.registerTask("gitlog", "Output git commit messages between given dates.", function () {
    this.requiresConfig('gitlog');
    
    var config = grunt.config.get('gitlog');
    
    var done = this.async()
    
		gitLogLib.init(config, done, grunt);
	});
};
