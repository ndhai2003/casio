"use client";
import { Op } from "@/types/calculator.type";
import { formatNumber } from "@/utils/formatNumber";
import operate from "@/utils/operate";
import { useEffect, useReducer } from "react";


type State = { display: string; operand: number | null; operator: Op | null; waiting: boolean; justEq: boolean; };
type Action =
    | { type: "digit"; v: string } | { type: "dot" } | { type: "op"; v: Op }
    | { type: "eq" } | { type: "ac" } | { type: "neg" } | { type: "pct" } | { type: "bksp" };

const init: State = { display: "0", operand: null, operator: null, waiting: false, justEq: false };

function reducer(s: State, a: Action): State {
    switch (a.type) {
        case "ac": return init;

        case "digit": {
            if (s.justEq) return { ...init, display: a.v === "0" ? "0" : a.v };
            if (s.waiting) return { ...s, display: a.v, waiting: false };
            if (s.display === "0") return { ...s, display: a.v };
            if (s.display.replace("-", "").length >= 16) return s;
            return { ...s, display: s.display + a.v };
        }
        case "dot": {
            if (s.justEq) return { ...init, display: "0." };
            if (s.waiting) return { ...s, display: "0.", waiting: false };
            if (s.display.includes(".")) return s;
            return { ...s, display: s.display + "." };
        }
        case "neg": {
            if (s.display === "0") return s;
            return { ...s, display: s.display.startsWith("-") ? s.display.slice(1) : "-" + s.display };
        }
        case "pct": return { ...s, display: formatNumber(Number(s.display) / 100), justEq: true };
        case "bksp": {
            if (s.justEq || s.waiting) return s;
            const t = s.display.length <= 1 || (s.display.length === 2 && s.display.startsWith("-")) ? "0" : s.display.slice(0, -1);
            return { ...s, display: t === "-" ? "0" : t };
        }
        case "op": {
            const cur = Number(s.display);

            // Đang chờ số thứ 2 mà đổi toán tử -> chỉ thay operator
            if (s.operator && s.waiting) {
                return { ...s, operator: a.v };
            }

            // Sau khi bấm '=' hoặc mới bắt đầu (chưa có operator/operand)
            if (s.operator == null || s.operand == null || s.justEq) {
                return {
                    ...s,
                    operand: cur,
                    operator: a.v,
                    waiting: true,
                    justEq: false,
                };
            }

            // Có phép đang chờ -> tính trước rồi set operator mới
            const r = operate(s.operand, cur, s.operator); // s.operator chắc chắn non-null ở đây
            return {
                display: Number.isNaN(r) ? "Error" : formatNumber(r),
                operand: Number.isNaN(r) ? null : r,
                operator: a.v,
                waiting: true,
                justEq: Number.isNaN(r),
            };
        }
        case "eq": {
            if (!s.operator || s.operand == null) return { ...s, justEq: true };
            const r = operate(s.operand, Number(s.display), s.operator);
            return { display: isNaN(r) ? "Error" : formatNumber(r), operand: isNaN(r) ? null : r, operator: null, waiting: false, justEq: true };
        }
    }
}

export function useCalculator() {
    const [state, dispatch] = useReducer(reducer, init);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const k = e.key;
            if (/^[0-9]$/.test(k)) return void dispatch({ type: "digit", v: k });
            if (k === ".") return void dispatch({ type: "dot" });
            if (k === "+") return void dispatch({ type: "op", v: "+" });
            if (k === "-") return void dispatch({ type: "op", v: "-" });
            if (k === "*" || k.toLowerCase() === "x") return void dispatch({ type: "op", v: "×" });
            if (k === "/") return void dispatch({ type: "op", v: "÷" });
            if (k === "Enter" || k === "=") return void dispatch({ type: "eq" });
            if (k === "Escape" || k.toLowerCase() === "c") return void dispatch({ type: "ac" });
            if (k === "%") return void dispatch({ type: "pct" });
            if (k === "Backspace") return void dispatch({ type: "bksp" });
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return { state, dispatch };
}
