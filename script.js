const targetName = "Yeremia";
const populationSize = 100;
const mutationRate = 0.01;

function randomIndividual(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let individual = "";
    for (let i = 0; i < length; i++) {
        individual += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return individual;
}

function calculateFitness(individual) {
    let score = 0;
    for (let i = 0; i < individual.length; i++) {
        if (individual[i] === targetName[i]) {
            score++;
        }
    }
    return score / targetName.length;
}

function crossover(parent1, parent2) {
    const midpoint = Math.floor(Math.random() * parent1.length);
    return parent1.slice(0, midpoint) + parent2.slice(midpoint);
}

function mutate(individual) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let mutated = "";
    for (let i = 0; i < individual.length; i++) {
        if (Math.random() < mutationRate) {
            mutated += chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
            mutated += individual[i];
        }
    }
    return mutated;
}

function geneticAlgorithm() {
    const targetNameInput = document.getElementById("targetNameInput").value.trim();
    const targetName = targetNameInput || "Yeremia";
    const populationSize = 100;
    const mutationRate = 0.01;

    let population = [];
    for (let i = 0; i < populationSize; i++) {
        population.push(randomIndividual(targetName.length));
    }

    let generation = 0;
    let found = false;

    const output = document.getElementById("output");
    output.innerHTML = "";

    while (!found) {
        generation++;
        const fitnessScores = population.map(individual => ({
            individual,
            fitness: calculateFitness(individual, targetName)
        }));

        fitnessScores.sort((a, b) => b.fitness - a.fitness);

        if (fitnessScores[0].fitness === 1) {
            found = true;
            const generationElement = document.createElement("div");
            generationElement.textContent = `Generasi ${generation}: ${fitnessScores[0].individual} (Selesai!)`;
            output.appendChild(generationElement);
            break;
        }

        const generationElement = document.createElement("div");
        generationElement.textContent = `Generasi ${generation}: ${fitnessScores[0].individual}`;
        output.appendChild(generationElement);

        const matingPool = fitnessScores.slice(0, populationSize / 2);

        population = [];
        for (let i = 0; i < populationSize; i++) {
            const parent1 = matingPool[Math.floor(Math.random() * matingPool.length)].individual;
            const parent2 = matingPool[Math.floor(Math.random() * matingPool.length)].individual;
            let offspring = crossover(parent1, parent2);
            offspring = mutate(offspring);
            population.push(offspring);
        }
    }
}

function calculateFitness(individual, targetName) {
    let score = 0;
    for (let i = 0; i < individual.length; i++) {
        if (individual[i] === targetName[i]) {
            score++;
        }
    }
    return score / targetName.length;
}

document.getElementById("startButton").addEventListener("click", geneticAlgorithm);

function validateInput() {
    const input = document.getElementById("targetNameInput");
    input.value = input.value.replace(/[^a-zA-Z]/g, "");
}