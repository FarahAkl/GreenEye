import { useState } from "react";
import Button from "../../../ui/Button";

interface RejectionFormProps {
  onConfirm: (reason: string) => void;
  isSubmitting: boolean;
  onCloseModal?: () => void;
  label?: string;
  placeholder?: string;
}

const RejectionForm = ({
  onConfirm,
  isSubmitting,
  onCloseModal,
  label = "Rejection Reason",
  placeholder = "Please explain why this is being rejected...",
}: RejectionFormProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    onConfirm(reason);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-2 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
          placeholder={placeholder}
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      <div className="mt-2 flex justify-end gap-3">
        <Button
          variant="outline"
          color="primary"
          btnLabel="Cancel"
          onClick={onCloseModal}
          disabled={isSubmitting}
          className="h-10!"
        />
        <Button
          variant="filled"
          color="danger"
          btnLabel={isSubmitting ? "Rejecting..." : "Confirm Reject"}
          type="submit"
          disabled={isSubmitting || !reason}
          className="h-10!"
        />
      </div>
    </form>
  );
};

export default RejectionForm;
