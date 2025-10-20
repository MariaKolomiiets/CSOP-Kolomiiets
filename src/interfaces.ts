// 2.1.1 інтерфейс Worker
export interface Worker {
    id: number; 
    name: string; 
    surname: string; 
    available: boolean; 
    salary: number; 
    markPrize?: PrizeLogger; // опціональна функція 
}

// 2.2.1 інтерфейс PrizeLogger
export interface PrizeLogger {
    (prize: string): void; // приймає один строковий параметр і нічого не повертає.
}

// 2.3.1 базовий інтерфейс Person
export interface Person {
    name: string;
    email: string;
}

//2.3.2 інтерфейс Author на основі інтерфейсу Person
export interface Author extends Person {
    numBooksPublished: number; 
}

// 2.3.3 інтерфейс Librarian на основі інтерфейсу Person
export interface Librarian extends Person {
    department: string; 
    assistCustomer(custName: string): void;
}
