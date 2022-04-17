class Snake{
    // 表示蛇头的元素
    head: HTMLElement;
    // 身体（包括蛇头）
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇坐标X（蛇头坐标）
    get X(){
        return this.head.offsetLeft;
    }

    // 获取蛇坐标Y（蛇头坐标）
    get Y(){
        return this.head.offsetTop;
    }

    // 设置蛇坐标X
    set X(value: number){

        // 新旧值相等，不改
        if(this.X === value){
            return;
        }

        // X的值合法范围[0,290]
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙，抛出异常
            throw new Error("蛇撞墙了！")
        }

        // 修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // 如果发生了掉头，继续移动
            if(value > this.X){
                // 说明蛇想向右发生掉头，此时应该让蛇继续向左走
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }

        // 移动身体
        this.moveBody();
        this.head.style.left = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }

    // 设置蛇坐标Y
    set Y(value: number){

        // 新旧值相等，不改
        if(this.Y === value){
            return;
        }

        // Y的值合法范围[0,290]
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙
            throw new Error("蛇撞墙了！")
        }

        // 修改Y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            // 如果发生了掉头，继续移动
            if(value > this.Y){
                // 说明蛇想向下发生掉头，此时应该让蛇继续向上走
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        // 移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }

    // 蛇增加身体的方法
    addBody(){
        // 向element中添加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    // 添加蛇身体移动的方法
    moveBody(){
        // 将后边的身体设置为前边身体的位置
        // 遍历所有身体
        for(let i = this.bodies.length-1; i > 0; i--){
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }
    }

    // 检查蛇头和身体是否相撞
    checkHeadBody(){
        // 获取所有身体，检查是否和蛇头坐标重叠
        for(let i=1; i<this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了！');
            }
        }
    }
}

export default Snake;