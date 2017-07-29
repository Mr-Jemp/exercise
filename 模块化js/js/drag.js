define(function(require, exports, module){
	
	function drag(obj){

		obj.onmousedown = function(ev){
			ev = ev || window.event;
			var x = ev.pageX - obj.offsetLeft;
			var y = ev.pageY - obj.offsetTop;
			
			document.onmousemove = function(ev){
				ev = ev || window.event;
				var l = require('rang.js').rang(window.innerWidth-obj.offsetWidth,0,ev.pageX - x);
				var t = require('rang.js').rang(window.innerWidth-obj.offsetWidth,0,ev.pageY - y);
				obj.style.left = l + 'px';
				obj.style.top = t + 'px';
			}
			
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
			
			return false;
		}
	}
	
	exports.drag = drag;
})
