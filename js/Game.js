(function(){
    //构造函数
    var Game = window.Game = function(){
        //得到画布
        this.mycanvas = document.getElementById("mycanvas");
        //设置上下文，也设置成为Game的属性
        this.ctx = this.mycanvas.getContext("2d");
        //分数
        this.score = 0;
        //速度
        this.speed = 2;
        // 场景
        this.scene = 0;
        //暂停
        this.pause = false;
        //设置画布的宽度和高度
        this.init(); 
        //读取所有资源
        this.loadResource(function(){
            //回调函数
            this.start();
        });
    }
    //设置画布的宽度和高度
    Game.prototype.init = function(){
        //设置canvas的宽度和高度，适配当前的视口
        this.mycanvas.width = document.documentElement.clientWidth;
        this.mycanvas.height = document.documentElement.clientHeight;
        //要验收，因为要把宽度、高度卡在一个区间内。
        if(this.mycanvas.width > 500){
             this.mycanvas.width = 500;
        }
        if(this.mycanvas.height > 800){
             this.mycanvas.height = 800;
        }

    }
    //读取资源
    Game.prototype.loadResource = function(callback){
        //设置R对象
        this.R = {
            "background_0" : "images/background_0.png",
            "background_1" : "images/background_1.png",
            "smallplane" : "images/smallplane.png",
            "boom"         : "images/boom.png",
            "bullet"       : "images/bullet.png",
            "bullet0"       : "images/bullet0.png",
            "enemy0_0"     : "images/senemy0_0.png",
            "enemy0_1"     : "images/senemy0_1.png",
            "enemy0_2"     : "images/senemy0_2.png",
            "enemy0_3"     : "images/senemy0_3.png",
            "enemy0_4"     : "images/senemy0_4.png",
            "enemy1_0"     : "images/menemy1_0.png",
            "enemy1_1"     : "images/menemy1_1.png",
            "enemy1_2"     : "images/menemy1_2.png",
            "enemy1_3"     : "images/menemy1_3.png",
            "enemy1_4"     : "images/menemy1_4.png",
            "enemy1_5"     : "images/menemy1_5.png",
            "enemy2_0"     : "images/benemy2_0.png",
            "enemy2_1"     : "images/benemy2_1.png",
            "enemy2_2"     : "images/benemy2_2.png",
            "enemy2_3"     : "images/benemy2_3.png",
            "enemy2_4"     : "images/benemy2_4.png",
            "enemy2_5"     : "images/benemy2_5.png",
            "enemy2_6"     : "images/benemy2_6.png",
            "myplane"       : "images/myplane.png",
            "myplane_0"     : "images/myplane_0.png",
            "myplane_1"     : "images/myplane_1.png",
            "myplane_2"     : "images/myplane_2.png",
            "myplane_3"     : "images/myplane_3.png",
            "ball0"     : "images/ball0.png",
            "ball1"     : "images/ball1.png",
            "ball2"     : "images/ball2.png",
            "start"     : "images/start.png"
        };
        //现在要得到图片的总数
        var imagesAmount = Object.keys(this.R).length;
        //备份this
        var self = this;
        //计数器，加载好的图片个数
        var count = 0;
        //遍历R对象，加载图片
        for(var k in this.R){
            (function(k){
                var image = new Image();
                image.src = self.R[k];
                //监听图片加载完成
                image.onload = function(){
                    //计数
                    count++;
                    //改变R对象，让R对象对应的k的值变为这个图片对象
                    self.R[k] = this;
                    //提示用户
                    self.ctx.textAlign = "center";
                    self.ctx.font = "20px 黑体";
                    //清屏
                    self.clear();
                    self.ctx.fillText("正在加载图片" + count + "/" + imagesAmount , self.mycanvas.width/2 , self.mycanvas.height/2 * 0.618);
                    //如果加载好的数量等于总数，说明全都加载好了
                    if(count == imagesAmount){
                        //全部加载完毕，执行回调函数。
                        callback.call(self);
                    }
                }
            })(k);
        }
    }
    //清屏
    Game.prototype.clear = function(){
        this.ctx.clearRect(0,0,this.mycanvas.width,this.mycanvas.height);
    }
    //开始游戏
    Game.prototype.start = function(){
        //start的调用是在loadResource之后
        //设置帧编号
        this.fno = 0;
        // 场景管理器
        this.sm = new SceneManager();
        //切换场景
        this.sm.gotoScene(this.scene);
       
        this.timer = setInterval(this.loop.bind(this),20);
    }
    //主循环的内容，这个函数中的所有语句都是每帧要执行的
    Game.prototype.loop = function(){
        if(this.pause) return;
        //清屏
        this.clear();
        //帧编号加1
        this.fno++;      
        
        if(this.score > 300){
            this.speed = 5;
        }else if(this.score > 1000){
             this.speed = 6;
        }
        // //显示背景，背景现在不是类，直接显示就行了
        // this.ctx.drawImage(this.R["background_0"],0,0,this.mycanvas.width,568 / 320 *this.mycanvas.width);

        this.sm.updateandrender();
        // this.ball.render();
        // this.ball.update();
        /*//渲染我军飞机
        this.myplane.render();
        //子弹
        this.bulletArr.forEach(function(item){
            item.update();
            item.render();
        })
        // //小号敌机
        this.smallenemyArr.forEach(function(item){
            item.update();
            item.render();
        })

        // 中号敌机
        this.middleenemyArr.forEach(function(item){
            item.update();
            item.render();
        })

        //大号敌机
        this.bigenemyArr.forEach(function(item){
            item.update();
            item.render();
        })*/

       /* this.fno % 10 == 0 && this.smallenemyArr.push(new Smallenemy());
        this.fno % 50 == 0 && this.middleenemyArr.push(new Middleenemy());
        this.fno % 130 == 0 && this.bigenemyArr.push(new Bigenemy());
        

        //new 子弹
        this.fno % 5 == 0 && this.bulletArr.push(new Bullet());*/
        // console.log(this.smallenemyArr)
       /* //显示logo
        var logow = this.mycanvas.width/1.3;
        this.ctx.drawImage(this.R["logo"],(this.mycanvas.width - logow)/2,0,logow,392*(logow / 531));
        
        //渲染半透明的黑色矩形
        this.ctx.fillStyle = "rgba(0,0,0,.6)";
        this.ctx.fillRect(this.spriteBaseX - this.paddingLeftRight / 2 , this.spriteBaseY - this.paddingLeftRight / 2 , this.mycanvas.width - this.paddingLeftRight , this.rowamount * this.spriteH + this.paddingBottom / 2);

        //渲染地图
        this.map.render();*/

        //显示帧编号，方便我们测试
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.font = "16px consolas";
        this.ctx.fillStyle = "#333";
        this.ctx.font = "20px 微软雅黑";
        // this.ctx.fillText("帧编号：" + this.fno , 10 ,10);
        this.ctx.fillText("分数：" + this.score , 10 ,50);


    }
})();