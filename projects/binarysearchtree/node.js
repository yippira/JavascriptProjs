
function Node(val, x, y) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;

    this.distance = 2;

}

//Have to return the method of the recursive call in order to properly work.
Node.prototype.search = function (val) {

    if (this.value == val) {
        return this;
    } else if (this.value < val && this.right != null) {
        return this.right.search(val);

    } else if (this.value > val && this.left != null) {
        return this.left.search(val);
    }

    return null;

}

Node.prototype.visit = function (parent) {

    if (this.left != null) {
        this.left.visit(this);
    }
    console.log(this.value);

    //Line
    stroke(100);
    line(parent.x, parent.y, this.x, this.y);


    //Ellipse
    stroke(255);
    fill(0);
    ellipse(this.x, this.y, 24, 24);
    noStroke();
    //Text
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(this.value, this.x, this.y + 4);




    if (this.right != null) {
        this.right.visit(this);
    }
}

//We need recursion in order to solve nodes that are already filled.
Node.prototype.addNode = function (n) {

    if (n.value < this.value) {
        if (this.left == null) {
            this.left = n;


            this.left.x = this.x - (width / pow(2, n.distance));
            this.left.y = this.y + (height/ 12);
        } else {
            n.distance++;
            this.left.addNode(n);
        }
    } else if (n.value > this.value) {
        if (this.right == null) {
            this.right = n;
            this.right.x = this.x + (width/pow(2, n.distance));
            this.right.y = this.y + (height /12);
        } else {
            n.distance++;
            this.right.addNode(n);
        }
    }

}