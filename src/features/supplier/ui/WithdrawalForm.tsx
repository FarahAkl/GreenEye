import { useState } from "react";
import Button from "../../../ui/Button";
import { useCreateWithdrawal } from "../../wallet/hooks/useCreateWithdrawal";

const WithdrawalForm = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const { createWithdrawal, isCreating } = useCreateWithdrawal();
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createWithdrawal(
      {
        amount: Number(amount),
        bankAccount,
      },
      {
        onSuccess: () => {
          setAmount("");
          setBankAccount("");
          onCloseModal?.();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex w-[min(92vw,30rem)] flex-col gap-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-deep-green">Amount</label>
        <input
          type="number"
          min={1}
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="focus:ring-primary/30 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-emerald-600 focus:ring-2"
          placeholder="Enter withdrawal amount"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-deep-green">
          Bank Account
        </label>
        <input
          type="text"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          required
          className="focus:ring-primary/30 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-emerald-600 focus:ring-2"
          placeholder="Enter your bank account number"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          btnLabel="Cancel"
          type="button"
          variant="outline"
          color="secondary"
          onClick={() => onCloseModal?.()}
        />
        <Button
          btnLabel={isCreating ? "Creating..." : "Create Withdrawal"}
          type="submit"
          disabled={isCreating}
        />
      </div>
    </form>
  );
};

export default WithdrawalForm;
