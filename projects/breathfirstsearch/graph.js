//oop syntax basically.
function Graph(){
    this.nodes = [];
    this.end = null;
    this.start = null;
    this.graph = {}; //this acts like a hash    

}

Graph.prototype.reset = function(){

    for(var i = this.nodes.length; i >= 0; i --){
        this.nodes[i].searched = false;
        this.nodes[i].parent = null;

    }

}   

Graph.prototype.setStart = function(start){
    this.start = start;
    return this.start;

}

Graph.prototype.setEnd = function(end){
    this.end = end;
    return this.end;

}

Graph.prototype.addNode = function(node){

    this.nodes.push(node);
    var title = node.getTitle();
    graph[title] = node;


}

Graph.prototype.getNode = function(actor){
    var n = this.graph[actor];
    return n;
}

