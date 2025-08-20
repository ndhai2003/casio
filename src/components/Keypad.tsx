"use client";
import { DeleteIcon } from "lucide-react";
import { Key } from "./Key";
import type { Op } from "@/types/calculator.type";

export type KeypadPressType =
    | "digit" | "dot" | "op" | "eq"
    | "ac" | "neg" | "pct" | "bksp";

export type OnPress = (type: KeypadPressType, value?: string) => void;

type Props = { onPress: OnPress; activeOp?: Op | null }; // 👈 thêm

export default function Keypad({ onPress, activeOp }: Props) {


    return (
        <div className="relative z-10 grid grid-cols-4 gap-3 md:gap-4">
            {/* hàng 1 */}
            <Key label="AC" ariaLabel="clear" kind="util" onClick={() => onPress("ac")} />
            <Key label="±" ariaLabel="toggle sign" kind="util" onClick={() => onPress("neg")} />
            <Key label="%" ariaLabel="percent" kind="util" onClick={() => onPress("pct")} />
            <Key label="÷" ariaLabel="divide" kind="op" active={activeOp === "÷"} onClick={() => onPress("op", "÷")} />

            {/* hàng 2 */}
            {["7", "8", "9"].map(n => (
                <Key key={n} label={n} ariaLabel={`digit ${n}`} kind="num" onClick={() => onPress("digit", n)} />
            ))}
            <Key label="×" ariaLabel="multiply" kind="op" active={activeOp === "×"} onClick={() => onPress("op", "×")} />

            {/* hàng 3 */}
            {["4", "5", "6"].map(n => (
                <Key key={n} label={n} ariaLabel={`digit ${n}`} kind="num" onClick={() => onPress("digit", n)} />
            ))}
            {/* chú ý: state lưu '-' (ASCII), label hiển thị '−' cũng được */}
            <Key label="−" ariaLabel="minus" kind="op" active={activeOp === "-"} onClick={() => onPress("op", "-")} />

            {/* hàng 4 */}
            {["1", "2", "3"].map(n => (
                <Key key={n} label={n} ariaLabel={`digit ${n}`} kind="num" onClick={() => onPress("digit", n)} />
            ))}
            <Key label="+" ariaLabel="plus" kind="op" active={activeOp === "+"} onClick={() => onPress("op", "+")} />

            {/* hàng 5 */}
            <Key label="0" ariaLabel="digit 0" kind="num" className="col-span-2" onClick={() => onPress("digit", "0")} />
            <Key label="." ariaLabel="decimal" kind="num" onClick={() => onPress("dot")} />
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Key label={<DeleteIcon color="red" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />} ariaLabel="backspace" kind="util" onClick={() => onPress("bksp")} />
                <Key label="=" ariaLabel="equals" kind="eq" onClick={() => onPress("eq")} />
            </div>
        </div>
    );
}
