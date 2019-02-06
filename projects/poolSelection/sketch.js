
var fruits = [];

function Fruit(name, score){
    this.name = name;
    this.score = score;
    this.prob = 0; // javascript here we dont need this
}

function setup(){
    fruits.push(new Fruit('melon', 2));
    fruits.push(new Fruit('banana', 3));
    fruits.push(new Fruit('apple', 4));
    fruits.push(new Fruit('orange', 1));

    var sum = 0; 

    for(var i = 0; i < fruits.length; i++){
        sum += fruits[i].score;
    }

    for(var i = 0; i < fruits.length; i++){
        fruits[i].prob = fruits[i].score/sum;
    }


}

//purely dependent on the random function to pick this time, we don't need an array, we don't need 2 random numbers.
//for selection pool
function pickOne(){
    var index = 0;
    var r = random(1); //0 - 1
    while(r > 0){
        r = r - fruits[index].prob;
        index++;
    }

    return fruits[index--];

}

function draw(){

}