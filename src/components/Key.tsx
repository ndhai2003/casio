"use client";
import { memo, ReactNode } from "react";

type Kind = "num" | "op" | "util" | "eq";

export type KeyProps = {
    label: ReactNode;
    ariaLabel?: string;
    kind?: Kind;
    className?: string;
    onClick?: () => void;
    active?: boolean;
};

function classes(kind: Kind = "num", extra = "", active = false) {
    const base =
        "inline-flex items-center justify-center leading-none w-full " +
        "select-none rounded-2xl text-xl md:text-2xl font-medium h-14 md:h-16 " +
        "shadow-sm active:scale-[0.98] transition";
    const byKind =
        kind === "num"
            ? "bg-white/70 dark:bg-white/10 backdrop-blur border border-white/30 hover:bg-white/80 dark:hover:bg-white/15"
            : kind === "op"
                ? "bg-blue-500/90 hover:bg-blue-500 text-white"
                : kind === "util"
                    ? "bg-zinc-200/70 dark:bg-zinc-700/70 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white";
    const activeCls =
        active
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "";
    return [base, byKind, activeCls, extra].filter(Boolean).join(" ");
}

function KeyImpl({ label, ariaLabel, kind = "num", className, onClick, active = false }: KeyProps) {


    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={classes(kind, className, active)}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export const Key = memo(KeyImpl);
