import { validateString, validateNumber } from "./validation";

export function createCustomerID(name: string, id: number): string {
    const validName = validateString(name, "name");
    const validID = validateNumber(id, "id");
    return `${validName}-${validID}`;
}

export const idGenerator: (name: string, id: number) => string =
    (name, id) => createCustomerID(name, id);

export function createCustomer(name: string, age?: number, city?: string): void {
    const validName = validateString(name, "name");
    console.log(`Customer name: ${validName}`);

    if (age !== undefined) {
        console.log(`Age: ${validateNumber(age, "age")}`);
    }

    if (city !== undefined) {
        console.log(`City: ${validateString(city, "city")}`);
    }
}
