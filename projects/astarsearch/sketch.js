
//to create a grid, use the following steps


var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path;
var noSolution;

function removeFromArray(arr, elt) {
    for (var i = arr.length; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1); //o(n) function
        }
    }

}

function heuristic(a, b) {
    var d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;

}

function setup() {
    // put setup code here
    createCanvas(400, 400);
    w = width / cols;
    h = height / rows;

    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows); //creating 2d array for grid here
    }

    //now we populate the grid with spot objects with properties.

    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            grid[x][y] = new Spot(x, y);

        }

    }

    //this was kinda making it hard for myself, maybe try redoing it .

    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            var current = grid[x][y];

            if (x + 1 < cols) {
                current.neighbors.push(grid[x + 1][y]);
            }
            if (x - 1 >= 0) {

                current.neighbors.push(grid[x - 1][y]);
            }
            if (y + 1 < rows) {
                current.neighbors.push(grid[x][y + 1]);
            }
            if (y - 1 >= 0) {
                current.neighbors.push(grid[x][y - 1]);
            }
            if (x + 1 < cols && y + 1 < rows) {
                current.neighbors.push(grid[x + 1][y + 1]);
            }
            if (x - 1 >= 0 && y - 1 >= 0) {
                current.neighbors.push(grid[x - 1][y - 1]);
            }
            if (x - 1 >= 0 && y + 1 < rows) {
                current.neighbors.push(grid[x - 1][y + 1]);
            }
            if (x + 1 < cols && y - 1 >= 0) {
                current.neighbors.push(grid[x + 1][y - 1]);
            }


        }

    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    start.wall = false;
    end.wall = false;

    openSet.push(start); // by algorithm, we need an openset and close set. Open set is stuff we've checked already
}




function Spot(x, y) {
    this.x = x;
    this.y = y;

    this.f = 0; //score
    this.h = 0; //heuristics function to estimate the cost of cheapest path from n to goal 
    this.g = 0; //cost from start to n

    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if (random(1) < 0.2) { //20% chance of happening
        this.wall = true;

    }


    this.show = function (col) {
        fill(col);
        if (this.wall) {
            fill(0);

        }
        rect(this.x * w, this.y * h, w - 1, h - 1); //(x coordinate, y coordinate, width, height)
        //noStroke();

    }

}

function draw() {


    //algorithm here
    if (openSet.length > 0) {
        var winner = 0; //assume winner is first
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) { //lower f score is better! So if the current i is lower than winner, we replace.
                winner = i;
            }
        }

        var current = openSet[winner];

        //finding the path
        if (openSet[winner] === end) {

            noLoop();
            console.log("Done!");
        }

        //otherwise, it means that this current one is processed and we can don't care alr.
        closedSet.push(current);
        removeFromArray(openSet, current);
        //remove the current one from the openSet because it is discovered and evaluated
        // openSet.
        var neighbors = current.neighbors;
        //now we are adding the "cost" and computing g
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {// neighbor should not be inside the closed set
                var tempG = current.g + 1;
                //now check if its something we evaluated before.
                if (openSet.includes(neighbor)) {
                    //see if this is a better g, did we get it more efficiently.
                    var newPath = false;
                    if (tempG < neighbor.g) {
                        newPath = true;
                        neighbor.g = tempG;
                    }
                } else {
                    newPath = true;
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end); //estimation of score from "next step" till the end
                    //now the score
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    } else {
        noSolution = true;
        console.log("No solutions");
        noLoop();
    }


    //Drawing the original grids
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            grid[x][y].show(color(255));
        }
    }

    //openset
    for (var x = 0; x < openSet.length; x++) {
        openSet[x].show(color(0, 255, 0));
    }

    //closeSet
    for (var x = 0; x < closedSet.length; x++) {
        closedSet[x].show(color(255, 0, 0));
    }
    if (!noSolution) {
        path = [];
        var temp = current; //end
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
    }
    for (var x = 0; x < path.length; x++) {
        path[x].show(color(0, 0, 255));
    }




}