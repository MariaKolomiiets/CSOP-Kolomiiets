import { Worker } from "../interfaces/Worker";
import { Category } from "../enums/Category";

export function validateWorker(worker: unknown): worker is Worker {
    if (
        typeof worker === "object" && worker !== null &&
        "id" in worker && typeof (worker as Worker).id === "number" &&
        "name" in worker && typeof (worker as Worker).name === "string" &&
        "surname" in worker && typeof (worker as Worker).surname === "string" &&
        "available" in worker && typeof (worker as Worker).available === "boolean" &&
        "salary" in worker && typeof (worker as Worker).salary === "number" &&
        "category" in worker && Object.values(Category).includes((worker as Worker).category)
    ) {
        return true;
    }
    console.error("Invalid worker data:", worker);
    return false;
}

export function validateWorkerID(value: string | number, paramName: string): number | null {
    if (typeof value === "number") {
        return value;
    } else if (typeof value === "string") {
        const id = Number(value);
        if (isNaN(id)) {
            console.warn(`Invalid ${paramName}: cannot convert string to number, skipped`);
            return null;
        }
        return id;
    } else {
        console.warn(`Invalid ${paramName}: must be a number or numeric string, skipped`);
        return null;
    }
}


export function validateString(value: unknown, paramName: string): string {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`Invalid string value for "${paramName}"`);
    }
    return value;
}

export function validateNumber(value: unknown, paramName: string): number {
    if (typeof value !== "number" || isNaN(value)) {
        throw new Error(`Invalid number value for "${paramName}"`);
    }
    return value;
}

export function validateArray<T>(value: unknown, paramName: string): T[] {
    if (!Array.isArray(value)) {
        throw new Error(`Invalid array for "${paramName}"`);
    }
    return value as T[];
}
