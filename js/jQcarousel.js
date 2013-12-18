/* 
 * This jQcarousel plugin is an jQuery plugin build on version 1.9.1
 * @ copy right 2013 bellow GPL licence
 * Author Tonglin CHHUN
 * Email : https://www.chhun.tonglin@gmail.com
 * facebook : https://www.facebook.com/atong.lin.5
 */
(function(flexi) {
	var defaultConfiguration = {"animationSpeed": "1000", "arrowOption": "enable", "showItems": "3"};
	var settings;


	function settingsToJson(settings) {
		if (settings !== '' && settings !== undefined) {
			if (settings.substr(-1) === ";") {settings = settings.slice(0, -1);}
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

//	function main
	flexi.fn.felxiCarousel = function(options) {
		return this.each(function() {
			//Get settings from file html as string and convert it to Json format
			var getSettings = flexi(this).attr('data-settings');
			settings = settingsToJson(getSettings);

			var showItems = flexi(this).attr('data-configuration');
			var arrowOption = flexi(this).attr('data-arrow');
			var allItems = flexi(this).children().children().children().length;

			flexi(this).children().children('.jQcarousel-ul').css('left', '0');

			//Default option for arrow button
			if (showItems >= allItems) {
				if (arrowOption == 'disable') {
					flexi(this).children('.pre').hide();
					flexi(this).children('.next').hide();
				} else if (arrowOption == 'visible') {
					flexi(this).children('.pre').children().css('opacity', '0.4');
					flexi(this).children('.pre').children().css('cursor', 'default');
					flexi(this).children('.next').children().css('opacity', '0.4');
					flexi(this).children('.next').children().css('cursor', 'default');
				}
			} else if (showItems < allItems) {
				if (arrowOption == 'disable') {
					flexi(this).children('.pre').hide();
					flexi(this).children('.next').css('cursor', 'pointer');
				} else if (arrowOption == 'visible') {
					flexi(this).children('.pre').children().css('opacity', '0.4');
					flexi(this).children('.pre').children().css('cursor', 'default');
					flexi(this).children('.next').children().css('cursor', 'pointer');
				}
			}

			//Action click on button arrow left and arrow right
			var pre = flexi(this).children('div.pre');
			var next = flexi(this).children('div.next');
			pre.click(goLeft);
			next.click(goRight);
		});
	}

//animation to left or arrow left action
	function goLeft() {
		//Calculate show length aviable
		var showItems = flexi(this).parent().attr('data-items');
		var arrowOption = flexi(this).parent().attr('data-arrow');
		var allItems = flexi(this).parent().children().children().children().length;
		var item_width = flexi(this).siblings().children().children().outerWidth(true);
		var left_indent = parseInt(flexi(this).parent().children('.jQcarousel-inner').children('.jQcarousel-ul').css('left')) + item_width;

		var totalLenth = allItems * item_width;
		var showLenth = ((showItems - 1) * item_width) - totalLenth;

		if (allItems > showItems) {
			if (arrowOption == 'visible') {
				flexi(this).parent().children('.next').children().css('opacity', '1');
				flexi(this).parent().children('.next').children().disabled = false
				flexi(this).parent().children('.next').children().css('cursor', 'pointer');

				if (left_indent == 0 || left_indent > 0) {
					flexi(this).children().css('opacity', '0.4');
					flexi(this).children().css('cursor', 'default');
					flexi(this).children().disabled = true;
				} else if (left_indent != 0 || left_indent < 0) {
					flexi(this).children().css('opacity', '1');
					flexi(this).children().disabled = false;
				}
			} else if (arrowOption == 'disable') {
				flexi(this).parent().children('.next').show();
				flexi(this).parent().children('.next').css('cursor', 'pointer');

				if (left_indent == 0 || left_indent > 0) {
					flexi(this).hide();
				} else if (left_indent != 0 || left_indent < 0) {
					flexi(this).show();
				}
			}
		}

		//Animation to left
		if (left_indent - item_width < 0) {
			flexi(this).siblings().children(':not(:animated)').animate({
				'left': left_indent
			}, 1000);
		}
	}

//animation to right or arrow right action
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
})(jQuery);