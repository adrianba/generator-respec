'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ReSpec generator, the even more stark raving awesome way to start writing specs!'
    ));

    var prompts = [{
        name: 'title',
        message: 'What is the title of this specification?',
        default: 'Sample specification'
      },{
        name: 'shortName',
        message: 'What is the "short name" for the specification?',
        default: 'sample-spec'
      },{
        type: 'list',
        name: 'specStatus',
        message: 'What is the specification status?',
        choices: ['unofficial', 'ED', 'FPWD', 'WD', 'LC', 'CR', 'PR', 'REC', 'WG-NOTE', 'CG-DRAFT', 'CG-FINAL', 'base', 'PER', 'RSCND', 'NOTE', 'FPWD-NOTE', 'BG-DRAFT', 'BG-FINAL', 'IG-NOTE', 'Member-SUBM', 'Team-SUBM', 'XGR', 'draft-finding', 'finding', 'MO'],
        default: 'unofficial'
      },{
        name: 'editorName',
        message: 'What is the editor\'s name?',
        store: true
      },{
        name: 'editorUrl',
        message: 'What is the editor\'s URL (web site, mailto:, etc.)?',
        store: true
      },{
        name: 'editorCompany',
        message: 'What company does the editor work for?',
        store: true
      },{
        name: 'editorCompanyUrl',
        message: 'What is the URL for the company?',
        store: true
      }];

    this.prompt(prompts, function (props) {
      var config = { };
      config.shortName = props.shortName;
      config.specStatus = props.specStatus;
      var editor = { };
      editor.name = props.editorName;
      editor.url = props.editorUrl;
      editor.company = props.editorCompany;
      editor.companyURL = props.editorCompanyUrl;
      config.editors = [editor];

      var data = {
        title: props.title,
        shortname: config.shortName,
        editor: editor,
        respecConfig: JSON.stringify(config,null,4)
      };
      this.data = data;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.data
      );
      this.fs.copyTpl(
        this.templatePath('spec.html'),
        this.destinationPath('index.html'),
        this.data
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    this.npmInstall();
  }
});
