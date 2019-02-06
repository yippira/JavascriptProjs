class Point {
    constructor() {
        this.label = 0;
        this.x = random(width);
        this.y = random(height);
        if (this.x > this.y) {
            this.label = -1;
        }else{
            this.label = 1;
        }
    } 

    show() {
        stroke(255);
        if(this.label == -1){
            fill(255);
        }else{
            noFill();
        }
        ellipse(this.x,this.y,12,12);
    }
}