var data;
var graph;
var dropdown;

function preload() { //seems like a lifecycle method

    data = loadJSON('kevinbacon.json');
}

function setup() {

    noCanvas();
    dropdown = createSelected();
    dropdown.changed(bfs);

    //setup the data

    graph = new Graph();

    var movies = data.movies; //to access json data just use dot operator.

    for (movie in movies) { //traverse data
        var title = movie.title;
        var cast = movie.cast;

        var movieNode = new Node(title);


        graph.addNode(node);


        for (actor in cast) {
            // here we need to see if the actor node has already been added.
            var actorNode = graph.getNode(actor);
            if (actorNode == undefined) {
                actorNode = new Node(actor);
                graph.addNode(actorNode);
            }
            movieNode.addEdge(actorNode);
        }
    }
}

function bfs() {
    graph.reset();

    var start = graph.setStart(dropdown.value());
    var end = graph.setEnd('Kevin Bacon');


    var queue = [];

    start.searched = true;

    queue.push(start);

    while (queue.length > 0) {
        var current = queue.shift();
        if (current == end) {
            console.log("Found Kevin Bacon");
            break;
        }
        var edges = current.edges;
        for (node in edges) {
            if (!node.searched) {
                node.searched = true;
                node.parent = current;
                queue.push(node);
            }
        }

    }

    var path = [];
    path.push(end);
    var next = end.parent;

    while(next != null){
        path.push(next);
        next = end.parent;
    }

    var txt = '';

    for(var i = path.length; i >= 0; i --){
        var current = path[i];
        txt += current.value;
        
        if(i != 0){
        txt += '-->';
        }


    }

    createP(txt);



}