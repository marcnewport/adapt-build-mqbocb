define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ThemeBlock = require('theme/adapt-contrib-vanilla/js/theme-block');

	// Block View
	// ==========

	Adapt.on('blockView:postRender', function(view) {
		var theme = view.model.get('_theme');

		if (theme) {
			new ThemeBlock({
				model: new Backbone.Model({
					_themeBlockConfig: theme
				}),
				el: view.$el
			});
		}
	});

    Adapt.on('menuView:ready', function(view) {

        var globals = view.model.get('_globals');

        // Insert a background image on the menu
        view.$el.prepend($('<img/>').addClass('menu-background').attr({
            src: globals._menu._boxmenu.graphic.large,
            alt: ''
        }));

        // TODO : remove /////////////
        // Disable empty topics for p101
        $('button').on('click', function(e) {
            if ($(this).parents('.menu-item').hasClass('disabled')) {
                return false;
            }
        });
        ///////////////////////////
    });

    Adapt.on('popup:opened', function(popup) {
        if (popup) {
            var $component = $(popup.context);
            var $popup = $component.find('.hotgraphic-popup');

            // Check if component needs to position popup over button
            if ($component.hasClass('hotgraphic-position-popup')) {
                // Calculate the the margin needed to position the popup over the button
                var item = $popup.get(0).classList[1];
                var $button = $component.find('button.'+ item);
                var buttonTop = $button.position().top;
                var popupHeight = $popup.height();
                var marginTop = buttonTop - (popupHeight / 2);
                var graphicHeight = $component.find('.hotgraphic-graphic').height();

                // Set some boundaries
                if (marginTop < 0) {
                    marginTop = 0;
                }
                else if ((marginTop + popupHeight) > graphicHeight) {
                    marginTop = graphicHeight - popupHeight;
                }

                $popup.css({
                    marginTop: marginTop +'px'
                });
            }

            // Add faux shadow
            if ($component.hasClass('hotgraphic-component')) {
              var $shadow = $('#hotgraphic-shadow');
              $shadow.removeClass('display-none').on('click', function() {
                $shadow.addClass('display-none').off('click');
                $popup.get(0).style.display = 'none';
              });
            }
        }
    });

    Adapt.on('popup:closed', function(popup) {
        if (popup) {
          // Remove faux shadow
          var $component = $(popup.context);
          if ($component.hasClass('hotgraphic-component')) {
            $('#hotgraphic-shadow').addClass('display-none');
          }
        }
    })


});
