import type { transactionT } from "../../../schemas/walletSchema";
import Spinner from "../../../ui/Spinner";
import { formatDate } from "../../../utils/date";
import { useGetTransactions } from "../../wallet/hooks/useGetTransactions";

const getTransactionTypeTone = (type: string) =>
  type.toLowerCase() === "refund"
    ? "bg-red-100 text-red-600"
    : "bg-primary/10 text-primary";

const TransactionsContent = ({
  walletId,
  supplierName,
  variant = "modal",
}: {
  walletId: string;
  supplierName: string;
  variant?: "modal" | "embedded";
  onCloseModal?: () => void;
}) => {
  const { walletTransactions, isFetchingTransactions, isError } =
    useGetTransactions(walletId);

  if (isFetchingTransactions) {
    return (
      <div
        className={`flex min-h-50 items-center justify-center ${
          variant === "modal" ? "w-[min(92vw,56rem)]" : "w-full"
        }`}
      >
        <Spinner />
      </div>
    );
  }

  const transactions = walletTransactions?.data ?? [];

  return (
    <div
      className={`flex max-w-4xl flex-col gap-5 ${
        variant === "modal" ? "mt-6" : "w-full"
      }`}
    >
      <div className="max-h-[70vh] overflow-y-auto pr-1">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border-green bg-card-green p-4">
            <p className="text-xs font-medium tracking-wide text-light-green uppercase">
              Supplier
            </p>
            <p className="mt-2 text-base font-bold text-deep-green">
              {supplierName}
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

        <div className="mt-5">
          {isError ? (
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
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsContent;
