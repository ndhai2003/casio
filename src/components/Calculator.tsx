"use client";
import Display from "@/components/Display";
import Keypad from "@/components/Keypad";
import { useCalculator } from "@/hooks/useCalculator";


export default function Calculator() {
    const { state, dispatch } = useCalculator();
    return (
        <div className="relative rounded-3xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl backdrop-blur p-4 md:p-6">
            <div className="absolute -inset-x-2 -top-2 h-24 bg-gradient-to-r from-blue-400/50 via-indigo-400/40 to-fuchsia-400/50 blur-2xl opacity-60 pointer-events-none" />

            <Display value={state.display} />
            <Keypad
                activeOp={state.waiting ? state.operator : null}
                onPress={(t, v) => {
                    if (t === "digit") return dispatch({ type: "digit", v: v! });
                    if (t === "dot") return dispatch({ type: "dot" });
                    if (t === "op") return dispatch({ type: "op", v: v as any });
                    if (t === "eq") return dispatch({ type: "eq" });
                    if (t === "ac") return dispatch({ type: "ac" });
                    if (t === "neg") return dispatch({ type: "neg" });
                    if (t === "pct") return dispatch({ type: "pct" });
                    if (t === "bksp") return dispatch({ type: "bksp" });
                }} />
            <div className="relative z-10 mt-4 text-center text-lg text-zinc-500 dark:text-zinc-400">
                <span>Máy tính cầm tay - Nguyễn Đình Hải</span>
            </div>
        </div>
    );
}