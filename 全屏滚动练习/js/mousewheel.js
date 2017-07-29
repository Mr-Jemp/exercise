/*
	 	在mousewheel事件里面，ev的wheeldelta属性是用于判断滚轮的方向；
	 		正值：向上
	 		负值：向下
	 	
	 	在DOMMouseScroll事件里面，ev的detail适用于判断火狐滚轮方向；
	 		正值：向下
	 		负值：向上
	 	
	 * */

function addWheel(obj, up, down) {
	var use = window.navigator.userAgent.toLowerCase(); //用户代理信息
	if(use.indexOf("msie") != -1) {
		obj.attachEvent("onmousewheel", fn);
	} else if(use.indexOf("firefox") != -1) {
		obj.addEventListener("DOMMouseScroll", fn, false);
	} else {
		obj.addEventListener("mousewheel", fn, false);
	}

	function fn(ev) {
		var direction = true;
		if(ev.detail) {
			direction = ev.detail > 0 ? false : true;
		} else {
			direction = ev.wheelDelta > 0 ? true : false;
		}

		if(direction) {
			typeof up == "function" && up();
		} else {
			typeof down == "function" && down();
		}

		ev.preventDefault();
	}
}
