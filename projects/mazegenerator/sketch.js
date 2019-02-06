var w = 40;
var rows, cols;
var grid = [];
var current;
var stack = [];

function setup() {
    createCanvas(400, 400);
    frameRate(20);

    rows = width / w;
    cols = height / w;


    for (var j = 0; j < cols; j++) {
        for (var i = 0; i < rows; i++) {

            var cell = new Cell(i, j);
            grid.push(cell);

        }

    }

    current = grid[0];


}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.wall = [true, true, true, true];
    this.visited = false;
}

Cell.prototype.show = function () {

    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    if (this.wall[0]) {
        line(x, y, x + w, y);
    }
    if (this.wall[1]) {
        line(x + w, y, x + w, y + w);
    }
    if (this.wall[2]) {
        line(x, y + w, x + w, y + w);
    }
    if (this.wall[3]) {
        line(x, y, x, y + w);
    }

    if (this.visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);

    }



}

function removeWalls(a, b) {

    var x = a.i - b.i;
    var y = a.j - b.j;
    if (x === 1) {
        a.wall[3] = false;
        b.wall[1] = false;
    } else if (x === -1) {
        a.wall[1] = false;
        b.wall[3] = false;
    }
    if (y === 1) {
        a.wall[0] = false;
        b.wall[2] = false;
    } else if (y === -1) {
        a.wall[2] = false;
        b.wall[0] = false;
    }


}

function index(i, j) {

    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {

        return -1; //Javascript has no array out of bounds exception, if the element doesn't exist, it returns "undefined"
    }

    return i + j * cols; //some formula to find top right bottom left of a non-2d array

}

Cell.prototype.checkNeighbors = function () {

    var neighbors = [];
    var top = grid[index(this.i, this.j - 1)];
    var right = grid[index(this.i + 1, this.j)];
    var bottom = grid[index(this.i, this.j + 1)];
    var left = grid[index(this.i - 1, this.j)];
    console.log(top);
    if (top && !top.visited) {
        neighbors.push(top);
    }
    if (right && !right.visited) {
        neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
        neighbors.push(bottom);
    }
    if (left && !left.visited) {
        neighbors.push(left);
    }

    if (neighbors.length > 0) {

        var r = floor(random(0, neighbors.length));
        return neighbors[r]; //choose random neighbor to go to.
    } else {
        return undefined;
    }
}

Cell.prototype.highlight = function(){

    noStroke();
    fill(0,255,0,100);
    rect(this.i * w, this.j * w, w, w);

}

function draw() {
    background(51);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
//https://en.wikipedia.org/wiki/Maze_generation_algorithm
    current.visited = true;
    //step 1
    var next = current.checkNeighbors(); // won't go to neighbors that are already visited
    if (next) {
        
        next.visited = true; 

        //step 2
        //do stack
        stack.push(current);


        //step 3
        removeWalls(current, next); //removing the walls that are separating current and next

        //step 4
        current = next;
    }else if(stack.length > 0){
        current = stack.pop();
    }
    current.highlight();

}