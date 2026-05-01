import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  freezeUserSchema,
  type freezeUserT,
} from "../../../schemas/adminSchema";
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
    onConfirm(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 pt-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Reason for freezing
        </label>
        <textarea
          {...register("reason")}
          placeholder="Enter reason..."
          className="focus:border-primary focus:ring-primary min-h-25 resize-none rounded-xl border border-gray-300 p-3 text-sm outline-none focus:ring-1"
        />
        {errors.reason && (
          <span className="text-xs text-red-500">{errors.reason.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Days (Leave empty for permanent ban)
        </label>
        <input
          type="number"
          {...register("days", { valueAsNumber: true })}
          placeholder="e.g. 30"
          className="focus:border-primary focus:ring-primary rounded-xl border border-gray-300 p-3 text-sm outline-none focus:ring-1"
        />
        {errors.days && (
          <span className="text-xs text-red-500">{errors.days.message}</span>
        )}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCloseModal}
          className="rounded-xl border border-gray-300 bg-white px-5 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
        <Button
          btnLabel="Freeze Account"
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700"
        />
      </div>
    </form>
  );
};

export default FreezeUserForm;
