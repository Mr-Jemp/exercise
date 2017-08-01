

Vue.directive('focus',{
	update(el,obj){
		if(obj.value){
			el.focus();
		}
	}
})

var gl={
	all(list){
		return list
	},
	unfinish(list){
		return list.filter(function(item){
			return !item.isCk
		})
	},
	finish(list){
		return list.filter(function(item){
			return item.isCk
		})
	}
	
}

var save={
	getLoc(key){
		return JSON.parse(window.localStorage.getItem(key))?JSON.parse(window.localStorage.getItem(key)):[];
	},
	setLoc(key,value){
		window.localStorage.setItem(key,JSON.stringify(value))
	}
}

//let list=[
//	{
//		title:'hello wrold',
//		isCk:true             //true  表示完成
//	},
//	{
//		title:'hello vue',
//		isCk:false             //false  表示未完成
//	}
//]

var list = save.getLoc('p-item');

var vm = new Vue({
	el:'#app',
	data:{
		list:list,
		texting:'',
		now:'',
		hash:'all'
	},
	methods:{
		addItem(){
			if(this.texting){
				this.list.push({
					title:this.texting,
					isCk:false
				})
				this.texting = '';
			}
		},
		removeItem(index){
			this.list.splice(index,1)
		},
		editingItem(item){
			this.now = item
		},
		editedItem(){
			this.now = '';
		}
	},
	computed:{
		totalUnfinish(){
			return this.list.filter(function(item){
				return !item.isCk
			}).length
		},
		filterList(){
			
			return gl[this.hash]?gl[this.hash](this.list):this.list;
		}
	},
	watch:{
		hash(v1,v2){
			console.log(v1)
		},
		list:{
			deep:true,
			handler(){
				save.setLoc('p-item',this.list);
			}
		}
	}
})

fn();
window.addEventListener('hashchange',fn)

function fn(){
	let hash = window.location.hash.substr(1)?window.location.hash.substr(1):'all';
	
	vm.hash = hash;
}










