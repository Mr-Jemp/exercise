
(function(Sizzle){
	
	function Penglang(name){
		this.eles = Sizzle(name);
	}
	
	Penglang.prototype.size = function(){ //或者元素长度
		return this.eles.length;
	}
	
	Penglang.prototype.css = function(attr,val){ //设置样式
		for(var i=0;i<this.eles.length;i++){
			
			this.eles[i].style[attr] = val;
		}
		return this;
	}
	
	Penglang.prototype.each = function(fn){//遍历方法
		for(var i=0;i<this.eles.length;i++){
			fn(this.eles[i],i);
		}
		return this;
	}
	
	Penglang.prototype.eq = function(index){//单独操作某一个元素
		for(var i=0;i<this.eles.length;i++){
			if(i == index){
				this.eles = [this.eles[index]];
			}
		}
		return this;
	}
	
	Penglang.prototype.click = function(fn){//给元素添加点击事件
		for(var i=0;i<this.eles.length;i++){
			this.eles[i].addEventListener('click',fn);
		}
		return this;
	}
	
	Penglang.prototype.attr = function(attr,val){//给元素添加属性
		for(var i=0;i<this.eles.length;i++){
			this.eles[i].setAttribute(attr,val);
		}
		return this;
	}
	
	
	Penglang.prototype.addClass = function(className){//给元素添加class
		for(var i=0;i<this.eles.length;i++){
			var cn = this.eles[i].className;
			if(cn){	
				if(cn.indexOf(className) == -1){
					this.eles[i].className = cn+' '+className;
				}
			}else{
				this.eles[i].className = className;
			}
				
		}
		return this;
	}
	
	Penglang.prototype.removeClass = function(className){//删除元素class
		for(var i=0;i<this.eles.length;i++){
			var cn = this.eles[i].className.split(' ');
			if(cn){	
				for(var j=0;j<cn.length;j++){
					if(cn[j] == className){
						cn.splice(j,1);
						this.eles[i].className = cn.join('');
					}
				}
			}
				
		}
		return this;
	}
	
	
	
	Penglang.prototype.toggleClass = function(className){
		for(var i=0;i<this.eles.length;i++){
			var name = this.eles[i].className.split(' ');
			if(name){
				for(var j=0;j<name.length;j++){
					if(name[j] == className){
						name.splice(j,1);
						this.eles[i].className  = name.join('');
						
					}else{
						this.eles[i].className = name.join('')+' '+className;
					}
				}
				
			}else{
				this.eles[i].className = className;
			}
			
		}
	}
	
	var num = 0;
	window.$ = window.jQuery = function(name){
		
		num++;
		if(name.nodeType == 1){
			name.setAttribute('setMark'+num,'mark');
			name = name.nodeName.toLowerCase();
			name = name+'[setMark'+num+'="mark"]';
			return new Penglang(name);
		}
		return new Penglang(name);
	}
})(Sizzle)







