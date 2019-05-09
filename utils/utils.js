export default{
	/* 获取url参数 */
	 getUrlParam(key) {	
			let urlHash = window.location.hash
			let urlSearch = window.location.search;
			//如果url中没有传参直接返回空	
			if(urlHash.indexOf('?') == -1){return null;}  			
			//key存在先通过search取值如果取不到就通过hash来取
			urlSearch = urlSearch.substr(1) || urlHash.split("?")[1];			
			if(urlSearch){       
				let reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
				let r = urlSearch.match(reg);					
				return r != null? decodeURIComponent(r[2]): null;
			}
		}
	
}