'use strict'

const compareFunc = require('compare-func')
const Q = require('q')
const readFile = Q.denodeify(require('fs').readFile)
const resolve = require('path').resolve

module.exports = Q.all([
	readFile(resolve(__dirname, './templates/template.hbs'), 'utf-8'),
	readFile(resolve(__dirname, './templates/header.hbs'), 'utf-8'),
	readFile(resolve(__dirname, './templates/commit.hbs'), 'utf-8')
])
	.spread((template, header, commit, footer) => {
		const writerOpts = getWriterOpts()

		writerOpts.mainTemplate = template
		writerOpts.headerPartial = header
		writerOpts.commitPartial = commit
		writerOpts.footerPartial = ''

		return writerOpts
	})

function beautify(commitMessage, context) {
	if (typeof commitMessage !== 'string') {
		return commitMessage;
	}
	if (commitMessage.length < 2) {
		return commitMessage;
	}
	let url = context.repository
		? `${context.host}/${context.owner}/${context.repository}`
		: context.repoUrl
	if (url) {
		url = `${url}/issues/`
		// Issue URLs.
		commitMessage = commitMessage.replace(/#([0-9]+)/g, (_, issue) => {
			issues.push(issue)
			return `[#${issue}](${url}${issue})`
		})
	}
	if (context.host) {
		// User URLs.
		commitMessage = commitMessage.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
			if (username.includes('/')) {
				return `@${username}`
			}

			return `[@${username}](${context.host}/${username})`
		})
	}

	return commitMessage
}

function getWriterOpts() {
	return {
		transform: (commit, context) => {
			let body = '-';

			if (commit.type !== 'release') {
				return;
			}

			if (typeof commit.body !== 'string' || commit.body.length === 0) {
				return commit;
			}
			let bodyLines = commit.body.split(/\r\n|\n|\r/);
			bodyLines.map(line => beautify(line, context));
			commit.body = bodyLines;

			return commit
		},
		groupBy: false,
		commitGroupsSort: false,
		commitsSort: false,
		noteGroupsSort: false,
		notesSort: false
	}
}
