// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他的所有类
class GameControl{

    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 积分榜
    scorePanel: ScorePanel;
    // 存储移动方向
    direction: string = '';
    // 记录游戏是否结束
    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    // 游戏初始化,调用后游戏开始
    init(){
        // 绑定键盘按下事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用run方法，使蛇移动
        this.run()
    }

    // 创建键盘按下响应函数
    keydownHandler(event:KeyboardEvent){
        // 检查event.key是否合法（用户是否按了正确的方向键）
        //修改方向
        this.direction = event.key;
    }

    // 控制蛇移动的方法
    run(){
        /*
        根据方向（this.direction）来使蛇的位置改变
                向上 top 减少
                向下 top 增加
                向左 left 减少
                向右 left 增加
        */
       // 获取蛇现在的坐标
       let X = this.snake.X;
       let Y = this.snake.Y;
       
       // 根据按键方向来修改X、Y值
       switch (this.direction){
           case "ArrowUp":
           case "Up":
               // 向上移动
               Y -= 10;
               break;
           case "ArrowDown":
           case "Down":
               // 向下移动
               Y += 10;
               break;
           case "ArrowLeft":
           case "Left":
               // 向左移动
               X -= 10;
               break;
           case "ArrowRight":
           case "Right":
               // 向右移动
               X += 10;
               break;
       }

       // 检查蛇是否吃到食物
       this.checkEat(X, Y);

       // 修改X、Y
       try{
           this.snake.X = X;
           this.snake.Y = Y;
       }catch (e: any){
           // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
           alert(e.message + 'GAME OVER！');
           // 将isLive设置为false
           this.isLive = false;
       }
       
       // 开启定时调用
       this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定义一个方法检查蛇是否吃到食物
    checkEat(X: number, Y: number){
        if (X === this.food.X && Y === this.food.Y){
            
            // 食物位置重置
           this.food.change();
           // 分数增加
           this.scorePanel.addScore();
           // 蛇增加一节
           this.snake.addBody();
        }
    }
}

export default GameControl;