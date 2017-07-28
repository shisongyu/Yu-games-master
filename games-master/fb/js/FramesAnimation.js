/*
 *@author：kongdejian
 * @date:2016.06.01
 * 
 * */

var Animation = (function($){
				
			var Animation = function(options){
				
				this.defaults = {
					'container':'actionContainer',//动画元素外层元素
					'id':'bomb',	//动画元素id
					'jsonurl':'img/bird.json',//动画json文件
					'texture':'img/bird.png',//动画贴图
					'loop':true, //是否循环播放
					'isremove':false,//播放完毕是否从父元素移除
					'speed':100 ,// 默认是100
					'AniFrames':[],
					'width':100,
					'height':100,
					'scale':{x:1,y:1},
					'position':{x:0,y:0},
					'_instance':null,
				};
				
				this.opts = $.extend(true,{}, this.defaults , options||{});
				
				var self = this;
				
				this.init = function(){

//					console.log('init ani')
					$.getJSON(self.opts.jsonurl,function(data){
						
						if($("#"+self.opts.id).length <= 0){
							var div  = self._instance = document.createElement('div');
							$(div).attr('id',self.opts.id);
							$('#'+self.opts.container+'').append(div);
						}
						
						$(div).css({
							'width':self.width,'height':self.height,
							'background-image':'url('+self.opts.texture+')',
							'position':'absolute',
							'-moz-transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')', 
							'-webkit-transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')', 
							'-o-transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')',
							'transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')',
							'left':self.opts.position.x+'px',
							'top':self.opts.position.y+'px'
						});
	
						var frames = data.frames;	
						for(frame in  frames){
							var k = frame;
							var v = frames[k];
							self.opts.AniFrames.push(v);						
						};		

					})
				};
				
				this.init();
				
				var actionTimer=null;
				this.play = function(loop){
//					console.log('播放动画');
					var AniFrames = self.opts.AniFrames;
					if(AniFrames.length > 0){
						clearInterval(actionTimer);
						$("#" + self.opts.id).show();
						i = 0;
						
						var l = AniFrames.length;
						var i = 0;

						actionTimer = setInterval(function(){

							$("#" + self.opts.id).css({
								'background-position': (AniFrames[i].x)*-1 + 'px '+(AniFrames[i].y)*-1+'px',
								'width': (AniFrames[i].w)+'px',
								'height':(AniFrames[i].h)+'px',
							});
							if(i < l-1){
								i++;
							}else{
								if(loop){
//									console.log(loop);
									i = 0;
								}else{							
									clearInterval(actionTimer);	
									if(self.opts.isremove){
										$("#" + self.opts.container).remove();
									}else{
										$("#" + self.opts.id).hide();
									}
								}
							}	
						},self.opts.speed);
					}
				},	
				
				this.getInstance = function(){
					return self._instance;
				}
			};
		

	return Animation;
	
})(Zepto)