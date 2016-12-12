/*
* adapt-diffuseAssessment
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define(function(require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var quicknav = ComponentView.extend({
        preRender: function() {
            this.setCompletionStatus();
        },

        postRender: function() {
            this.setReadyStatus();
        }
    });

    Adapt.register("quicknav", quicknav);

    return quicknav;
});
