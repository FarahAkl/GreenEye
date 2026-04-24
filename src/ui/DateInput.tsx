import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { FiCalendar } from "react-icons/fi";

interface DateInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  className?: string;
}

const formatDateValue = (date: Date | null) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDateValue = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
};

const DateInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select date",
  error,
  disabled,
  minDate = new Date(),
  className,
}: DateInputProps<T>) => {
  return (
    <div className={`mb-4 flex flex-col gap-2 ${className}`}>
      {label && <p className="px-3 text-gray-600 font-medium">{label}</p>}
      <div
        className={`border-gray-300 bg-white/50 ${
          error ? "border-2 border-red-600" : ""
        } ${
          disabled ? "bg-gray-50 text-gray-400" : ""
        } focus-within:border-primary focus-within:ring-primary flex items-center rounded-3xl border px-3 py-2.5 transition-all focus-within:ring-1`}
      >
        <span className="pointer-events-none mx-3 flex items-center text-gray-400">
          <FiCalendar size={18} />
        </span>

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={parseDateValue(value)}
              onChange={(date: Date | null) => onChange(formatDateValue(date))}
              placeholderText={placeholder}
              minDate={minDate}
              disabled={disabled}
              className="block w-full bg-transparent p-1 text-dark placeholder-gray-400 placeholder:text-sm focus:outline-none"
              dateFormat="MMMM d, yyyy"
              autoComplete="off"
              calendarClassName="premium-calendar"
              nextMonthButtonLabel=">"
              previousMonthButtonLabel="<"
            />
          )}
        />
      </div>
      {error && <p className="mt-1 px-3 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DateInput;
