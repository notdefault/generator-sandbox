var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var flathtmlgenerator = yeoman.generators.Base.extend(
{
    initializing: function () 
    {
        this.pkg = require('../package.json');
    },

    prompting: function () 
    {
        var done = this.async();

        var prompts = [
            {
                name: 'storyId',
                message: 'What is the pivotal story ID?',
                default: '00000001'
            },
            {
                name: 'storyName',
                message: 'What is the Name/Title of your story?',
                default: 'My new Dev work'
            },
            {
                name: 'isMobile',
                message: 'Do you want a mobile device sandbox?',
                default: 'no'
            }
        ];

        this.prompt(prompts, function (props) 
        {
            this.siteTitle = props.siteTitle;
            done();
        }.bind(this));
    },


    files: function (){

        this.isMobile = ( this.isMobile == "yes" || this.isMobile == "y" ) ? true : false

        var template = '',
            context = 
            {     storyId: this.storyId
                , storyName: this.storyName
                , appName: 'Sprint'
            };

        template = ( this.isMobile ) ? 'mobile' : 'wired';

        this.template('www/_'+template+'Index.html', 'whitebox/stories/'+context.storyId+'/index.html', context);
    },

    end: function () 
    {

    }
});

module.exports = flathtmlgenerator;
