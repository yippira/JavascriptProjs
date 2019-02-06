var cities = [];
var bestPath = [];
var population = [];
var order = [];
var fitness = [];
var currentBest = [];

var populationSize = 500;
var numOfCities = 10;
var mutationRate = 0.06;
var bestRecord = Infinity;


function setup() {
    createCanvas(800, 1000);

    for (let i = 0; i < numOfCities; i++) {
        var x = random(0, width - 50);
        var y = random(0, (height / 2) - 50);
        cities.push(createVector(x, y));
        order.push(i); //giving order to cities
    }

 
    
}
function draw() {

    background(0);


    calculateFitness();
    normaliseFitness();
    nextGeneration();


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

    translate(0, height/2);
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(4);
    for (var i = 0; i < currentBest.length; i++) {
        var n = currentBest[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();





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
