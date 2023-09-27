'use strict'

module.exports = {
  headerPattern: /^(release)(?:\((.*)\))?:(.*)$/,
  headerCorrespondence: [
    'type',
    'scope',
    'subject'
  ],
  fieldPattern: null,
  noteKeywords: null,
  revertPattern: /(?!)/,
  revertCorrespondence: []
}
