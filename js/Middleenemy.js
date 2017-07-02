(function(){
    //小号敌机Smallenemy
    var Middleenemy = window.Middleenemy = function(){
        this.imageStart = game.R["enemy1_0"];
        this.imageEnd = [game.R["enemy1_1"],game.R["enemy1_2"],game.R["enemy1_3"],game.R["enemy1_4"],game.R["enemy1_5"]];
        this.image = this.imageStart;
        this.imageEndNo = 0;
        //宽高
        this.width = 46;
        this.height = 60;
        // 坐标
        this.x = _.random(0,game.mycanvas.width-this.width);
        this.y = -this.height*5;
        //速度
        this.speed = game.speed * 1.5;
        //记录子弹
        this.mbulletNum = 0;
         //小帧号
        this.ff = 0;
    };
    //渲染
    Middleenemy.prototype.render = function(){
        // game.ctx.drawImage(this.imageStart,this.x,this.y,this.width,this.height);
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
    //更新
     Middleenemy.prototype.update = function(){
         this.ff ++;
         this.y += this.speed;
         var self = this;
        
         //小飞机四边坐标
         var senemy_U = this.y;
         var senemy_D = this.y + this.height;
         var senemy_L = this.x;
         var senemy_R = this.x + this.width;

          this.ff % 120 == 0 && game.ballArr.push(new Ball(this.x+this.width/2,this.y+this.height,1,this.speed));
         
         //检测是否碰撞打飞机
         if(senemy_U < game.myplane.myplane_D && senemy_D > game.myplane.myplane_U && senemy_L < game.myplane.myplane_R && senemy_R > game.myplane.myplane_L ){
           
            game.myplane.image = game.myplane.imageEnd;  
            this.image = this.imageEnd;
            game.sm.gotoScene(2);
            document.getElementById("shoot").load();
            document.getElementById("shoot").play();
         }
         //检测小飞机与子弹碰撞        
         for(var i = game.bulletArr.length-1; i >= 0 ; i--){
                 
            if(!(game.bulletArr[i].bullet_U > senemy_D || game.bulletArr[i].bullet_D < senemy_U ||  game.bulletArr[i].bullet_L > senemy_R || senemy_L > game.bulletArr[i].bullet_R)){
                //记录子弹
                game.bulletArr[i].godie();
                this.mbulletNum ++;
                if(this.mbulletNum > 5){
                    document.getElementById("boom").load();
                    document.getElementById("boom").play();
                    this.image = this.imageEnd;
                    this.speed = 0;
                    game.score += 5;
                    //记录子弹
                    this.mbulletNum = 0;
                    (function(self){
                        setTimeout(function(){
                        
                            for(var i = game.middleenemyArr.length-1; i >= 0 ; i--){
                                    if(self == game.middleenemyArr[i]){
                                        game.middleenemyArr.splice(i,1);
                                    }
                            }
                        },100);                        
                    })(this);
                }

             }
        }
        

         //检测飞机是否出画布下边线
         if(this.y > game.mycanvas.height){

             for(var i = game.middleenemyArr.length-1; i >= 0 ; i--){
               if(this == game.middleenemyArr[i]){
                    game.middleenemyArr.splice(i,1);
                }
            }
         };         
         
     };
})();