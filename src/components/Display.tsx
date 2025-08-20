type DisplayProps = { value: string };

export default function Display({ value }: DisplayProps) {
    return (
        <div className="relative z-10 mb-4 md:mb-6">
            <div className="text-right text-4xl md:text-5xl font-semibold tracking-tight break-all min-h-[2.5rem]">
                {value}
            </div>
        </div>
    );
}
