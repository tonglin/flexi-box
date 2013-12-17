/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
	// Global variable
	var showItems = 0;
	var showLenth = 0;
	var arrowBtn;
	var allItemes;
	var item_width;
	var totalLenth;
	var arrowPosition;
	var left_indent;
	var animateSpeed;
	var parentId;

	function arrowSetting(arrowPosition_){
		arrowPosition = arrowPosition_;
		if(arrowPosition == 'default'){
			if(arrowBtn == '1'){
				if(allItemes > showItems){
					jQuery(parentId + '.pre').css('opacity','0.4');
					jQuery(parentId + '.pre').disabled = true;
					jQuery(parentId + '.pre').css('cursor','default');
				}else {
					jQuery(parentId + '.pre').css('opacity','0.4');
					jQuery(parentId + '.pre').disabled = true;
					jQuery(parentId + '.pre').css('cursor','default');
					jQuery(parentId + '.next').css('opacity','0.4');
					jQuery(parentId + '.next').disabled = true;
					jQuery(parentId + '.next').css('cursor','default');
				}
			} else if (arrowBtn == '0'){
				if(allItemes == showItems){
					jQuery(parentId + '.pre').hide();
					jQuery(parentId + '.next').hide();
				}else {
					jQuery(parentId + '.pre').hide();
				}
			}
		} else if (arrowPosition == 'pre') {
			if(allItemes > showItems){
				if(arrowBtn == '1'){
					jQuery(parentId + '.next').css('opacity','1');
					jQuery(parentId + '.next').disabled = false
					jQuery(parentId + '.next').css('cursor','pointer');

					if(left_indent == 0 || left_indent > 0){
						jQuery(parentId + '.pre').css('opacity','0.4');
						jQuery(parentId + '.pre').css('cursor','default');
						jQuery(parentId + '.pre').disabled = true;
					}else if(left_indent != 0 || left_indent < 0 ) {
						jQuery(parentId + '.pre').css('opacity','1');
						jQuery(parentId + '.pre').disabled = false;
					}
				} else if (arrowBtn == '0'){
					jQuery(parentId + '.next').show();
					jQuery(parentId + '.next').css('cursor','pointer');

					if(left_indent == 0 || left_indent > 0){
						jQuery(parentId + '.pre').hide();
					}else if(left_indent != 0 || left_indent < 0 ) {
						jQuery(parentId + '.pre').show();
					}
				}
			}
		} else if (arrowPosition == 'next') {
			if(allItemes > showItems){
				if (arrowBtn == '1') {
					jQuery(parentId +'.pre').css('opacity','1');
					jQuery(parentId + '.pre').disabled = false;
					jQuery(parentId + '.pre').css('cursor','pointer');

					if(left_indent == showLenth+item_width || left_indent < showLenth){
						jQuery(parentId + '.next').css('opacity','0.4');
						jQuery(parentId + '.next').disabled = true;
						jQuery(parentId + '.next').css('cursor','default');
					}else if(left_indent > showLenth ) {
						jQuery(parentId + '.next').css('opacity','1');
						jQuery(parentId + '.next').disabled = false;
						jQuery(parentId + '.next').css('cursor','pointer');
					}
				} else if (arrowBtn == '0') {
					jQuery(parentId + '.pre').show();
					jQuery(parentId + '.pre').css('cursor','pointer');

					if(left_indent == showLenth+item_width || left_indent < showLenth){
						jQuery(parentId + '.next').hide();
					}else if(left_indent > showLenth ) {
						jQuery(parentId + '.next').show();
						jQuery(parentId + '.next').css('cursor','pointer');
					}
				}
			}// end if (allItemes > showItems)
		}
	}// end arrowSetting function

	// Main function
	jQuery.fn.jQcarousel = function( options ) {
		//Main function variable
		parentId = '#'+(jQuery('.jQcarousel-inner').parent().attr('id'))+' ';
		allItemes = jQuery(parentId + '.jQcarousel-ul li').length; //count elements
		item_width = jQuery(parentId + '.jQcarousel-ul li').outerWidth(true); //get width of element with padding and margin
		totalLenth = allItemes * item_width;
		jQuery(parentId + '.jQcarousel-ul').css('left','0');

		// Default settings
		var settings = jQuery.extend({
			showItems : 3,
			arrowBtn : 1,
			animateSpeed: 1000
		}, options);

		this.each( function() {
			if ( settings.showItems ) {
				showItems = settings.showItems;
				showLenth = ((showItems-1) * item_width) - totalLenth;
			}
			if(settings.arrowBtn){
				arrowBtn = settings.arrowBtn;
				arrowSetting('default');
			}
			if(settings.animateSpeed){
				animateSpeed = settings.animateSpeed;
			}
		});

		jQuery(parentId + '.pre').bind('click', function(){
			left_indent = parseInt(jQuery(parentId + '.jQcarousel-ul').css('left')) + item_width;
			arrowSetting('pre');
			if(left_indent - item_width < 0){
				jQuery(parentId +'.jQcarousel-ul:not(:animated)').animate({
					'left' : left_indent
				}, animateSpeed);
			}
		});

		jQuery(parentId + '.next').bind('click', function(){
			left_indent = parseInt(jQuery(parentId + '.jQcarousel-ul').css('left')) - item_width;
			arrowSetting('next');
			if(left_indent > showLenth) {
				jQuery(parentId + '.jQcarousel-ul:not(:animated)').animate({
					'left':left_indent
				},animateSpeed);
			}
		});
	}//end of plugin function

}(jQuery));