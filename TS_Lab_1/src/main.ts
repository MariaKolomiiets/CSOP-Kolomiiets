// main.ts

import { 
  logFirstAvailable, 
  getAllWorkers, 
  getWorkersSurnamesByCategory, 
  logWorkersNames, 
  getWorkerByID, 
  checkoutWorkers 
} from "./utils/workerFunctions";
import { createCustomerID, createCustomer } from "./utils/customerFunctions";
import { Category } from "./enums/Category";

console.log("1.1.3.Запустіть функцію getAllWorkers().");
const allWorkers = getAllWorkers();
console.log(allWorkers);

console.log("\n 1.1.5.Запустіть функцію logFirstAvailable():");
logFirstAvailable(allWorkers);

console.log("\n 1.3.2.Виведіть name та surname робітників з категорії Developer:");
allWorkers
  .filter(w => w.category === Category.Developer)
  .forEach(w => console.log(`${w.name} ${w.surname}`));

console.log("\n 1.3.3. Виклик функції getWorkerByID():");
const worker = getWorkerByID(3);
console.log("Worker with ID = 3:", worker);

console.log(" \n 1.4.1. Виклик функції createCustomerID зі значеннями *Ваше ім’я*,*порядковий комер в списку*:");
const myId = createCustomerID("Марія", 10);
console.log("Generated ID:", myId);

console.log("\n 1.4.3. Оголосіть змінну idGenerator, дайте їй функціональний вираз використовуючи стрілочну функцію.:");
let idGenerator = (name: string, id: number): string => `${name}-${id}`;
console.log("Arrow ID:", idGenerator("Марія", 10));

console.log("\n 1.4.4. Присвойте змінній idGenerator функцію createCustomerID() та викличте її:");
idGenerator = createCustomerID;
console.log("Function reference ID:", idGenerator("Марія", 10));

console.log("\n 1.5.1. Викличте функцію createCustomer() з одним, двома і трьома параметрами:");
createCustomer("Любов");
createCustomer("Надія", 20);
createCustomer("Bipa", 22, "Kyiv");

console.log("\n 1.5.2. Викличте getWorkersSurnamesByCategory() без параметра (Category.Designer за замовчуванням):");
const defaultSurnames = getWorkersSurnamesByCategory();
logWorkersNames(defaultSurnames);

console.log("\n 1.5.3. Виклик logFirstAvailable() без параметра (перевірка дефолтного значення):");
logFirstAvailable();

console.log("\n 1.5.5. Оголошення myWorker, виклик checkoutWorkers(*Ваше ім'я*, *Номер за списком*, *Група*, *Хоббі*):");
const myWorkers = checkoutWorkers("Марія", 10, "ПП-32", "videogames");
myWorkers.forEach(name => console.log(name));

console.log("\n Приклад виклику checkoutWorkers(*Приклад*, 1, 2, 4, 55):");
const exmplWorkers = checkoutWorkers("Приклад", 1, 2, 4, 55);
exmplWorkers.forEach(name => console.log(name));