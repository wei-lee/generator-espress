'use strict';

import path from 'path';
//import chai from 'chai';
import escape from 'escape-html';
//import pathExists from 'path-exists';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

const OPTS = {
  projectName: 'fh-test',
  description: 'this is a test project',
  githubName: 'thekelvinliu',
  buildDir: 'custom_dir'
};
const NAME = 'fh-test';

describe('allTests', () => {
  before(done => {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts(OPTS)
      .on('end', done);
  });

  describe('generator', () => {
    it('can be required', () => {
      require('../app');
    });

    it('creates correct files', () => {
      assert.file([
        '.babelrc',
        '.eslintrc.json',
        '.gitignore',
        'LICENSE',
        'README.md',
        'Gruntfile.js',
        'package.json',
        'src/app.js',
        'config/dev.json',
        'src/helpers/logger.js',
        'src/helpers/validation.js',
        'src/endpoints/http/index.js',
        'src/endpoints/http/error.js',
        'src/endpoints/http/sys.js',
        'scripts/install.sh',
        'scripts/postinstall.sh',
        'scripts/fh-test-launcher.sh',
        'scripts/fh-test'
      ]);
    });
  });

  describe('files', () => {
    it('have no templating syntax', () => {
      assert.noFileContent([
        ['.gitignore', '<%= '],
        ['LICENSE', '<%= '],
        ['package.json', '<%= '],
        ['README.md', '<%= '],
        ['README.md', '<%- ']
      ]);
    });

    it('are correctly templated', () => {
      assert.fileContent([
        ['.gitignore', OPTS.buildDir],
        ['LICENSE', OPTS.githubName],
        ['README.md', `# ${NAME}`],
        ['README.md', OPTS.description]
      ]);
      assert.jsonFileContent('package.json', {
        name: NAME,
        description: escape(OPTS.description),
        author: OPTS.githubName,
        repository: `${OPTS.githubName}/${NAME}`
      });
    });
  });

  describe('git', () => {
    it('directory has .git', () => {
      assert.file([
        '.git/HEAD',
        '.git/config',
        '.git/description'
      ]);
    });
  });

});
