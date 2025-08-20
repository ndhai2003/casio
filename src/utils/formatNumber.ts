
export function formatNumber(num: number) {
    const s = num.toFixed(12);
    const trimmed = s.replace(/\.0+$|0+$/g, "").replace(/\.$/, "");
    return trimmed.length > 16 ? Number(num.toPrecision(10)).toString() : trimmed;
}