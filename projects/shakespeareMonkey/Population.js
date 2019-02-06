
// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

//Like how dna has many genes, population has many dna

class Population {
    constructor(p,m, num) {


        this.population;
        this.matingPool;
        this.generations = 0;
        this.finished = false;
        this.target = p;
        this.mutationRate = m;
        this.perfectScore = 1;

        this.best = ""; //best specimen so far

        this.population = [];
        for (let i = 0; i < num; i++) {
            this.population[i] = new DNA(this.target.length);
        }
        this.matingPool = [];
        this.generateFitness();

    }

    // Fill our fitness array with a value for every member of the population
    //Uses the fitness calculator in DNA (Each organism)
    generateFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(target);
            
        }
    }

    //Generate the mating pool, can optimise this later
    naturalSelection() {
        this.matingPool = [];

        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }

        //Now basically probabilities in order to determine number of times to add to array
        //based on fitness

        for (let i = 0; i < this.population.length; i++) {
            let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }

        }

    }
    //creates a new generation here
    generate() {
      // Refill the population with children from the mating pool
        
        for(let i = 0; i < this.population.length; i ++){
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];

            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate); // generate mutations

            this.population[i] = child;

        }
        this.generations++;
    }

    getBest() {
        return this.best;
    }

    evaluate(){

        let record = 0.0;
        let index = 0;
        for(let i = 0; i < this.population.length; i ++){

            if(this.population[i].fitness > record){
                index = i;
                record = this.population[i].fitness;
            }
        }

        this.best = this.population[index].getOutput(); //best index best output
        if(record === this.perfectScore){
            this.finished = true;
        }

    }

    isFinished(){
        return this.finished;
    }

    getGenerations(){
        return this.generations;
    }

    getAverageFitness(){
        let total = 0;
        for(let i = 0; i < this.population.length; i ++){
            total += this.population[i].fitness;
        }
        return total/this.population.length;
    }

    allPhrases(){
        let everything = "";
        let displayLimit = min(this.population.length, 50);

        for(let i = 0; i < displayLimit; i++){
            everything += this.population[i].getOutput() + "<br>";
        }
        return everything;
    }
}