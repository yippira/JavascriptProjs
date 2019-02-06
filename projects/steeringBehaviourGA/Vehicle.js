var mr = 0.03;
class Vehicle {
    constructor(x, y, dna) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);

        this.r = 6;
        this.maxSpeed = 8;
        this.maxForce = 0.2;


        this.dna = [];
        if (dna === undefined) {
            this.dna[0] = random(-3, 3);
            this.dna[1] = random(-3, 3);
            this.dna[2] = random(0, 100);
            this.dna[3] = random(0, 100);
        } else {
            this.dna[0] = dna[0];
            this.dna[1] = dna[1];
            this.dna[2] = dna[2];
            this.dna[3] = dna[3];
            this.mutate(this.dna);
        }

        this.health = 1;

    }
    mutate(dnaList) {

        for (let i = 0; i < dnaList.length; i++) {
            if (random(1) < mr) {
                if (i == 2 || i == 3) {
                    this.dna[i] += random(-30, 30);
                }
                if (i == 1 || i == 0) {
                    this.dna[i] += random(-0.5, 0.5);
                }
            }
        }
    }

    update() {
        this.health -= 0.005;

        this.velocity.add(this.acceleration);

        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        this.acceleration.mult(0);


    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    seek(target) {
        var desired = p5.Vector.sub(target, this.position); //steer
        desired.setMag(this.maxSpeed);

        var steer = p5.Vector.sub(desired, this.velocity); //craig reynold steering force
        steer.limit(this.maxForce);

        return steer;


    }
    dead() {
        return (this.health < 0);
    }

    behaviours(good, bad) {

        var steerG = this.eat(good, 0.35, this.dna[2] * 2);
        var steerB = this.eat(bad, -0.75, this.dna[3] * 2);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);

    }

    eat(list, nutrition, perception) {

        var record = Infinity;
        var closest = null;
        for (let i = list.length - 1; i >= 0; i--) {
            var d = dist(this.position.x, this.position.y, list[i].x, list[i].y);
            if (d < this.maxSpeed) {
                list.splice(i, 1);
                this.health += nutrition;
            } else {
                if (d < record && d < perception) {
                    record = d;
                    closest = list[i];
                }
            }


        }

        if (closest != null) {
            return this.seek(closest);
        }

        return createVector(0, 0);

    }

    clone() {
        if (random(1) < 0.002) {
            return new Vehicle(this.position.x, this.position.y, this.dna);
        } else {
            return null;
        }
    }

    display() {
        var theta = this.velocity.heading() + PI / 2; //rotate the shape
        // fill(127);
        // stroke(200);

        if (debug.checked()) {


            //perception
            noFill();
            stroke(0, 255, 0);
            ellipse(this.position.x, this.position.y, this.dna[2] * 2);

            noFill();
            stroke(255, 0, 0);
            ellipse(this.position.x, this.position.y, this.dna[3] * 2);
            //perception end



            var rd = color(255, 0, 0);
            var gr = color(0, 255, 0);
            var col = lerpColor(rd, gr, this.health);
            push();
            fill(col);
            stroke(col);
        } else {

            push();
            fill(255);
            stroke(255);
        }


        translate(this.position.x, this.position.y); //to make the shape move
        rotate(theta); //we need to make it rotate
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        if (debug.checked()) {

            //Line
            strokeWeight(3);
            stroke(0, 255, 0);
            line(0, 0, 0, -this.dna[0] * 20);
            strokeWeight(2);
            stroke(255, 0, 0);
            line(0, 0, 0, -this.dna[1] * 20);
        }

        pop();
    }


    boundaries() {
        var d = 25;

        var desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxSpeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxSpeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxSpeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxSpeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxSpeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }

    }
}