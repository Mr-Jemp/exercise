define(function(require, exports, module){
	/*require("jquery-3.2.1.js");
	
	var box = $('.box');*/
	var box = document.getElementsByClassName("box")[0];
	require("drag.js").drag(box);
})
