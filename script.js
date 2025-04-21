const DEFAULT_TARGET_NAME = "Yeremia";
const DEFAULT_POPULATION_SIZE = 100;
const DEFAULT_MUTATION_RATE = 0.01;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomIndividual(length, chars = CHARACTERS) {
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

function calculateFitness(individual, targetName) {
    return individual.split("").reduce((score, char, i) => score + (char === targetName[i] ? 1 : 0), 0) / targetName.length;
}

function crossover(parent1, parent2) {
    const midpoint = Math.floor(Math.random() * parent1.length);
    return parent1.slice(0, midpoint) + parent2.slice(midpoint);
}

function mutate(individual, mutationRate = DEFAULT_MUTATION_RATE, chars = CHARACTERS) {
    return individual
        .split("")
        .map(char => (Math.random() < mutationRate ? chars.charAt(Math.floor(Math.random() * chars.length)) : char))
        .join("");
}

function geneticAlgorithm() {
    const targetNameInput = document.getElementById("targetNameInput").value.trim();
    const targetName = targetNameInput || DEFAULT_TARGET_NAME;

    let population = Array.from({ length: DEFAULT_POPULATION_SIZE }, () => randomIndividual(targetName.length));
    let generation = 0;
    let found = false;

    const output = document.getElementById("output");
    output.innerHTML = "";

    while (!found) {
        generation++;
        const fitnessScores = population.map(individual => ({
            individual,
            fitness: calculateFitness(individual, targetName),
        }));

        fitnessScores.sort((a, b) => b.fitness - a.fitness);

        if (fitnessScores[0].fitness === 1) {
            found = true;
            output.innerHTML += `Generasi ke-${generation}: ${fitnessScores[0].individual} (Selesai!)\n`;
            break;
        }

        output.innerHTML += `Generasi ke-${generation}: ${fitnessScores[0].individual}\n`;

        const matingPool = fitnessScores.slice(0, DEFAULT_POPULATION_SIZE / 2);

        population = Array.from({ length: DEFAULT_POPULATION_SIZE }, () => {
            const parent1 = matingPool[Math.floor(Math.random() * matingPool.length)].individual;
            const parent2 = matingPool[Math.floor(Math.random() * matingPool.length)].individual;
            return mutate(crossover(parent1, parent2));
        });
    }
}

function validateInput() {
    const input = document.getElementById("targetNameInput");
    input.value = input.value.replace(/[^a-zA-Z]/g, "");
}

document.getElementById("startButton").addEventListener("click", geneticAlgorithm);