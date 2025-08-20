import { Op } from "@/types/calculator.type";


export default function operate(a: number, b: number, op: Exclude<Op, null>) {
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "×":
            return a * b;
        case "÷":
            if (b === 0) return NaN; // handled as "Error"
            return a / b;
    }
}