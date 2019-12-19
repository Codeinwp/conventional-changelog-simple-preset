/**
 * Default `releaseRules` rules for common commit formats, following conventions.
 *
 * @type {Array}
 */
module.exports = [
	{type: 'release', scope:'minor', release: 'minor'},
	{type: 'release', scope:'major', release: 'major'},
	{type: 'release', release: 'patch'},
	{type: 'feat', release: false},
	{type: 'fix', release: false},
	{type: 'perf', release: false},
];