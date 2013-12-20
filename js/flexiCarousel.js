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
	/**
	 * 
	 * @param {type} configuration
	 * @param {type} This
	 * @param {type} arrowPlace
	 * @returns {undefined}
	 */
	function arrowSetting(configuration, This, arrowPlace) {
		This = This;
		arrowPlace = arrowPlace;
		//Default configuration for arrow button
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
		//default arrowconfiguration for goLeft action
		if (arrowPlace === 'goLeft') {
			if (parseInt(configuration.allItems) > parseInt(configuration.showItems)) {
				if (configuration.arrowOption === 'show') {
					This.siblings('.next').css('opacity', '1');
					This.siblings('.next').disabled = false
					This.siblings('.next').css('cursor', 'pointer');

					if (configuration.leftIndent == 0 || configuration.leftIndent > 0) {
						This.css('opacity', '0.4');
						This.css('cursor', 'default');
						This.disabled = true;
					} else if (configuration.leftIndent != 0 || configuration.leftIndent < 0) {
						This.css('opacity', '1');
						This.disabled = false;
					}
				} else if (configuration.arrowOption === 'hide') {
					This.siblings('.next').show();
					This.siblings('.next').css('cursor', 'pointer');

					if (configuration.leftIndent == 0 || configuration.leftIndent > 0) {
						This.hide();
					} else if (configuration.leftIndent != 0 || configuration.leftIndent < 0) {
						This.show();
					}
				}
			}
		}
		//defaulf arrow configuration for goRight action
		if (arrowPlace === 'goRight') {
			if (configuration.showItems < configuration.allItems) {
				if (configuration.arrowOption === 'hide') {
					This.siblings('.pre').show();
					if (configuration.leftIndent == configuration.showLenth + configuration.itemWidth || configuration.leftIndent < configuration.showLenth) {
						This.hide();
					} else if (configuration.leftIndent > configuration.showLenth) {
						This.show();
						This.css('cursor', 'pointer');
					}
				} else if (configuration.arrowOption === 'show') {
					This.siblings('.pre').css('opacity', '1');
					This.siblings('.pre').css('cursor', 'pointer');
					if (configuration.leftIndent == configuration.showLenth + configuration.itemWidth || configuration.leftIndent < configuration.showLenth) {
						This.css('opacity', '0.4');
						This.disabled = true;
						This.css('cursor', 'default');
					} else if (configuration.leftIndent > configuration.showLenth && configuration.leftIndent == configuration.showLenth) {
						This.css('opacity', '1');
						This.disabled = false;
						This.css('cursor', 'pointer');
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
		var configuration = getConfigurationToJson(getConfiguration);
		var allItems = parseInt(This.parent().children().children().children().length);

		//Calculate show length aviable
		var itemWidth = parseInt(This.siblings().children().children().outerWidth(true));
		var leftIndent = parseInt(This.parent().children('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) + itemWidth;
		var totalLenth = parseInt(allItems * itemWidth);
		var showLenth = ((parseInt(configuration.showItems) - 1) * itemWidth) - totalLenth;
		configuration["allItems"] = allItems;
		configuration["itemWidth"] = itemWidth;
		configuration["leftIndent"] = leftIndent;
		configuration["totalLenth"] = totalLenth;
		configuration["showLenth"] = showLenth;
		arrowSetting(configuration, This, 'goLeft');
		//Animation to left
		if (configuration.leftIndent - configuration.itemWidth < 0) {
			This.siblings().children(':not(:animated)').animate({
				'left': leftIndent
			}, parseInt(configuration.animationSpeed));
		}
	}

	/**
	 * 
	 * Animation to right or arrow right action
	 * @returns 
	 */
	function goRight() {
		var This = flexi(this);
		var getConfiguration = This.parent().attr('data-configuration');
		var configuration = getConfigurationToJson(getConfiguration);
		var allItems = parseInt(This.parent().children().children().children().length);

		//Calculate show length aviable
		var itemWidth = parseInt(This.siblings('.jQcarousel-inner').children().children().outerWidth(true));
		var leftIndent = parseInt(This.parent().children('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) - itemWidth;
		var totalLenth = parseInt(allItems * itemWidth);
		var showLenth = ((parseInt(configuration.showItems) - 1) * itemWidth) - totalLenth;
		configuration["allItems"] = allItems;
		configuration["itemWidth"] = itemWidth;
		configuration["leftIndent"] = leftIndent;
		configuration["totalLenth"] = totalLenth;
		configuration["showLenth"] = showLenth;
		arrowSetting(configuration, This, 'goRight');

		//Animation to right
		if (configuration.leftIndent > configuration.showLenth) {
			This.siblings().children(':not(:animated)').animate({
				'left': configuration.leftIndent
			}, parseInt(configuration.animationSpeed));
		}
	}
	
	/**
	 * 
	 * @param {DOM object} currentObject
	 * @returns {config|Json}
	 */
	function getConfig(currentObject) {
		var This = currentObject;
		var config = getConfigurationToJson(This.attr('data-configuration'));
		var allItems = This.children().children().children().length;
		config["allItems"] = allItems;
		
		return config;
	}

	/**
	 * 
	 * @param {Json} config_
	 * @param {DOM object} This
	 * @returns 
	 */
	function setConfig(config_, This) {
		var config = config_;
		var itemWidth = parseInt(This.children('.jQcarousel-inner').children().children().outerWidth(true));
		This.children('.jQcarousel-inner').css('width', config.showItems * itemWidth);
	}

	/**
	 * Main function
	 * 
	 * @param {type} options
	 * @returns 
	 */
	flexi.fn.felxiCarousel = function(options) {
		return this.each(function() {
			//Get settings from file html as string and convert it to Json format
			var This = flexi(this); //Get current object
			var config = getConfig(This);
			arrowSetting(config, This, 'default');
			setConfig(config, This);
			//Action click on button arrow left and arrow right
			var pre = This.children('div.pre');
			var next = This.children('div.next');
			pre.click(goLeft);
			next.click(goRight);
		});
	}
})(jQuery);