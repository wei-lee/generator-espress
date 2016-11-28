'use strict';

import path from 'path';
//import chai from 'chai';
import escape from 'escape-html';
//import pathExists from 'path-exists';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

const OPTS = {
  projectName: 'test project',
  description: 'this is a test project',
  githubName: 'thekelvinliu',
  buildDir: 'custom_dir'
};
const NAME = 'test-project';

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
        'src/config.js',
        'src/controllers/index.js',
        'src/controllers/extras.js',
        'src/helpers/logger.js',
        'src/models/index.js',
        'src/models/movie.js'
      ]);
    });
  });

  describe('files', () => {
    it('have no templating syntax', () => {
      assert.noFileContent([
        ['.gitignore', '<%= '],
        ['Gruntfile.js', '<%= '],
        ['LICENSE', '<%= '],
        ['package.json', '<%= '],
        ['README.md', '<%= '],
        ['README.md', '<%- '],
        ['src/controllers/index.js', '<%= ']
      ]);
    });

    it('are correctly templated', () => {
      assert.fileContent([
        ['.gitignore', OPTS.buildDir],
        ['LICENSE', OPTS.githubName],
        ['README.md', `# ${NAME}`],
        ['README.md', OPTS.description],
        ['src/controllers/index.js', `title: '${NAME}'`]
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
