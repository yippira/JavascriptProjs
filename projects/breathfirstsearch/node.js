function Node(value){
    this.value = value;
    this.edges = [];
    this.parent = null;
    this.searched = false;
}

Node.prototype.getTitle = function(){
    return this.value;

}

Node.prototype.addEdge = function(neighbor){
    this.edges.push(neighbor);
    neighbor.edges.push(this);

}
        