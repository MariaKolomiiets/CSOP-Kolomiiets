import { getAllWorkers, getWorkerByID, PrintWorker, logPrize } from "./functions";
import { UniversityLibrarian, Encyclopedia } from "./classes";
import { Author, Librarian, Worker } from "./interfaces";

// 2.1 Демонстрація роботи з Worker 
console.log(" 2.1 Workers");

//отримуємо всіх робітників 
const allWorkers: Worker[] = getAllWorkers();
console.log("All workers:", allWorkers);

//пошук робітника за id
const worker = getWorkerByID(2);
if (worker) {
    PrintWorker(worker);
} else {
    console.log("Worker not found");
}

// 2.2 Інтерфейс PrizeLogger
console.log("\n 2.2 PrizeLogger");

logPrize("Employee of the Month");

// можемо призначити логер конкретному робітнику якщо такий є
if (worker) {
    worker.markPrize = logPrize;
    worker.markPrize("Best performer");
}

// 2.3 Person, Author, Librarian
console.log("\n2.3 Person, Author, Librarian");

//2.3.4. Оголосіть змінну favoriteAuthor використовуючи інтерфейс Author 
// задайте значення у вигляді літерала об'єкта
const favoriteAuthor: Author = {
    name: "Mykola Khvylovy",
    email: "khvylovy@vaplite.ua",
    numBooksPublished: 13,
};
console.log("Favorite author:", favoriteAuthor);

//2.3.5.Оголосіть змінну favoriteLibrarian використовуючи інтерфейс Librarian
//задайте значення у вигляді літерала об'єкта
//закоментовано 2.4.2
// const favoriteLibrarian: Librarian = {
//     name: "Anna",
//     email: "anna@library.com",
//     department: "History",
//     assistCustomer: (custName: string) => {
//         console.log(`Anna is assisting ${custName}`);
//     },
// };
// favoriteLibrarian.assistCustomer("Ostap");

// 2.4 UniversityLibrarian
console.log("\n 2.4 UniversityLibrarian");

//2.4.2. Закоментуйте код, який відноситься до змінної favoriteLibrarian

//2.4.3. Оголосіть змінну favoriteLibrarian використовуючи інтерфейс Librarian 
 //проініціалізуйте її за допомогою об'єкта, створеного класом UniversityLibrarian()
const favoriteLibrarian: Librarian = new UniversityLibrarian();
//Проініціалізіруйте властивість name і викличте метод assistCustomer().
favoriteLibrarian.name = "Ihor";
favoriteLibrarian.assistCustomer("Maria");

const universityLibrarian = new UniversityLibrarian();
universityLibrarian.name = "Bogdan";
universityLibrarian.email = "bogdan@uni.com";
universityLibrarian.department = "Science";
universityLibrarian.assistCustomer("Oleksii");


console.log("\n2.5-2.7 ReferenceItem and Encyclopedia ");

// 2.5.2: Оголосіть змінну ref і проініціалізіруйте її об'єктом ReferenceItem.
// закоментовано бо після 2.7.1 ReferenceItem тепер абстрактний:
// const ref = new ReferenceItem("Some title", 1995); 
// ref.printItem();

// 2.6.2 Оголосіть змінну refBook і створіть об'єкт Encyclopedia.
const refBook = new Encyclopedia("World Encyclopedia", 2007, 2);
refBook.printItem(); 

// через сеттер задаю видавництво
refBook.publisher = "World Book inc.";
// через геттер отримую видавництво у верхньому регістрі
console.log("Publisher:", refBook.publisher);

// 2.7.3 Виклик реалізованого в класі Encyclopedia абстрактного методу printCitation()
refBook.printCitation();