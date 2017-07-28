//获取元素
const $ = function(ele){
    return document.querySelectorAll(ele);
}

//碰撞检测
$.collision = function(a,b){
	if(b.x+b.width > a.x && b.x < a.x+a.width && b.y < a.y+a.width && b.y+ b.width > a.y){
		return true;
	}
}
