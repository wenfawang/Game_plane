(function(){
    //子弹类
    var Bullet = window.Bullet = function(){

        this.image = game.R["bullet"];
        //宽高
        this.width = 6;
        this.height = 14;
        //坐标
        this.x = game.myplane.x + game.myplane.width/2 - this.width/2;
        this.y = game.myplane.y - this.height;
        //速度
        this.speed = 30;
        
    };
    //渲染
    Bullet.prototype.render = function(){
        game.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      
    };
    // 更新
    Bullet.prototype.update = function(){
        this.y -= this.speed;
        
        //子弹四边坐标
        this.bullet_U = this.y;
        this.bullet_D = this.y + this.height;
        this.bullet_L = this.x;
        this.bullet_R = this.x + this.width;
    
        //检测出画布
        if(this.y < -this.height){
            this.godie();
        }
    };
    //自杀 
    Bullet.prototype.godie = function(){
        var self = this;
        game.bulletArr.forEach(function(item,index){
            if(self == item){
                game.bulletArr.splice(index,1);
            }
        });
    };
})();