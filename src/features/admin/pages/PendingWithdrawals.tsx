import {
  LuCalendar,
  LuCheck,
  LuCircleAlert,
  LuX,
  LuWallet,
  LuBanknote,
} from "react-icons/lu";
import Spinner from "../../../ui/Spinner";
import Modal from "../../../ui/Modal";
import SEO from "../../../ui/SEO";
import type { pendingWithdrawalT } from "../../../schemas/adminSchema";
import { formatDate } from "../../../utils/date";
import { useGetWithdrawals } from "../hooks/useGetWithdrawals";
import { useApproveWithdrawals } from "../hooks/useApproveWithdrawal";
import { useRejectWithdrawal } from "../hooks/useRejectWithdrawal";
import RejectionForm from "../ui/RejectionForm";

const PendingWithdrawals = () => {
  const { pendingWithdrawals, isFetchingWithdrawals, isFetching } =
    useGetWithdrawals();
  const { approveWithdrawal, isApproving } = useApproveWithdrawals();
  const { rejectWithdrawal, isRejecting } = useRejectWithdrawal();

  if (isFetchingWithdrawals || isFetching) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const withdrawalsList = pendingWithdrawals?.data || [];

  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO title="Pending Withdrawal Requests" />
      {/* Header */}
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Pending Withdrawals
        </h1>
      </div>

      {/* Table Area */}
      <div className="mt-4 w-full overflow-x-auto">
        <Modal>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="px-4 py-4 font-medium">Wallet</th>
                <th className="px-4 py-4 font-medium">Amount</th>
                <th className="px-4 py-4 font-medium">Bank Account</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Created At</th>
                <th className="px-4 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalsList?.length === 0 || withdrawalsList === null ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#6b7280]">
                    No pending withdrawal requests found.
                  </td>
                </tr>
              ) : (
                withdrawalsList.map((withdrawal: pendingWithdrawalT) => (
                  <tr
                    key={withdrawal.id}
                    className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ebf5f0]">
                          <LuWallet size={18} />
                        </div>
                        <span className="text-dark font-semibold">
                          {withdrawal.walletId}
                        </span>
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      <div className="flex items-center gap-1">
                        <LuBanknote size={16} className="text-gray-400" />
                        {withdrawal.amount.toLocaleString()} EGP
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-medium">
                      {withdrawal.bankAccount}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        {withdrawal.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-bold">
                        <LuCalendar size={16} className="text-gray-400" />
                        {formatDate(withdrawal.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          disabled={isApproving}
                          onClick={() =>
                            approveWithdrawal({
                              withdrawalRequestId: withdrawal.id,
                              params: {
                                bankTransferNumber: withdrawal.bankAccount,
                              },
                            })
                          }
                          className="bg-secondary hover:bg-secondary/80 flex items-center justify-center rounded-lg p-1.5 text-white shadow-sm transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <LuCheck size={18} />
                        </button>

                        <Modal.Open opens={`reject-${withdrawal.id}`}>
                          <button
                            className="flex items-center justify-center rounded-lg bg-red-500 p-1.5 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                            title="Reject"
                          >
                            <LuX size={18} />
                          </button>
                        </Modal.Open>

                        {/* Reject Modal */}
                        <Modal.Window
                          name={`reject-${withdrawal.id}`}
                          icon={
                            <LuCircleAlert size={24} className="text-red-500" />
                          }
                          title="Reject Withdrawal"
                          description={`Are you sure you want to reject withdrawal of ${withdrawal.amount.toLocaleString()} EGP?`}
                        >
                          <RejectionForm
                            isSubmitting={isRejecting}
                            onConfirm={(rejectedReason) =>
                              rejectWithdrawal({
                                withdrawalRequestId: withdrawal.id,
                                params: { rejectedReason },
                              })
                            }
                            placeholder="Please explain why this withdrawal is being rejected..."
                          />
                        </Modal.Window>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default PendingWithdrawals;
