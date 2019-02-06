var cities = [];
var numOfCities = 5;
var bestRecord;
var bestPath = [];
var count = 1;

var order = [];

var totalPermutations = factorial(numOfCities);

function factorial(num) {
    if (num == 1) {
        return num;
    }

    return factorial(num - 1) * num;
}

function setup() {
    createCanvas(600, 800);

    for (let i = 0; i < numOfCities; i++) {
        var x = random(0, width - 50);
        var y = random(0, (height / 2) - 50);
        cities.push(createVector(x, y));
        order.push(i); //giving order to cities
    }
    //   console.log(order);
    bestRecord = calDistance(cities, order);
    bestPath = order.slice();
}
function draw() {

    background(0);
    translate(25, 25);
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }
    beginShape();
    noFill();
    stroke(0, 0, 255);
    strokeWeight(4);
    for (var i = 0; i < bestPath.length; i++) {
        var n = bestPath[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();


    translate(0, height / 2);
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(1);
    for (var i = 0; i < order.length; i++) {
        var n = order[i];
        vertex(cities[n].x, cities[n].y);
        
    }
    endShape();


    textSize(32);
    let percent = count/totalPermutations * 100;
    fill(255,255,255);
    text(nf(percent,0,2) + "%", 10, 30);
   

    let d = calDistance(cities, order);
    if (d < bestRecord) {
        bestRecord = d;
        bestPath = order.slice();
        //  console.log(bestRecord);
    }
    order = lexicographicOrder(order);


}
function swap(list, a, b) {
    var temp = list[a];
    list[a] = list[b];
    list[b] = temp;
}

function calDistance(list, order) {
    var sum = 0;
    for (let i = 0; i < list.length - 1; i++) {
        var cityAIndex = order[i];
        var cityA = list[cityAIndex];
        var cityBIndex = order[i + 1];
        var cityB = list[cityBIndex];
        sum += dist(cityA.x, cityA.y, cityB.x, cityB.y);
    }
    return sum;

}

function lexicographicOrder(list) {
    count ++;
    var largestX = -1;
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] < list[i + 1]) {
            //its not to find the largest "element" that is smaller, but the largest index that has a bigger element that is smaller than the next
            largestX = i;

        }
    }

    if (largestX == -1) {
        noLoop();
        console.log('Finished');
    }

    var largestY = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[largestX] < list[i]) {
            largestY = i;
        }
    }

    swap(list, largestX, largestY);

    //STEP 4.

    var endArray = list.splice(largestX + 1);
    endArray.reverse();
    return list = list.concat(endArray);

}

