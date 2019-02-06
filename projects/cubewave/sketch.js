//Pereira Yip

let angle = 0;
//Smaller means more cubes.
let w = 40;
let ma;
let maxD;
function setup() {
    createCanvas(500, 500, WEBGL);
    ma = atan(1 / sqrt(2));
    maxD = dist(0, 0, 300, 300);
}

function draw() {
    background(0);

    var locX = mouseX - height / 2;
    var locY = mouseY - width / 2;
  
    ambientLight(100, 100, 100);
    pointLight(255, 255, 255, locX, locY, 100);

    ortho(-450, 450, -450, 450, -300, 1000);

    rotateX(-PI/6);
    rotateY(ma);
    //rotateX(PI / 4);
    rectMode(CENTER);
    // rotateX(angle * 0.25);
    let offset = 0;


    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            push();
            //distance off center
            let d = dist(x, z, width / 2, height / 2);
            offset = map(d, 0, maxD, -(1.25)*PI, 1.25*PI);
            let a = angle + offset;
            //map value start1 stop 1 start 2 stop 2
            //remaps a number from one range to another. Kinda like ratio? 
            //But we need it for the changing value for some reason... find out why
            let h = map(sin(a), -1, 1, 75, 300);
            //since h is not a constant, we use h
            //fill(255);
            translate(x - width / 2, 0, z - height / 2);
            //normalMaterial();
            ambientMaterial(114, 255, 200);
            noStroke();
            box(w , h, w );

            pop();

        }

    }
    angle -= 0.11;


}