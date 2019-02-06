var vehicle = [];
var food = [];
var poison = [];

var debug;


function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < 4; i++) {
        let x = random(width);
        let y = random(height);
        vehicle.push(new Vehicle(x, y));
    }

    for (var i = 0; i < 50; i++) {
        var foodX = random(0, width);
        var foodY = random(0, height)
        food.push(createVector(foodX, foodY));


    }
    for (var i = 0; i < 10; i++) {
        var poisonX = random(0, width);
        var poisonY = random(0, height);
        poison.push(createVector(poisonX, poisonY));

    }


    debug = createCheckbox();


}

function generateFood() {
    var foodX = random(0, width);
    var foodY = random(0, height)
    food.push(createVector(foodX, foodY));

}

function generatePoison() {
    var poisonX = random(0, width);
    var poisonY = random(0, height)
    poison.push(createVector(poisonX, poisonY));

}


function draw() {
    background(51);


    if (random(1) < 0.05) {
        generateFood();
    }
    if (random(1) < 0.01) {
        generatePoison();
    }

    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        noStroke();
        ellipse(food[i].x, food[i].y, 5, 5);
    }

    for (var i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        noStroke();
        ellipse(poison[i].x, poison[i].y, 5, 5);
    }
    for (let i = vehicle.length - 1; i >= 0; i--) {
        vehicle[i].behaviours(food, poison);
        vehicle[i].update();
        vehicle[i].display();
        vehicle[i].boundaries();
        var newVehicle = vehicle[i].clone();
        if (newVehicle != null) {
            vehicle.push(newVehicle);
        }
        if (vehicle[i].dead()) {
            var x = vehicle[i].position.x;
            var y = vehicle[i].position.y;

            food.push(createVector(x, y));

            vehicle.splice(i, 1);
        }


    }


}
