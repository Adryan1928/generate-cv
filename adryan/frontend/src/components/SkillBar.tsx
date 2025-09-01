export function SkillBar({ level }: { level: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
                <div
                    key={num}
                    className={`h-3 w-3 rounded-full ${num <= level ? "bg-neutral-50" : "border-1 border-neutral-50"}`}
                />
            ))}
        </div>
    )
}