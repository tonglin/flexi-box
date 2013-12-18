/* 
 * This jQcarousel plugin is an jQuery plugin build on version 1.9.1
 * @ copy right 2013 bellow GPL licence
 * Author Tonglin CHHUN
 * Email : https://www.chhun.tonglin@gmail.com
 * facebook : https://www.facebook.com/atong.lin.5
 */
(function(flexi) {
	var defaultConfiguration = {"animationSpeed": "1000", "arrowOption": "show", "showItems": "3"};
	/**
	 * 
	 * @param {type} configuration
	 * @returns {_L8.defaultConfiguration|String}
	 */
	function getConfigurationToJson(settings) {
		if (settings !== '' && settings !== undefined) {
			if (settings.substr(-1) === ";") {
				settings = settings.slice(0, -1);
			}
			settings = '{\"' + settings.replace(/:/gi, "\":\"").replace(/;/gi, "\",\"").replace(/\s+/g, '') + '\"}';
			settings = flexi.parseJSON(settings);
			if (settings.animationSpeed === undefined) {
				settings["animationSpeed"] = defaultConfiguration.animationSpeed;
			}
			if (settings.arrowOption === undefined) {
				settings["arrowOption"] = defaultConfiguration.arrowOption;
			}
			if (settings.showItems === undefined) {
				settings["showItems"] = defaultConfiguration.showItems;
			}
		}
		else {
			settings = defaultConfiguration;
		}
		return settings;
	}

	function defaultSetting(configuration, This, arrowPlace) {
		This = This;
		arrowPlace = arrowPlace;
		//Default option for arrow button
		if (arrowPlace === 'default') {
			This.children().children('.jQcarousel-ul').css('left', '0');
			if (parseInt(configuration.showItems) >= configuration.allItems) {
				if (configuration.arrowOption === 'hide') {
					This.children('.pre').hide();
					This.children('.next').hide();
				} else if (configuration.arrowOption === 'show') {
					This.children('.pre').css('opacity', '0.4');
					This.children('.pre').css('cursor', 'default');
					This.children('.next').css('opacity', '0.4');
					This.children('.next').css('cursor', 'default');
				}
			} else if (parseInt(configuration.showItems) < configuration.allItems) {
				if (configuration.arrowOption === 'hide') {
					This.children('.pre').hide();
					This.children('.next').css('cursor', 'pointer');
				} else if (configuration.arrowOption === 'show') {
					This.children('.pre').css('opacity', '0.4');
					This.children('.pre').css('cursor', 'default');
					This.children('.next').css('cursor', 'pointer');
				}
			}
		}
		//default configuration for goLeft action
		if (arrowPlace === 'goLeft') {
			if (parseInt(configuration.allItems) > parseInt(configuration.showItems)) {
				if (configuration.arrowOption === 'show') {
					This.parent().children('.next').children().css('opacity', '1');
					This.parent().children('.next').children().disabled = false
					This.parent().children('.next').children().css('cursor', 'pointer');

					if (configuration.leftIndent == 0 || configuration.leftIndent > 0) {
						This.children().css('opacity', '0.4');
						This.children().css('cursor', 'default');
						This.children().disabled = true;
					} else if (configuration.leftIndent != 0 || configuration.leftIndent < 0) {
						This.children().css('opacity', '1');
						This.children().disabled = false;
					}
				} else if (configuration.arrowOption === 'hide') {
					This.parent().children('.next').show();
					This.parent().children('.next').css('cursor', 'pointer');

					if (configuration.leftIndent == 0 || configuration.leftIndent > 0) {
						This.hide();
					} else if (configuration.leftIndent != 0 || configuration.leftIndent < 0) {
						This.show();
					}
				}
			}
		}

	}

	/**
	 * 
	 * animation to left or arrow left action
	 * @returns 
	 */
	function goLeft() {
		var This = flexi(this);
		var getConfiguration = This.parent().attr('data-configuration');
		var configuraltion = getConfigurationToJson(getConfiguration);
		var allItems = parseInt(This.parent().children().children().children().length);
		
		//Calculate show length aviable
		var itemWidth = parseInt(This.siblings().children().children().outerWidth(true));
		var leftIndent = parseInt(This.parent().children('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) + itemWidth;
		var totalLenth = parseInt(allItems * itemWidth);
		var showLenth = ((parseInt(configuraltion.showItems) - 1) * itemWidth) - totalLenth;
		configuraltion["allItems"] = allItems;
		configuraltion["itemWidth"] = itemWidth;
		configuraltion["leftIndent"] = leftIndent;
		configuraltion["totalLenth"] = totalLenth;
		configuraltion["showLenth"] = showLenth;
		defaultSetting(configuraltion, This, 'goLeft');
		//Animation to left
		if (leftIndent - itemWidth < 0) {
			This.siblings().children(':not(:animated)').animate({
				'left': leftIndent
			}, parseInt(configuraltion.animationSpeed));
		}
	}

	/**
	 * 
	 * Animation to right or arrow right action
	 * @returns 
	 */
	function goRight() {
		//Calculate show length aviable
		var showItems = flexi(this).parent().attr('data-items');
		var arrowOption = flexi(this).parent().attr('data-arrow');
		var allItems = flexi(this).parent().children().children().children().length;
		var item_width = flexi(this).siblings().children().children().outerWidth(true);
		var left_indent = parseInt(flexi(this).parent().children('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) - item_width;
		var totalLenth = allItems * item_width;
		var showLenth = ((showItems - 1) * item_width) - totalLenth;

		//Arrow setting
		if (showItems < allItems) {
			if (arrowOption == 'disable') {
				flexi(this).parent().children('.pre').show();
				if (left_indent == showLenth + item_width || left_indent < showLenth) {
					flexi(this).parent().children('.next').hide();
				} else if (left_indent > showLenth) {
					flexi(this).parent().children('.next').show();
					flexi(this).parent().children('.next').css('cursor', 'pointer');
				}
			} else if (arrowOption == 'visible') {
				flexi(this).parent().children('.pre').children().css('opacity', '1');
				flexi(this).parent().children('.pre').children().css('cursor', 'pointer');
				if (left_indent == showLenth + item_width || left_indent < showLenth) {
					flexi(this).parent().children('.next').children().css('opacity', '0.4');
					flexi(this).parent().children('.next').children().disabled = true;
					flexi(this).parent().children('.next').children().css('cursor', 'default');
				} else if (left_indent > showLenth && left_indent == showLenth) {
					flexi(this).parent().children('.next').children().css('opacity', '1');
					flexi(this).parent().children('.next').children().disabled = false;
					flexi(this).parent().children('.next').children().css('cursor', 'pointer');
				}
			}
		}
		//Animation to right
		if (left_indent > showLenth) {
			flexi(this).siblings().children(':not(:animated)').animate({
				'left': left_indent
			}, 1000);
		}
	}

	/**
	 * Main function
	 * 
	 * @param {type} options
	 * @returns {_L8.flexi.fn@call;each}
	 */
	flexi.fn.felxiCarousel = function(options) {
		return this.each(function() {
			//Get settings from file html as string and convert it to Json format
			var This = flexi(this);
			var getConfiguration = This.attr('data-configuration');
			var configuraltion = getConfigurationToJson(getConfiguration);
			var allItems = This.children().children().children().length;
			configuraltion["allItems"] = allItems;

			defaultSetting(configuraltion, This, 'default');
			//Action click on button arrow left and arrow right
			var pre = This.children('div.pre');
			var next = This.children('div.next');
			pre.click(goLeft);
			next.click(goRight);
		});
	}
})(jQuery);