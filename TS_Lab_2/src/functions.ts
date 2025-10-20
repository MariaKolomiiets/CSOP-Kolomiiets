import { Worker, PrizeLogger } from "./interfaces";
import { getAllWorkers } from "./data";

export { getAllWorkers };

// 2.1.3. функція getWorkerByID(), вкажіть тип отримуваного значення,
// використовуючи інтерфейс Worker
export function getWorkerByID(id: number): Worker | undefined {
    const workers = getAllWorkers();
    return workers.find(worker => worker.id === id);
}

// 2.1.4  функція PrintWorker(), яка на вхід приймає робітника і виводить фразу в консоль 
export function PrintWorker(worker: Worker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}

// 2.2.3 Визначіть змінну logPrize використовуючи інтерфейс PrizeLogger.
//Створіть функцію, яка задовольняє цьому інтерфейсу, присвойте оголошену змінну. 
export const logPrize: PrizeLogger = (prize: string) => {
    console.log(`Prize: ${prize}`);
};


