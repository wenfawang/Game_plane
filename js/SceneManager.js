(function(){
	// 场景管理器
	var SceneManager = window.SceneManager = function(){
		this.bindEvent();
	};

	SceneManager.prototype.updateandrender = function(){

		switch(game.scene){
			case 0:
				game.ctx.drawImage(game.R["background_0"],0,0,game.mycanvas.width,568 / 320 *game.mycanvas.width);

				game.ctx.drawImage(game.R["myplane"],(game.mycanvas.width-108)/2,game.mycanvas.height/2,108,108);
				game.ctx.drawImage(game.R["smallplane"],(game.mycanvas.width-176)/2,game.mycanvas.height/2+144,176,36);

				game.ctx.strokeRect((game.mycanvas.width-this.w)/2,game.mycanvas.height-this.h*3,this.w,this.h);
				game.ctx.textAlign = "center";
				game.ctx.textBaseline = "middle";
				game.ctx.font = "16px 微软雅黑";
				game.ctx.fillText("开始游戏",game.mycanvas.width/2,game.mycanvas.height-this.h*2.5);			
				break;

			case 1:
				game.ctx.drawImage(game.R["background_1"],0,0,game.mycanvas.width,568 / 320 *game.mycanvas.width);
				
				//渲染我军飞机
				game.myplane.render();
				//子弹
				game.bulletArr.forEach(function(item){
					item.update();
					item.render();
				})
				// //小号敌机
				game.smallenemyArr.forEach(function(item){
					item.update();
					item.render();
				})

				// 中号敌机
				game.middleenemyArr.forEach(function(item){
					item.update();
					item.render();
				})

				//大号敌机
				game.bigenemyArr.forEach(function(item){
					item.update();
					item.render();
				})
				//球类
				game.ballArr.forEach(function(item){
					item.update();
					item.render();
				})

				if(game.fno % 20 == 0){
					game.smallenemyArr.push(new Smallenemy());
				} 

				if(game.fno % 60 == 0){
					game.middleenemyArr.push(new Middleenemy());
				}

				if(game.fno % 130 == 0){
					game.bigenemyArr.push(new Bigenemy());							
				}
				//new 子弹
				game.fno % 5 == 0 && game.bulletArr.push(new Bullet());	  

				if(game.pause){
					game.ctx.drawImage(game.R["start"],game.myplane.x,game.myplane.y);
				
				}      
				break;

			case 2:
				game.ctx.drawImage(game.R["background_1"],0,0,game.mycanvas.width,568 / 320 *game.mycanvas.width);
				
				//渲染我军飞机
				game.myplane.render();
				//子弹
				game.bulletArr.forEach(function(item){
					item.render();
				})
				// //小号敌机
				game.smallenemyArr.forEach(function(item){
					item.render();
				})

				// 中号敌机
				game.middleenemyArr.forEach(function(item){
					item.render();
				})

				//大号敌机
				game.bigenemyArr.forEach(function(item){
					item.render();
				})
				
		        // //图形化显示分数
				game.ctx.save();
				game.ctx.strokeStyle = "#000";				
		        game.ctx.strokeRect((game.mycanvas.width-this.ww)/2,game.mycanvas.height/2-this.hh*2,this.ww,this.hh);
		        game.ctx.fillStyle = "#ccc";
				game.ctx.fillRect((game.mycanvas.width-this.ww)/2,game.mycanvas.height/2-this.hh*2,this.ww,this.hh);
				game.ctx.fillStyle = "#000";
				game.ctx.font = "20px 微软雅黑";
				game.ctx.textAlign = "center";
				game.ctx.textBaseline = "middle";
				game.ctx.fillText("GAME OVER",game.mycanvas.width/2,game.mycanvas.height/2-this.hh*3/2);
				game.ctx.restore();

				game.ctx.save();
				game.ctx.strokeStyle = "#000";				
		        game.ctx.strokeRect((game.mycanvas.width-this.ww)/2,(game.mycanvas.height-this.hh)/2,this.ww,this.hh);
		        game.ctx.fillStyle = "#ccc";
				game.ctx.fillRect((game.mycanvas.width-this.ww)/2,(game.mycanvas.height-this.hh)/2,this.ww,this.hh);
				game.ctx.fillStyle = "#000";
				game.ctx.font = "20px 微软雅黑";
				game.ctx.textAlign = "center";
				game.ctx.textBaseline = "middle";
				game.ctx.fillText("最终分数： "+game.score,game.mycanvas.width/2,game.mycanvas.height/2);
				game.ctx.restore();

				game.ctx.save();
				game.ctx.strokeStyle = "#000";
				game.ctx.strokeRect((game.mycanvas.width-this.ww)/2,game.mycanvas.height/2+this.hh,this.ww,this.hh);
		        game.ctx.fillStyle = "#ccc";
				game.ctx.fillRect((game.mycanvas.width-this.ww)/2,game.mycanvas.height/2+this.hh,this.ww,this.hh);
				game.ctx.fillStyle = "#000";
				game.ctx.font = "20px 微软雅黑";
				game.ctx.textAlign = "center";
				game.ctx.textBaseline = "middle";
				game.ctx.fillText("重新开始",game.mycanvas.width/2,game.mycanvas.height/2+this.hh*3/2);
				game.ctx.restore();
				break;
			

		}

	};

	SceneManager.prototype.gotoScene = function(num){

		game.scene = num;
		switch(game.scene){
			case 0:
				this.w = 150;
				this.h = 40;
				break;

			case 1:
				//实例化飞机====我军
				game.myplane = new Myplane();
				//子弹
				game.bulletArr = [];
				//小号敌机
				game.smallenemyArr = [];
				//中号敌机
				game.middleenemyArr = [];
				//大号敌机
				game.bigenemyArr = [];
				//球类
				game.ballArr = [];
				break;

			case 2:
				//实例化飞机====我军
				this.ww = game.mycanvas.width * 2 / 3;
				this.hh = this.ww / 5;
				game.mycanvas.onmousedown = null;
				game.mycanvas.onmousemove = null;
				
				break;
			

		}

	};
	//绑定监听
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		var lock = true;
		var _lock = false;
		game.mycanvas.addEventListener("click",function(event){
			if(!lock) return;
			
			var event = event || window.event;
			var x = event.offsetX;
			var y = event.offsetY;
			
			handler(x,y);
			lock = true;
		},false);


		document.addEventListener("touchstart",function(event){
			var x = event.touches[0].clientX;
			var y = event.touches[0].clientY;

			handler(x,y);
			lock = false;
		},false);


		function handler(x,y){
			switch(game.scene){
				case 0 :
					//点击到了按钮
					if(x > (game.mycanvas.width-self.w)/2 && x < (game.mycanvas.width-self.w)/2 + self.w && y > game.mycanvas.height-self.h*3 && y < game.mycanvas.height-self.h*2){
						//去1号场景
						self.gotoScene(1);
					}
					break;
				case 1 : 
						if(lock){
							if(!_lock){
								game.pause = true;
								_lock = true;								
							}else{
								game.pause = false;
								_lock = false;
							}
						}			
					break;
				case 2 :
					if(x > (game.mycanvas.width-self.ww)/2 && x < (game.mycanvas.width-self.ww)/2 + self.ww && y > game.mycanvas.height/2+self.hh && y < game.mycanvas.height/2+self.hh*2){
						//去1号场景
						self.gotoScene(0);
						game.score = 0;						
					}					
					break;
			}
		}
	}
})();