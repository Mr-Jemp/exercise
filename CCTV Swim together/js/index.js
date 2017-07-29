

function fnLoad(){
	var welcome = id('welcome');
	var index = id('index');
	var num = 0;
	var arr = ['img/tree.jpg','img/title.png','img/title2.png','img/logo.png','img/cloud.png','img/shake.png'];
	var onBg = false;
	var timer = null;
	var startTime = new Date().getTime();
	var onTime = false;
	
	for(var i=0;i<arr.length;i++){
		var img = new Image();
		img.src = arr[i];
		img.onload = function(){
			num++;
			if(num == arr.length){
				onBg = true;
			}
		}
	}
	
	timer = setInterval(function(){
		if((new Date().getTime() - startTime)>6000){
			onTime = true;
		}
		
		if(onTime&&onBg){
			clearInterval(timer);
			welcome.style.opacity = 0;
			addClass(index,'showPage');
		}
		
	},1000)
	
	bind(welcome,'transitionend',end);
	bind(welcome,'webkitTransitionEnd',end);
	
	function end(){
		removeClass(welcome,'showPage');
		
		
		fnIndex();
		
	}
}


function fnIndex(){
	var list = id('list');
	var index = id('index');
	var news = id('news');
	var nav = index.getElementsByClassName('nav')[0];
	var newsClue = index.getElementsByClassName('news-clue')[0];
	var em = newsClue.getElementsByTagName("em")[0];
	var aA = nav.getElementsByTagName('a');
	var lis = list.children;
	var iW = view().w;
	var num = 0;
	var timer = null;
	var now = 0;
	var startX = null;
	var tranlateX = 0;
	
	
	
	autoplay();
	fnStar();
	
	
	function autoplay(){
		timer = setInterval(function(){
			num++;
			num = num%lis.length;
			now = -num*iW;
			list.style.transform = list.style.webkitTransform = 'translateX('+now+'px)';
			
			tab();
			
		},2500)
	}
	
	bind(list,'touchstart',start);
	bind(list,'touchmove',move);
	bind(list,'touchend',end);
	
	function start(ev){
		ev = ev.changedTouches[0];
		list.style.transition = 'none';
		clearInterval(timer);
		startX = ev.pageX;
		
		
	}
	
	function move(ev){
		ev = ev.changedTouches[0];
		var dis = ev.pageX - startX;
		tranlateX = dis;
		list.style.transform = list.style.webkitTransform = 'translateX('+(now+dis)+'px)';
		
	}
	
	function end(){
		now = now + tranlateX;
		
		num = -Math.round(now/iW);
		
		if(num>=lis.length-1){
			num = lis.length-1;
		}
		if(num<=0){
			num = 0;
		}
		
		list.style.transition = '.5s';
		list.style.transform = list.style.webkitTransform = 'translateX(-'+(num*iW)+'px)';
		now = -num*iW;
		
		
		tab();
		autoplay();
		
	}
	
	function tab(){
		for(var i=0;i<aA.length;i++){
			removeClass(aA[i],'active');
		}
		addClass(aA[num],'active');
	}
	
	bind(newsClue,'touchshart',function(){
		alert()
//		removeClass(index,'showPage');
//		addClass(news,'showPage');
	})
	
	
}


