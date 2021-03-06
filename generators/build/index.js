(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        scaffold = {};

    module.exports = yeoman.generators.Base.extend({

        constructor: function() {
            yeoman.generators.Base.apply(this, arguments);

            this.option('skip-welcome');

            scaffold = require('../../scaffold')(this);
        },

        initializing: function() {
            if (!this.options['skip-welcome']) {
                scaffold.welcomeMessage('       Generating Build      ', 'Wait until build finish. I will create a zip file with all contents of your project. \nChoose below if this build means a new version and what type.');
            }
        },

        prompting: function() {
            var done = this.async(),
                prompts = [{
                    type: 'confirm',
                    name: 'bumpVersion',
                    message: 'This build will increase a version of your project?',
                    default: 0
                }, {
                    type: 'list',
                    name: 'bumpType',
                    message: 'What kind of version?',
                    choices: ['Just a fix (Ex: 0.0.1)', 'Minor Version (Ex: 0.1.0)', 'Major Version (Ex: 1.0.0)', 'Pre-release (Ex: 1.0.0-1)'],
                    default: 0,
                    when: function(answers) {
                        return answers.bumpVersion;
                    }
                }];

            this.prompt(prompts, function(props) {
                for(var item in props) {
                    this[item] = props[item];
                }

                scaffold.log(' \n Perfect! \n \n', 'yellow');

                done();
            }.bind(this));
        },

        writing: function() {
            if (this.bumpVersion) {
                var done = this.async(),
                    version = 'patch';

                if (this.bumpType === 'Minor Version (Ex: 0.1.0)') {
                    version = 'minor';
                } else if (this.bumpType === 'Major Version (Ex: 1.0.0)') {
                    version = 'major';
                } else if (this.bumpType === 'Pre-release (Ex: 1.0.0-1)') {
                    version = 'prerelease';
                }

                this.spawnCommand('grunt', ['bump:' + version]).on('exit', done);
            }
        },

        install: function() {
            var done = this.async();

            this.spawnCommand('grunt', ['build']).on('exit', done);
        },

        end: function() {
            scaffold.log('\n \n All done! Everything looks fine. Good job! \n \n', 'yellow');
        }

    });

})();
