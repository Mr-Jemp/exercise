(function($){
	var setting = {
		header:['新闻','娱乐','影视','体育'],
		content:['腾总搞基','腾总跳脱衣舞','腾总去东莞','腾总蹦极']
	}
	
	var $parent = null;
	
	function tab(obj){
		
		setting = $.extend(setting,obj);
		
		$parent = this;
		createInput();
		createDiv();
		changeTab();
	}
	
	
	function changeTab(){
		var aInput = $('input');
		var aDiv = $parent.find("div");
		aInput.on('click',function(){
			$(this).addClass("active").siblings().removeClass('active');
			aDiv.eq($(this).index("input")).addClass('show').siblings().removeClass('show');
		})
	}
	
	function createInput(){
		for(var i=0;i<setting.header.length;i++){
			if(i == 0){
				var oInput = $('<input type="button" class="active" />');
				oInput.val(setting.header[i]);
			}else{
				var oInput = $('<input type="button" />');
				oInput.val(setting.header[i]);
			}
			$parent.append(oInput);
		}
	}
	
	function createDiv(){
		for(var i=0;i<setting.content.length;i++){
			if(i == 0){
				var oDiv = $('<div class="show"></div>');
				oDiv.html(setting.content[i]);
			}else{
				var oDiv = $('<div></div>');
				oDiv.html(setting.content[i]);
			}
			$parent.append(oDiv);
		}
	}
	
	
	$.fn.extend({
		tab:tab
	})
	
})(jQuery)
