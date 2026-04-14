import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import type { ReactNode } from "react";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

type CustomSelectProps<T extends string = string> = {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
};

const CustomSelect = <T extends string = string>({
  options,
  value,
  onChange,
  icon,
  placeholder = "Select an option",
  className = "",
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-left transition focus:outline-none ${
          isOpen
            ? "border-primary ring-primary ring-1"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          {icon && (
            <span className="pointer-events-none flex shrink-0 text-gray-400">
              {icon}
            </span>
          )}
          <span className="truncate text-sm text-gray-800">
            {selected?.label ?? placeholder}
          </span>
        </span>
        <IoChevronDown
          className={`ml-2 shrink-0 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
          aria-hidden
        />
      </button>

      {isOpen && (
        <ul
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
          role="listbox"
        >
          {options.map(({ value: optValue, label }) => (
            <li key={optValue} role="option" aria-selected={value === optValue}>
              <button
                type="button"
                className={`w-full px-4 py-2.5 text-left text-sm transition ${
                  value === optValue
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => {
                  onChange(optValue);
                  setIsOpen(false);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
