import { Librarian } from "./interfaces";

// 2.4.1 клас UniversityLibrarian, який реалізує інтерфейс Librarian
export class UniversityLibrarian implements Librarian {
    name: string = "";
    email: string = "";
    department: string = "";

    assistCustomer(custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }
}

// 2.5 клас ReferenceItem (зроблений абстрактним у 2.7)
export abstract class ReferenceItem {
    // protected year: number; // закоментовано після 2.5.3
    // public title: string;   // закоментовано після 2.5.3
    private _publisher: string = "";      
    static department: string = "Default Department"; //статичне рядкове властивість department і проініціалізіруйте його будь-яким значенням за замовчуванням

    //2.5.3.Закоментуйте конструктор, властивості title і year 
    //і реалізуйте створення властивостей через параметри конструктора
    // constructor(newTitle: string, newYear: number) {
    //     console.log("Creating a new ReferenceItem ...");
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    // властивості через параметри конструктора
    //2.6.3.змініть модифікатор доступу year на protected - доступний для підкласів
    constructor(public title: string, protected year: number) {
        console.log("Creating a new ReferenceItem ...");
    }

    // геттер: повертає _publisher у верхньому регістрі
    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    // сеттер: встановлює _publisher
    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    // метод printItem() виводить title, year і статичну department
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    // 2.7.2 абстрактний метод - реалізується в підкласі
    abstract printCitation(): void;
}

// 2.6.1 клас Encyclopedia - нащадок ReferenceItem
export class Encyclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number) {
        super(title, year);
    }

    // 2.6.3 Перевизначення printItem() - робить те ж саме + вивід edition
    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    // 2.7.3 реалізація абстрактного методу printCitation()
    printCitation(): void {
        console.log(`\n ${this.title} - ${this.year}`);
    }
}