function fnStar(){
	var index = id('index');
	var mask = id('mask');
	var btn = index.getElementsByClassName('btn')[0];
	var info = index.getElementsByClassName('info')[0];
	var score = index.getElementsByClassName('score')[0];
	var tag = index.getElementsByClassName('tag')[0];
	var lis = score.getElementsByTagName('li');
	var arr = ['太差','没有想象中差','一般','良好','棒极了'];
	
	for(var i=0;i<lis.length;i++){
		(function(index){
			var aA = lis[index].getElementsByTagName('a');
			var oInput = lis[index].getElementsByTagName('input')[0];
			for(var j=0;j<aA.length;j++){
				aA[j].index = j;
				bind(aA[j],'touchstart',function(){
					for(var k=0;k<aA.length;k++){
						if(this.index>=aA[k].index){
							aA[k].style.backgroundPosition = '0 0';
						}else{
							aA[k].style.backgroundPosition = '-38px 0';
						}
					}
					oInput.value = arr[this.index];
					addClass(btn,'submit');
				})
			}
		})(i)	
	}
	
	
	bind(btn,'touchstart',function(){
		var t = getScore();
		if(t){//评分全部打完
			
			if(getTag()){//标签已经添加
				addClass(mask,'showPage');
				
				fnMask();
				
				
			}else{//没有添加标签
				setInfo(info,'给景区添加标签')
			}
			
			
		}else{//还有未打分的
			setInfo(info,'给景区评分')
		}
	})
	
	
	function getScore(){
		for(var i=0;i<lis.length;i++){
			var oInput = lis[i].getElementsByTagName('input')[0];
			if(!oInput.value){
				return false;
			}
		}
		return true;
	}
	function getTag(){
		var aInput = tag.getElementsByTagName('input');
		for(var i=0;i<aInput.length;i++){
			if(aInput[i].checked){
				return true;
			}
		}
		return false;
	}
	
	
	function setInfo(obj,value){
		obj.innerHTML = value;
		obj.style.transform = obj.style.webkitTransform = 'scale(1)';
		obj.style.opacity = 1;
		
		setTimeout(function(){
			obj.style.transform = obj.style.webkitTransform = 'scale(0)';
			obj.style.opacity = 0;
		},2000)
	}
}



function fnMask(){
	var index = id('index');
	var mask = id('mask');
	var news = id('news');
	
	
	addClass(news,'showPage');
	
	setTimeout(function(){
		mask.style.opacity = 1;
		mask.style.zIndex = 12;
		index.style.filter = index.style.webkitFilter = 'blur(5px)';
		
	},20)
	
	setTimeout(function(){
		removeClass(mask,'showPage');
		removeClass(index,'showPage');
		index.style.filter = index.style.webkitFilter = 'blur(0px)';
		mask.style.opacity = 0;
		mask.style.zIndex = 2;
		fnNews();
	},3000)	

}


function fnNews(){
	var news = id('news');
	var form = id('form');
	var upload = news.getElementsByClassName('upload')[0];
	var btn = news.getElementsByClassName('btn')[0];
	var aInput = upload.getElementsByTagName('input');
	var onoff = false;
	

	
	bind(aInput[0],'change',function(){
		var f = this.files[0];
		if(f){
			var type = f.type.split('/')[0];
			if(type == 'video'){
				addClass(btn,'submit');
				onoff = true;
			}else{
				alert('请上传正确格式文件！');
			}
		}
	})
	
	
	bind(aInput[1],'change',function(){
		var f = this.files[0];
		if(f){
			var type = f.type.split('/')[0];
			if(type == 'image'){
				addClass(btn,'submit');
				onoff = true;
			}else{
				alert('请上传正确格式文件！');
			}
		}
	})
	
	bind(btn,'touchstart',function(){
		
		if(onoff){
			
			//通过ajax上传数据
			fnForm();
			removeClass(news,'showPage');
			addClass(form,'showPage');
		}
		
	})
}


function fnForm(){
	var form = id('form');
	var oReset = id("reset");
	var btn = form.getElementsByClassName('btn')[0];
	var onoff = false;
	var labels = form.getElementsByTagName('label');
	for(var i=0;i<labels.length;i++){
		bind(labels[i],'touchstart',function(){
			addClass(btn,'submit');
			onoff = true;
		})
	}
	
	bind(btn,'touchstart',function(){
		if(onoff){
			//上传数据
			removeClass(form,"showPage");
			addClass(oReset,"showPage");
			fnReset();
		}
		
	})
}



function fnReset(){
	var oReset = id("reset");
	var index = id("index");
	var oBtn = oReset.getElementsByClassName("btn")[0];
	bind(oBtn,"touchstart",function(){
		removeClass(oReset,"showPage");
		addClass(index,"showPage");
		index.style.transition = "none";
	})
}



