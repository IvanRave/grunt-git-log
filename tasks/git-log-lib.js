var dateFormat = require('dateformat');

var cbkSpawn = function (grunt, done, dest, separator, err, result) {
	if (err) {
		grunt.log.error(err);
		return done(false);
	}

	if (dest !== undefined) {
		var listOfBodyOfCommit = result.toString().split(separator);

		var listOfTabBody = [];

		var maxTimeLength = 'time: 12h:34'.length;

		listOfBodyOfCommit.forEach(function (commitItem) {
			var timeIndex = commitItem.indexOf('time:');

			var timeStr;
			var mainStr;

			if (timeIndex >= 0) {
				timeStr = commitItem.substr(timeIndex, maxTimeLength);
				timeStr = timeStr.replace('time:', '').replace('h', '').trim();
				// Remove this part from the item (the time part - last part)
				mainStr = commitItem.substr(0, timeIndex);
			} else {
				mainStr = commitItem;
			}

			// Remove enters and trim the string
			mainStr = mainStr.replace(/\n/g, ' ').trim();

			if (mainStr) {
				listOfTabBody.push(mainStr + '\t' + (timeStr || 0));
			}
		});

		grunt.file.write(dest, listOfTabBody.join('\n'));
		grunt.log.ok('Git log written to ' + dest);

	} else {
		grunt.log.write(result);
	}

	done();
};

exports.init = function (config, done, grunt) {
	var separator = '==--==';
	// format:"%B%n"
	// format:%s#%b
	var logFormat = '%s\n%b' + separator;

	var afterDate,
	beforeDate,
	dest,
	gitArgs = ['log', '--pretty=format:' + logFormat, '--date-order', '--no-merges'];

	if (config) {
		var opts = config.options;
		if (opts) {
			afterDate = opts.afterDate || new Date(Date.now() - (1000 * 60 * 60 * 24));
			beforeDate = opts.beforeDate || new Date();
			if (opts.dest) {
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
	}, cbkSpawn.bind(null, grunt, done, dest, separator));
};

module.exports = exports;
