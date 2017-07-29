
(function($){
	
	let $parent = null;
	let setting = {
		week:['日','一','二','三','四','五','六'],
		links:['年','月','日'],
		direction:['←','→']
	}
	var num = 0;
	
	
	function clock(obj={}){
		
		setting = $.extend(setting, obj);
		$parent = this;
		createHtml();
		setHours();
		cerateLi();
		selectMon();
	}
	
	function createHtml(){
		let div = $('<div id="time">');
		let html = `
				<h1></h1>
				<span class="item2"></span>
				<div id="year-month">
					<span></span>
					<ul>
						<li></li>
						<li></li>
					</ul>
				</div>
				<ul class="qiyao">`;
				
				for(var i=0;i<setting.week.length;i++){
					html +='<li>'+setting.week[i]+'</li>';
				}
					
			html +=`	
				</ul>
				<ul class="day">
					
				</ul>
		`;
		div.html(html);
		$parent.append(div);
	}
	
	function setHours(){
		function time(){
			var data = new Date();
			var h = data.getHours();
			var m = data.getMinutes();
			var s = data.getSeconds();
			var y = data.getFullYear();
			var mon = data.getMonth()+1;
			var d = data.getDate();
			var day = data.getDay();
			var str = '';
			var str2 = '';
			
			var item1 = $parent.find('h1');
			var item2 = $parent.find('.item2');
			var lis = $parent.find('#year-month li');
			
			str = toTime(h)+':'+toTime(m)+':'+toTime(s);
			str2 = toTime(y)+setting.links[0]+toTime(mon)+setting.links[1]+toTime(d)+setting.links[2]+'   '+setting.week[day];
			
			lis.eq(0).html(setting.direction[0]);
			lis.eq(1).html(setting.direction[1]);
			//2018/08/08      星期：三
					
			item1.html(str);
			item2.html(str2);
		}
		
		time();
		setInterval(time,1000);
	}
	
	function cerateLi(){
		
		var list = $parent.find('.day');
		var span = $parent.find('#year-month span');
		list.html('');
		
		/*
			 获取上个月的天数
		 
		*/
		var data = new Date();
		
		data.setMonth(data.getMonth()+num);
		data.setDate(0);
		var prevDay = data.getDate();   //上个月的天数
		
		
		/*
		 	获取当前月1号对应的是星期几
		*/
		var data = new Date();
		data.setMonth(data.getMonth()+num);
		var y = data.getFullYear();
		var mon = data.getMonth()+1;
		data.setDate(1);
		var day = data.getDay();      //当前月1号对应的星期
		for(var i=(prevDay-day);i<prevDay;i++){
			var li = $('<li>'+(i+1)+'</li>');
			li.addClass('old');
			list.append(li);
		}
		
		
		/*
		 
		 * 设置动态的月份
		 */
		
		span.html(y+'年'+mon+'月');
		
		
		/*
		 	生产当前月的天数
		*/
		var data = new Date();
		var nowDay = data.getDate();        //获取今天的号数
		data.setMonth(data.getMonth()+1+num);
		data.setDate(0);
		var nowdata = data.getDate();       // 当前月的天数
		for(var i=0;i<nowdata;i++){
			var li = $('<li>'+(i+1)+'</li>');
			if(i == nowDay-1&&num==0){
				li.addClass('active');
			}
			list.append(li);
		}
		
		/*
		 	生产下个月的天数
		  
		*/
		var lastDay = 42 - list.find('li').length; 
		
		for(var i=0;i<lastDay;i++){
			var li = $('<li>'+(i+1)+'</li>');
			li.addClass('old');
			list.append(li);
		}
		
	}
	
	
	function selectMon(){
		var lis = $parent.find('#year-month li');
		
		lis.eq(0).on('click',function(){
			num--;
			cerateLi();
		});
		lis.eq(1).on('click',function(){
			num++;
			cerateLi();
		});
	}
	
	function toTime(n){
		return n>9?n:'0'+n;
	}
	$.fn.extend({
		clock
	})
	
})(jQuery)











