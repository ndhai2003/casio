export type Op = "+" | "-" | "×" | "÷";

export type Action =
    | { type: "digit"; payload: string }
    | { type: "decimal" }
    | { type: "operator"; payload: Op }
    | { type: "equals" }
    | { type: "clear" }
    | { type: "toggleSign" }
    | { type: "percent" }
    | { type: "backspace" };

export type State = {
    display: string;
    operand: number | null;
    operator: Op | null;
    waitingForSecond: boolean;
    justEvaluated: boolean;
};