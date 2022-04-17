// 定义食物类
class Food{
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        // !表示该元素不会为空
        this.element = document.getElementById("food")!;
    }

    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }

    // 修改食物位置的方法
    change() {
        // 生成一个随机的位置[0-290]，一定是10的倍数，蛇一次移动一格（10px）
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;