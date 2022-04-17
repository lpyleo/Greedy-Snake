// 定义积分榜类
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 设置最高等级
    maxLevel: number;
    // 设置多少分升一级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分的方法
    addScore(){
        this.scoreEle.innerHTML = ++this.score + '';
        // 判断分数多少
        if(this.score % this.upScore === 0){
            this.levleUp();
        }
    }

    // 提升等级提升的方法
    levleUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }  
    }
}

export default ScorePanel;