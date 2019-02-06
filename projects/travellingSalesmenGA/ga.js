function calculateFitness() {
    var current = Infinity;

    for (let i = 0; i < populationSize; i++) {
        population[i] = shuffle(order);
        let d = calDistance(cities, population[i]);
        fitness[i] = 1 / (d + 1);
        if (d < bestRecord) {
            bestRecord = d;
            bestPath = population[i];
        }
        if (d < current) {
            current = d;
            currentBest = population[i];
        }
    }
}

function normaliseFitness() {
    var sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration() {
    var newPopulation = [];

    for (let i = 0; i < population.length; i++) {
        var order1 = pickOne(population, fitness);
        var order2 = pickOne(population, fitness);
        var order = crossover(order1, order2);
        mutate(order);
        newPopulation[i] = order;


    }

    population = newPopulation;

}

function pickOne(list, prob) {
    var index = 0;
    var r = random(1); //0 - 1
    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();

}

function mutate(list) {

    for (let i = 0; i < list.length; i++) {
        if (random(1) < mutationRate) {
            var firstCity = floor(random(numOfCities));
            var secondCity = firstCity + 1;
            if (secondCity >= list.length) {
                secondCity = firstCity - 1;
            }
            swap(list, firstCity, secondCity);
        }
    }
}

function crossover(orderA, orderB) {
    var start = floor(random(orderA.length));
    var end = floor(random(start + 1, orderA.length));
    var newOrder = orderA.slice(start, end);

    var left = numOfCities - newOrder.length;

    for (let i = 0; i < orderB.length; i++) {
        var city = orderB[i];
        if (!newOrder.includes(city)) {
            newOrder.push(city);
        }
    }
    return newOrder;
}