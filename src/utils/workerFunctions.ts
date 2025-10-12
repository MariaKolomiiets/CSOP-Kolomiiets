import { Worker } from "../interfaces/Worker";
import { Category } from "../enums/Category";
import { getAllWorkers } from "../data/workers";
import { validateNumber, validateString, validateArray, validateWorker, validateWorkerID } from "./validation";

export function logFirstAvailable(workers: Worker[] = getAllWorkers()): void { 
    const validWorkers = workers.filter(validateWorker);
    console.log(`Total workers: ${validWorkers.length}`);

    const firstAvailable = validWorkers.find(w => w.available);
    if (firstAvailable) {
        console.log(`First available: ${firstAvailable.name} ${firstAvailable.surname}`);
    }

    console.log("All workers:");
    for (const worker of validWorkers) {
        console.log(`\`${worker.name} ${worker.surname}\` - ${worker.available ? "available" : "not available"}`);
    }
}


export function getWorkersSurnamesByCategory(category: Category = Category.Designer): string[] {
    const workers = getAllWorkers().filter(validateWorker);
    return workers
        .filter(w => w.category === category)
        .map(w => w.surname);
}

export function logWorkersNames(names: string[]): void {
    const validatedNames = validateArray<string>(names, "names");
    validatedNames.forEach(name => console.log(name));
}

export function getWorkerByID(id: number): Worker | undefined {
    const validID = validateNumber(id, "id");
    const worker = getAllWorkers().find(w => w.id === validID);
    if (worker && validateWorker(worker)) return worker;
    console.warn(`No worker found with id ${id}`);
    return undefined;
}

export type WorkerID = number | string;

export function checkoutWorkers(
    customer: string,
    ...workerIDs: (number | string)[]
): string[] {
    console.log(`Customer: ${customer}`);

    const availableWorkers: string[] = [];

    workerIDs.forEach((id, index) => {
        const validID = validateWorkerID(id, `workerIDs[${index}]`);
        if (validID !== null) {
            const worker: Worker | undefined = getWorkerByID(validID);

            if (worker?.available) {
                availableWorkers.push(`${worker.name} ${worker.surname}`);
            } 
        }
    });

    if (availableWorkers.length === 0) {
        console.log("Немає доступних робітників");
    }

    return availableWorkers;
}


export { getAllWorkers };
