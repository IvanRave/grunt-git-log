module.exports = function (grunt) {

	var dateFormat = require('dateformat');

	grunt.registerTask("gitlog", "Output git commit messages between given dates.", function () {

		this.requiresConfig('gitlog');

		var config = grunt.config.get('gitlog'),
		done = this.async(),
		afterDate,
		beforeDate,
		dest,
		gitArgs = ['log', '--pretty=format:"%B%n"', '--date-order', '--no-merges'];

    if (config) {
      var opts = config.options;
      if (opts){
        afterDate = opts.afterDate || new Date(Date.now() - (1000 * 60 * 60 * 24)),
        beforeDate = opts.beforeDate || new Date(),
        if (opts.dest){
          dest = grunt.template.process(opts.dest);
        }
      }
    }

		gitArgs.push('--after="' + dateFormat(afterDate, "isoDateTime") + '"');

		gitArgs.push('--before="' + dateFormat(beforeDate, "isoDateTime") + '"');

		grunt.log.writeln("Executing command: git " + gitArgs.join(' ') + "\n");

		grunt.util.spawn({
			cmd : 'git',
			args : gitArgs
		}, function (err, result) {
			if (err) {
				grunt.log.error(err);
				return done(false);
			}

			if (dest !== undefined) {
				grunt.file.write(dest, result);
				grunt.log.ok('Git log written to ' + dest);

			} else {
				grunt.log.write(result);
			}

			done();
		});
	});

};
