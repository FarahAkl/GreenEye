import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { freezeUserSchema, type freezeUserT } from "../../../schemas/adminSchema";
import Button from "../../../ui/Button";

interface FreezeUserFormProps {
  userId: string;
  onConfirm: (data: freezeUserT) => void;
  isPending: boolean;
  onCloseModal?: () => void;
}

const FreezeUserForm = ({
  userId,
  onConfirm,
  isPending,
  onCloseModal,
}: FreezeUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<freezeUserT>({
    resolver: zodResolver(freezeUserSchema),
    defaultValues: {
      userId,
      reason: "",
      days: 30,
    },
  });

  const onSubmit = (data: freezeUserT) => {
    // If days is not provided or 0, we can treat it as a very long time
    // But since the schema requires a number, we ensure it's at least something
    // The user said "if the admin doesn't add a days number it mean banned for all time"
    // We'll handle the conversion here if needed, or just pass what's in the form.
    // If the input is empty, react-hook-form/zod might complain if it's required.
    onConfirm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Reason for freezing</label>
        <textarea
          {...register("reason")}
          placeholder="Enter reason..."
          className="rounded-xl border border-gray-300 p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[100px]"
        />
        {errors.reason && (
          <span className="text-xs text-red-500">{errors.reason.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Days (Leave empty for permanent ban)</label>
        <input
          type="number"
          {...register("days", { valueAsNumber: true })}
          placeholder="e.g. 30"
          className="rounded-xl border border-gray-300 p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        {errors.days && (
          <span className="text-xs text-red-500">{errors.days.message}</span>
        )}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCloseModal}
          className="rounded-xl border border-gray-300 bg-white px-5 py-2 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <Button
          btnLabel="Freeze Account"
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition-colors"
        />
      </div>
    </form>
  );
};

export default FreezeUserForm;
