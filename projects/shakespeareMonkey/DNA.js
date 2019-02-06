//Author : Pereira
//Referencing The Nature Of Code by Daniel Shiffman

//Attempt at genetic algorithm, evolving shakespeare


//Some notes to take note first: 
/*

There are 3 "types" of genetic algorithms where solutions evolves.
    1. Traditional genetic algorithms where instead of brute forcing, we
    are able to tell whether a generated solution is getting closer to the intended
    outcome. Whether it is cold, hot , how fit?

    2. Interactive selection : This is where human/external input comes in
    We manually decide if a solution is more preferred than another.
    This can speed up and manually pick the selection pool.

    3. Ecosystem simulation : Pretty much simulating the real world's evolutions



*/

//Class for creating pseduo-DNA, i.e. Genotype (Data structure to represent gene)
//In this case, a DNA is an array of character
//Functionalities:

// -- Convert DNA to string
// -- Calculate DNA's fitness
// -- mate DNA with another set of DNA (At random half points)
// -- mutate DNA (introducing variables)



//3 Points for Genetic algorithms
/*      
        1. Heredity - Process in which properties of children are passover
        2. Variation - Variety of traits in the population/mutation to introduce variation
        3. Selection - Some passes their properties, some do not. A fitter monkey will spread.


*/

function newChar() { //gets a new character
    let c = floor(random(63, 122));
    if (c === 63) c = 32; //replacing ?
    if (c === 64) c = 46; //replacing @

    return String.fromCharCode(c); //function to get char from int
}



class DNA { //introduced from ecma6

    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < num; i++) {
            this.genes[i] = newChar(); //pick a random character for our DNA sequence.
        }
    }

    getOutput() { //basically joins an array of characters into String.
        return this.genes.join("");
    }

    //Important, this is the function that will change based on the problem.
    //Fitness function.
    calcFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) { //character is same at spot
                score++;
            }
        }
        this.fitness = score / target.length; //up to you
    }

    //mating
    crossover(partner) {
        //offspring
        let child = new DNA(this.genes.length); //here can improve efficiency as no need to generate random char
        let midpoint = floor(random(this.genes.length));

        //part and part from each other
        for (let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            }else{
                child.genes[i] = partner.genes[i]; //literally spreading half
            }
        }
        return child;
    }

    mutate(mutationRate){ //every single gene (Character) has mutation rate.
        for(let i = 0; i < this.genes.length; i++){
            if(random(1) < mutationRate){
                this.genes[i] = newChar();
            }
        }
    }

}