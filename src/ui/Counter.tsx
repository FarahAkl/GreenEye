import { useState } from "react";

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string | null;
  onChange?: (value: number) => void;
}

const Counter = ({
  initialValue = 1,
  min = 0,
  max = 999,
  step = 1,
  label = null,
  onChange,
}: CounterProps) => {
  const [value, setValue] = useState<number>(initialValue);

  const update = (next: number): void => {
    const clamped = Math.min(max, Math.max(min, next));
    setValue(clamped);
    onChange?.(clamped);
  };

  const btnBase =
    "w-10 h-14 rounded-2xl text-dark flex items-center justify-center text-2xl border border-gray-100 font-bold transition-all duration-150 select-none";
  const btnActive =
    "shadow-md hover:bg-stone-50 active:scale-95 cursor-pointer";
  const btnDisabled = "bg-stone-200 text-stone-700 cursor-not-allowed";

  return (
    <div className="flex w-full items-center justify-between gap-0  bg-white/70 rounded-2xl">
      {label && (
        <span className="pr-1 pl-3 text-sm font-medium uppercase">{label}</span>
      )}

      <button
        onClick={() => update(value + step)}
        disabled={value >= max}
        type="button"
        className={`${btnBase} ${value >= max ? btnDisabled : btnActive}`}
      >
        +
      </button>

      <div className="px-1 text-center">
        <span className="text-xl font-semibold text-stone-400">{value}</span>
      </div>

      <button
        onClick={() => update(value - step)}
        disabled={value <= min}
        type="button"
        className={`${btnBase} ${value <= min ? btnDisabled : btnActive}`}
      >
        −
      </button>
    </div>
  );
};

export default Counter;
