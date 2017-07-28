
(function(Ani,$$){
	
	$ = function(id){return document.getElementById(id)};
	
	var sh = window.screen.height;
	var sw = window.screen.width;
	
	var groundY = $('ground').offsetTop;
	
	var startbtn = $('startbtn');
	
	var startpage = $("startpage");
	
	var gamescene = $('game-scene');
	
	var gameOverPage = $('game-over-page');
	
	var restartbtn = $('restartbtn');
	
	var score_label = $('score_label');
	
	var point_audio = $('point_audio');
	
	var bird = null;
	var gravity = 5; // 重力，下落速度；
	
	var Pips = []; //管道数组
	
	var SCORE = 0;
	
	var GAME_STATE = 0;
	
	var updateTimer = null;
	var addPipTimer = null;
	
	
	startbtn.onclick = function(){
		groundY = $('ground').offsetTop;
		GAME_STATE = 1;
		startpage.style.display = 'none';
		startGame();
	}
	restartbtn.onclick = function(){
		restart();
	}
	
	var jumpActionTimer = null;
//	$$(gamescene).tap(function(){
//		if(GAME_STATE == 1){
//			if(jumpActionTimer){
//				jumpTimer = 0;
//				clearInterval(jumpActionTimer);
//			}
//			jumpActionTimer = setInterval(jumpAction,30);
//		}
//	});

gamescene.onclick = function(){
		if(GAME_STATE == 1){
			if(jumpActionTimer){
				jumpTimer = 0;
				clearInterval(jumpActionTimer);
			}
			jumpActionTimer = setInterval(jumpAction,30);
		}
}
	
	var jumpTimer=0;
	function jumpAction(){
	
		bird.style.top = bird.offsetTop -15 + 'px';
		jumpTimer+=1;
		if(jumpTimer >= 6){
			clearInterval(jumpActionTimer);
		}
	}
	
	
	 function addBird(){
		var birdani = new Animation({
				'container':'game-scene',	//动画元素外层元素（***必须）
				'id':'bird',					//动画元素id（***必须）
				'jsonurl':'img/bird.json', //动画json文件（***必须）
				'texture':'img/bird.png',  //动画贴图（***必须）
				'loop':true, 					//是否循环播放（可选）			
				'speed':100 ,					//播放速度（可选）
				'position':{x:sw/2-30,y:200}		//位置，使用绝地定位（可选）
		});
			
		setTimeout(function(){
						
			birdani.play(true);
			
			bird = birdani.getInstance();
			bird.style.zindex = 8;
		},200)
	};
	
	addBird();
	
	/* 开始游戏 */
	function startGame(){
		
		updateTimer = setInterval(update,30);
		addPipTimer = setInterval(addPip,1800);
	}
	
	/* 添加管道函数*/
	function addPip(){
 
		var ry = Math.random()*150;
		
		var top1 = sh/2 - 375 - ry;
		var pipup = getPip('fb/guandao2.png',top1);
		gamescene.appendChild(pipup);
		Pips.push(pipup);
		
		var top2 = sh/2 + 75 - ry;
		var pipdown = getPip('fb/guandao.png',top2);
		gamescene.appendChild(pipdown);
		Pips.push(pipdown);
	}
	
	/* - 刷新函数 -*/
	function update(){
		bird.style.top = bird.offsetTop + gravity + 'px';
		
		//小鸟受重力下落
		if(bird.offsetTop >= groundY-bird.offsetHeight){
			gameOver();
		}
	
		//管道移动
		for(var i= 0,l = Pips.length;i<l;i++){
			var p = Pips[i];
			
			if(p){
				p.style.left = p.offsetLeft - 7 + 'px';
			
				if(p.offsetLeft < -250){
					Pips.splice(i,1);
					gamescene.removeChild(p);
				}
				if(p.offsetLeft < sw/2-50){
					if(!p.isSetScore){
						p.isSetScore = true;
						playEffect();
						SCORE++;
					}
					
				}
			
				if(collision(p,bird)){
					gameOver();
				}
			}
		}
	}
	

	function gameOver(){
		GAME_STATE = 0;
		score_label.innerHTML = SCORE;
		clearInterval(updateTimer);	
		clearInterval(addPipTimer);
		gameOverPage.style.display = 'block';
	}
	
	function restart(){
		addBird();
		GAME_STATE = 1;
		SCORE = 0;
		Pips = [];
		gameOverPage.style.display = 'none';
		gamescene.innerHTML = '';
	
		addPipTimer = setInterval(addPip,1300);
		updateTimer = setInterval(update,30);
	}
	
	function playEffect(){
		point_audio.currentTime = 0;
		point_audio.play();
	}
	
	function collision(a,b){
		var ax = a.offsetLeft;
		var ay = a.offsetTop;
		var aw = a.offsetWidth;
		var ah = a.offsetHeight;
		
		var bx = b.offsetLeft;
		var by = b.offsetTop;
		var bw = b.offsetWidth;
		var bh = b.offsetHeight;
		
		return (bx+bw > ax && bx < ax+aw && by < ay+ah && by+ bh > ay);
	}

/* 管道工厂*/
var getPip = function(imgurl,top){
	var pip = document.createElement('img');
	pip.src = imgurl;
	pip.style.position = 'absolute';
	pip.style.width = '50px';
	pip.style.height = '300px';
	pip.style.left = sw + 'px';
	pip.style.top = top + 'px';
	return pip;
}

})(Animation,Zepto)
