'use strict'

module.exports = {
  headerPattern: /^(release)(?:\((.*)\))?: (.*)$/,
  headerCorrespondence: [
    'type',
    'scope',
    'subject'
  ],
  noteKeywords: null,
  revertPattern: null,
  revertCorrespondence: []
}
