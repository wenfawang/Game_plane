(function(){
    //我军 Myplane类
    var Myplane = window.Myplane = function(){

        this.imageStart = game.R["myplane_0"];
        this.imageEnd = [game.R["myplane_1"],game.R["myplane_2"],game.R["myplane_3"]];
        this.image = this.imageStart;

        this.imageEndNo = 0;
        //图片宽高
        this.width = 66;
        this.height = 80;
        //飞机坐标
        this.x = (game.mycanvas.width-this.width)/2;
        this.y = game.mycanvas.height-this.height;        

        this.bindEvent();
    };
    // 渲染
    Myplane.prototype.render = function(){
        // game.ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        if(this.image == this.imageStart){
            game.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }else{
            game.ctx.drawImage(this.image[this.imageEndNo],this.x,this.y,this.width,this.height);
            game.fno % 2 == 0 && this.imageEndNo++;
            if(this.imageEndNo >  this.imageEnd.length-2 ){
                this.imageEndNo = this.imageEnd.length-2;
            }
        }
    };
    // 更新
    Myplane.prototype.bindEvent = function(){
        var self = this;
        var lock = true;
        document.addEventListener("touchmove",function(event){
			var x = event.touches[0].clientX;
			var y = event.touches[0].clientY;

			handler(x,y);
			lock = false;
		},false);
        
        
            game.mycanvas.onmousemove = function(event){
                if(!lock) return;
                var event = event || window.event;
                //   game.lock = true;
                 //鼠标位置
                 var x = event.offsetX;
                 var y = event.offsetY;  

                 handler(x,y);              

                 lock = true;
            }
             
        
        function handler(x,y){
             
                //  反映到飞机位置
                 self.x = x - self.width/2;
                 self.y = y - self.height/2;
                //  验证
                if(self.x < -self.width/3){
                    self.x = -self.width/3;
                }else if(self.x > game.mycanvas.width-self.width/3 * 2){
                    self.x = game.mycanvas.width - self.width/3 * 2;
                }

                if(self.y < 0){
                    self.y = 0
                }else if(self.y > game.mycanvas.height - self.height){
                    self.y = game.mycanvas.height - self.height
                }
                
                //飞机四方位坐标
                self.myplane_U = self.y + self.height/4;
                self.myplane_D = self.y + self.height - self.height/4;
                self.myplane_L = self.x ;
                self.myplane_R = self.x + self.width;

        }
       
    };
})();