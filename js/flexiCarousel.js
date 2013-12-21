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
	function configStringToJson(configs) {
		if (configs !== '' && configs !== undefined) {
			if (configs.substr(-1) === ";") {
				configs = configs.slice(0, -1);
			} //remove the last ';' from the config
			configs = '{\"' + configs.replace(/:/gi, "\":\"").replace(/;/gi, "\",\"").replace(/\s+/g, '') + '\"}';
			configs = flexi.parseJSON(configs);
			for (config in defaultConfiguration) {
				if (configs[config] === undefined) {
					configs[config] = defaultConfiguration[config];
				}
			}
		}
		else {
			configs = defaultConfiguration;
		}
		return configs;
	}
	/**
	 * 
	 * @param {type} configuration
	 * @param {type} This
	 * @param {type} arrowPlace
	 * @returns {undefined}
	 */
	function arrowSetting(configuration, arrowPlace) {
		var This = configuration.This;
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
					if (configuration.rightIndent == configuration.showLenth + configuration.itemWidth || configuration.rightIndent < configuration.showLenth) {
						This.hide();
					} else if (configuration.rightIndent > configuration.showLenth) {
						This.show();
						This.css('cursor', 'pointer');
					}
				} else if (configuration.arrowOption === 'show') {
					This.siblings('.pre').css('opacity', '1');
					This.siblings('.pre').css('cursor', 'pointer');
					if (configuration.rightIndent == configuration.showLenth + configuration.itemWidth || configuration.rightIndent < configuration.showLenth) {
						This.css('opacity', '0.4');
						This.disabled = true;
						This.css('cursor', 'default');
					} else if (configuration.rightIndent > configuration.showLenth && configuration.rightIndent == configuration.showLenth) {
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
		var configs = getConfig(This);
		arrowSetting(configs, 'goLeft');
		//Animation to left
		if (configs.leftIndent - configs.itemWidth < 0) {
			This.siblings().children(':not(:animated)').animate({
				'left': configs.leftIndent
			}, parseInt(configs.animationSpeed));
		}
	}

	/**
	 * 
	 * Animation to right or arrow right action
	 * @returns 
	 */
	function goRight() {
		var This = flexi(this);
		var configs = getConfig(This);
		arrowSetting(configs, 'goRight');
		//Animation to right
		if (configs.rightIndent > configs.showLenth) {
			This.siblings().children(':not(:animated)').animate({
				'left': configs.rightIndent
			}, parseInt(configs.animationSpeed));
		}
	}

	/**
	 * 
	 * @param {DOM object} currentObject
	 * @returns {config|Json}
	 */
	function getConfig(currentObject) {
		var This = currentObject;
		if (This.attr('class') === 'pre' || This.attr('class') === 'next') {
			var configs = configStringToJson(This.parent().attr('data-configuration'));
			configs["allItems"] = parseInt(This.parent().find('.jQcarousel-ul > li').length);
			configs["itemWidth"] = parseInt(This.siblings('.jQcarousel-inner').children().children().outerWidth(true));
			configs["rightIndent"] = parseInt(This.siblings('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) - configs.itemWidth;
			configs["leftIndent"] = parseInt(This.siblings('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) + configs.itemWidth;
			configs["totalLenth"] = parseInt(configs.allItems * configs.itemWidth);
			configs["showLenth"] = ((parseInt(configs.showItems) - 1) * configs.itemWidth) - configs.totalLenth;
		}
		else {
			var configs = configStringToJson(This.attr('data-configuration'));
			configs["allItems"] = parseInt(This.find('.jQcarousel-ul > li').length);
			configs["itemWidth"] = parseInt(This.children('.jQcarousel-inner').children().children().outerWidth(true));
		}
		configs["This"] = This;
		return configs;
	}

	/**
	 * 
	 * @param {Json} config_
	 * @param {DOM object} This
	 * @returns 
	 */
	function setConfig(configs) {
		var This = configs.This;
		This.children('.jQcarousel-inner').css('width', configs.showItems * configs.itemWidth);
	}
//
//	function slidShow() {
//		$("#slideshow > div:gt(0)").hide();
//		setInterval(function() {
//			$('#slideshow > div:first')
//					.fadeOut(1000)
//					.next()
//					.fadeIn(1000)
//					.end()
//					.appendTo('#slideshow');
//		}, 3000);
//	}

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
			var configs = getConfig(This);
			arrowSetting(configs, 'default');
			setConfig(configs);
			//Action click on button arrow left and arrow right
			var pre = This.children('div.pre');
			var next = This.children('div.next');
			pre.click(goLeft);
			next.click(goRight);

			//slidShow
//z			slidShow();
		});
	}
})(jQuery);