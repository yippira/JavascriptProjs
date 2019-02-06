
//these sounds like classes tbh.
function Tree() {
    this.root = null;

}

Tree.prototype.addValue = function (val) {
    var n = new Node(val);
    if (this.root == null) {
        this.root = n;
        this.root.x = width/2;
        this.root.y = 16;
    } else {
        this.root.addNode(n);
    }
}

Tree.prototype.search = function(val){

    return this.root.search(val);

}

Tree.prototype.traverse = function(){
    this.root.visit(this.root);

}
