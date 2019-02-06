var points = [];
var p;
function setup() {
    createCanvas(700, 700);
    var input = [-0.5, 1];
    p = new Perceptron();
    let guess = p.guess(input);

    for (let i = 0; i < 100; i++) {
        points.push(new Point());
    }
    console.log(guess);
}
function draw() {
    background(0);
    stroke(255);
    line(0, 0, width, height);
    for (let i = 0; i < points.length; i++) {
        points[i].show();
    }

    for (let i = 0; i < points.length; i++) {

        var inputs = [];
        inputs.push(points[i].x);
        inputs.push(points[i].y);

        var target = points[i].label;

        // p.train(target, inputs);

        var guess = p.guess(inputs);
  
       
        if (guess == target) {
            fill(0, 255, 0);
        } else {
            fill(255, 0, 0);
        }
        noStroke();
        ellipse(points[i].x, points[i].y, 6, 6);
    }

}

function mousePressed(){
    for (let i = 0; i < points.length; i++) {

        var inputs = [];
        inputs.push(points[i].x);
        inputs.push(points[i].y);

        var target = points[i].label;

         p.train(target, inputs);


    }
}