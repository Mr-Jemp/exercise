define(function(require, exports, module){
	
	
	function rang(max,min,now){
		if(now >= max){
			return max;
		}else if(now <= min){
			return min;
		}else{
			return now;
		}
	}
	
	exports.rang = rang;
})
