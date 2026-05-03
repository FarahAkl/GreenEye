import {
  LuArrowUpRight,
  LuCalendar,
  LuClock3,
  LuPlus,
  LuWallet,
} from "react-icons/lu";
import type { transactionT } from "../../../schemas/walletSchema";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import SEO from "../../../ui/SEO";
import { formatDate } from "../../../utils/date";
import { useGetSupplierWallet } from "../../wallet/hooks/useGetSupplierWallet";
import { useGetTransactions } from "../../wallet/hooks/useGetTransactions";
import WithdrawalForm from "../ui/WithdrawalForm";

const getTransactionTypeTone = (type: string) =>
  type.toLowerCase() === "refund"
    ? "bg-red-100 text-red-600"
    : "bg-primary/10 text-primary";

const SupplierWallet = () => {
  const { wallet, isFetchingWallet, isError } = useGetSupplierWallet();

  const {
    walletTransactions,
    isFetchingTransactions,
    isError: isTransactionsError,
  } = useGetTransactions();

  if (isFetchingWallet) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !wallet?.data) {
    return (
      <div className="flex flex-col gap-6 p-2">
        <SEO title="Wallet" />
        <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
          <h1 className="text-xl font-semibold tracking-wide text-white">
            Wallet
          </h1>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-600">
          Something went wrong while loading your wallet.
        </div>
      </div>
    );
  }

  const walletData = wallet.data;
  const transactions = walletTransactions?.data ?? [];

  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO
        title="Wallet"
        description="View your wallet balance, transaction history, and create withdrawal requests."
      />

      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Wallet
        </h1>
      </div>

      <div className="rounded-3xl border border-border-green bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Balance + Withdrawal button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pale-green">
                <LuWallet size={24} />
              </div>
              <div>
                <p className="text-sm font-medium tracking-wide text-light-green uppercase">
                  Available Balance
                </p>
                <p className="mt-1 text-xl font-bold text-deep-green">
                  {walletData.balance.toLocaleString()} EGP
                </p>
              </div>
            </div>

            <Modal>
              <Modal.Open opens="create-withdrawal">
                <button className="bg-primary flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition-all hover:brightness-110">
                  <LuPlus size={16} />
                  Create Withdrawal
                </button>
              </Modal.Open>

              <Modal.Window
                name="create-withdrawal"
                icon={<LuArrowUpRight size={24} className="text-primary" />}
                title="Create Withdrawal"
                description="Submit a withdrawal request to transfer money from your wallet."
              >
                <WithdrawalForm />
              </Modal.Window>
            </Modal>
          </div>

          {/* Stat cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border-green bg-card-green p-4">
              <p className="text-xs font-medium tracking-wide text-light-green uppercase">
                Last Updated
              </p>
              <div className="mt-2 flex items-center gap-2 text-deep-green">
                <LuCalendar size={16} className="text-gray-400" />
                <span className="font-semibold">
                  {formatDate(walletData.lastUpdatedAt, "en-GB")}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-border-green bg-card-green p-4">
              <p className="text-xs font-medium tracking-wide text-light-green uppercase">
                Wallet Status
              </p>
              <div className="mt-2 flex items-center gap-2 text-deep-green">
                <LuClock3 size={16} className="text-gray-400" />
                <span className="font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border-green bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-deep-green">
              Transactions
            </h2>
            <p className="text-sm text-light-green">
              Review your wallet transaction history.
            </p>
          </div>
        </div>

        <>
          {isFetchingTransactions ? (
            <div className="flex min-h-50 w-full items-center justify-center">
              <Spinner />
            </div>
          ) : isTransactionsError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-600">
              Something went wrong while loading wallet transactions.
            </div>
          ) : transactions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-dashed-green bg-panel-green px-6 py-10 text-center">
              <p className="font-semibold text-deep-green">
                No transactions found
              </p>
              <p className="mt-2 text-sm text-light-green">
                This wallet does not have any transaction history yet.
              </p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border-green bg-card-green p-4">
                  <p className="text-xs font-medium tracking-wide text-light-green uppercase">
                    Supplier ID
                  </p>
                  <p className="mt-2 text-base font-bold text-deep-green">
                    {walletData.supplierId ?? "Current Supplier"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border-green bg-card-green p-4">
                  <p className="text-xs font-medium tracking-wide text-light-green uppercase">
                    Transactions
                  </p>
                  <p className="mt-2 text-base font-bold text-deep-green">
                    {transactions.length}
                  </p>
                </div>
              </div>

              <div className="space-y-3 md:hidden">
                {transactions.map(
                  (transaction: transactionT, index: number) => (
                    <div
                      key={`${transaction.createdAt}-${transaction.type}-${index}`}
                      className="rounded-2xl border border-border-green bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getTransactionTypeTone(transaction.type)}`}
                        >
                          {transaction.type}
                        </span>
                        <span className="text-sm font-bold text-deep-green">
                          {transaction.amount.toLocaleString()} EGP
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-deep-green">
                        {transaction.description}
                      </p>
                      <div className="mt-3 grid gap-2 text-sm text-muted-green">
                        <p>
                          Order:{" "}
                          <span className="font-medium text-deep-green">
                            {transaction.orderId
                              ? `#${transaction.orderId}`
                              : "N/A"}
                          </span>
                        </p>
                        <p>
                          Created:{" "}
                          <span className="font-medium text-deep-green">
                            {formatDate(transaction.createdAt, "en-GB")}
                          </span>
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="hidden overflow-x-auto rounded-2xl border border-border-green md:block">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-card-green text-gray-600">
                    <tr className="border-b border-border-green">
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                      <th className="px-4 py-3 font-medium">Order</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(
                      (transaction: transactionT, index: number) => (
                        <tr
                          key={`${transaction.createdAt}-${transaction.type}-${index}`}
                          className="border-b border-row-border last:border-b-0"
                        >
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getTransactionTypeTone(transaction.type)}`}
                            >
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-deep-green">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-3 font-medium text-deep-green">
                            {transaction.orderId
                              ? `#${transaction.orderId}`
                              : "N/A"}
                          </td>
                          <td className="px-4 py-3 font-bold text-deep-green">
                            {transaction.amount.toLocaleString()} EGP
                          </td>
                          <td className="px-4 py-3 text-deep-green">
                            {formatDate(transaction.createdAt, "en-GB")}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default SupplierWallet;
