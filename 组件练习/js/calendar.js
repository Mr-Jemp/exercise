(function($){
	var setting = {
		week:['日','一','二','三','四','五','六'],
		connector:[' / ',' / '],
		direction:["prev","next"]
	}
	
	
	var $parent = null;
	var num = 0;
	
	function calendar(obj={}){
		
		setting = $.extend(setting,obj);
		
		$parent = this;
		createHtml();
		setTime();
		createLi();
		quiryMonth();
	}
	
	function createHtml(){
		var div = $('<div class="wrap">');
		var html = '<h2 class="big-time"></h2>'+
				'<p class="small-time">2017 / 07 / 24，&ensp;星期&ensp;四</p>'+
				'<ul class="date">'+
					'<li class="left">'+
						'<span class="year">2017年07月</span>'+
					'</li>'+
					'<li class="right">'+
						'<span class="prev">prev</span>&ensp;&ensp;<span class="next">next</span>'+
					'</li>'+
				'</ul>'+
				'<ul class="list">'
					for(var i=0;i<setting.week.length;i++){
						html += '<li>'+setting.week[i]+'</li>';
					}
				html += '</ul>'+
				'<ul class="num">'+
					
				'</ul>'+
			'</div>';
		div.append(html);
		$parent.append(div);
	}
	
	function setTime(){
		function time(){
			var myDate = new Date();
			var h = myDate.getHours();
			var miu = myDate.getMinutes();
			var s = myDate.getSeconds();
			var y = myDate.getFullYear();
			var mon = myDate.getMonth()+1;
			var d = myDate.getDate();
			var day = myDate.getDay();
			
			var str1 = '';
			var str2 = '';
			var str3 = '';
			
			var bigTime = $parent.find(".big-time");
			var smallTime = $parent.find(".small-time");
			var right = $parent.find(".date .right");
			var prev = right.find(".prev");
			var next = right.find(".next");
			
			
			str1 = zeroTime(h) + ' : ' + zeroTime(miu) + ' : ' + zeroTime(s);
			str2 = y + setting.connector[0] + zeroTime(mon) + setting.connector[1] + zeroTime(d) + '，&ensp;星期&ensp;' + setting.week[day];

			
			bigTime.html(str1);
			smallTime.html(str2);
			
			prev.html(setting.direction[0]);
			next.html(setting.direction[1]);
		}
		time();
		setInterval(time,1000);
	}
	
	function zeroTime(time){
		return time > 9 ? time : '0' + time;
	}
	
	
	function createLi(){
		var list = $parent.find('.num');
		var year = $('.date .year');
		list.html('');
		
		/*获取上个月的天数*/
		var myDate = new Date();
		myDate.setMonth(myDate.getMonth()+num);
		myDate.setDate(0);
		var prevDate = myDate.getDate();
		
		/*获取当前月一号对应的是星期几*/
		var myDate = new Date();
		myDate.setMonth(myDate.getMonth()+num);
		
		var y = myDate.getFullYear();
		var mon = myDate.getMonth()+1;
		
		myDate.setDate(1);
		var day = myDate.getDay();
		
		/*生成上月的li*/
		for(var i=(prevDate-day);i<prevDate;i++){
			var li = $('<li>'+(i+1)+'</li>');
			li.addClass('gray');
			list.append(li);
		}
		
		/*动态改变年月*/
		year.html(y + '年' + zeroTime(mon) + '月');
		
		
		/*生成当前月份li*/
		var myDate = new Date();
		var nowDay = myDate.getDate();//获取当前月是第几号，便于给当前号添加选中类名
		
		myDate.setMonth(myDate.getMonth()+1+num);//将月份设置为下一个月
		myDate.setDate(0);//设置为零表示上一个月，这里代表当前月，因为前面将月份设置为下一个月
		var nowDate = myDate.getDate();//保存当前月的天数
		
		for(var i=0;i<nowDate;i++){
			var li = $('<li>'+(i+1)+'</li>');
			if(i == nowDay-1 && num == 0){
				li.addClass('active');
			}
			list.append(li);
		}
		
		/*生成下个月的li*/
		var nextDate = 42 - list.find('li').length;
		for(var i=0;i<nextDate;i++){
			var li = $('<li>'+(i+1)+'</li>');
			li.addClass('gray');
			list.append(li);
		}
	}
	
	
	function quiryMonth(){
		var prev = $('.date .right .prev');
		var next = $('.date .right .next');
		
		prev.on('click',function(ev){
			num--;
			createLi();
		});
		
		next.on('click',function(){
			num++;
			createLi();
		})
	}
	
	$.fn.extend({
		calendar
	})
	
	$(document).on('mousemove',function(ev){
		ev.preventDefault();
	});
})(jQuery)
