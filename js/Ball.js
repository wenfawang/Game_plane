(function(){
    //子弹类
    var Ball = window.Ball = function(xx,yy,num,speed){

        this.colors = [game.R["ball0"],game.R["ball1"],game.R["ball2"]];
        // this.colors = ["red","gold","blue"];
        this.colorNum = num;
        if(this.colorNum == 0){
            this.width = 8;
            this.height = 8;
        }else if(this.colorNum == 1){
            this.width = 14;
            this.height = 28;
        }else if(this.colorNum == 2){
            this.width = 59;
            this.height = 53;
        }
        //坐标
        this.cx = xx;
        this.cy = yy;
        //速度
        this.dy = speed + _.random(1,3);        
    };
    //渲染
    Ball.prototype.render = function(){
         game.ctx.drawImage(this.colors[this.colorNum],this.cx,this.cy);       
    };
    // 更新
    Ball.prototype.update = function(){
        
        this.cy += this.dy;

        

       /* //炸弹四边坐标*/
        this.ball_U = this.cy+this.height/6;
        this.ball_D = this.cy + this.height-this.height/6;
        this.ball_L = this.cx;
        this.ball_R = this.cx + this.width;
       
        //检测出画布
        if(this.cy > game.mycanvas.height+this.height){
            this.godie();
        }

        //检测子弹是否与我军飞机相撞myplane_U
        if(!(this.ball_D<game.myplane.myplane_U || this.ball_U>game.myplane.myplane_D || this.ball_R<game.myplane.myplane_L||this.ball_L>game.myplane.myplane_R) ){
           
            this.godie();
            game.myplane.image = game.myplane.imageEnd;  
            game.sm.gotoScene(2);

            document.getElementById("shoot").load();
            document.getElementById("shoot").play();
        }

        // 检测与我军飞机子弹的碰撞
        for(var i = game.bulletArr.length-1; i >= 0; i--){
           if(!(this.ball_D<game.bulletArr[i].bullet_U ||this.ball_U>game.bulletArr[i].bullet_D||this.ball_R<game.bulletArr[i].bullet_L||this.ball_L>game.bulletArr[i].bullet_R)){
                // console.log("撞上了");
                 document.getElementById("boom").load();
                    document.getElementById("boom").play(); 
                this.cx && game.ctx.drawImage(game.R["boom"],this.cx-this.width/2,this.cy);   
                this.godie();
                game.bulletArr[i].godie();

           } 
        }
        
    };
    //自杀 
    Ball.prototype.godie = function(){
        var self = this;
        game.ballArr.forEach(function(item,index){
            if(self == item){
                game.ballArr.splice(index,1);
            }
        });
    };
})();