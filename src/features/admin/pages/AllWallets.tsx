import { LuCalendar, LuCircleAlert, LuEye, LuWallet } from "react-icons/lu";
import type { walletT } from "../../../schemas/walletSchema";
import { formatDate } from "../../../utils/date";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import SEO from "../../../ui/SEO";
import { useGetAllWallets } from "../../wallet/hooks/useGetAllWallets";
import TransactionsContent from "../ui/TransactionsContent";

const AllWallets = () => {
  const { walletsData, isFetchingWallets, isError } = useGetAllWallets();

  if (isFetchingWallets) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const walletsList = walletsData?.data || [];

  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO title="Supplier Wallets" />
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Supplier Wallets
        </h1>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <Modal>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="px-4 py-4 font-medium">Supplier</th>
                <th className="px-4 py-4 font-medium">Balance</th>
                <th className="px-4 py-4 font-medium">Last Updated</th>
                <th className="px-4 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isError ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[#6b7280]">
                    Something went wrong while loading wallets.
                  </td>
                </tr>
              ) : walletsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[#6b7280]">
                    No wallets found.
                  </td>
                </tr>
              ) : (
                walletsList.map((wallet: walletT, index: number) => {
                  const walletIdentifier = wallet.walletId ?? wallet.supplierId;

                  return (
                    <tr
                      key={`${wallet.supplierId}-${index}`}
                      className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebf5f0]">
                            <LuWallet size={18} />
                          </div>
                          <span className="text-dark font-semibold">
                            {wallet.supplierName}
                          </span>
                        </div>
                      </td>
                      <td className="text-dark px-4 py-4 font-bold">
                        {wallet.balance.toLocaleString()} EGP
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-dark flex items-center gap-2 font-bold">
                          <LuCalendar size={16} className="text-gray-400" />
                          {formatDate(wallet.lastUpdatedAt, "en-GB")}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-3">
                          {walletIdentifier ? (
                            <>
                              <Modal.Open
                                opens={`transactions-${walletIdentifier}`}
                              >
                                <button
                                  className="bg-primary hover:bg-secondary flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors"
                                  title="View transactions"
                                >
                                  <LuEye size={16} />
                                  History Transactions
                                </button>
                              </Modal.Open>

                              <Modal.Window
                                name={`transactions-${walletIdentifier}`}
                                icon={
                                  <LuCircleAlert
                                    size={24}
                                    className="text-primary"
                                  />
                                }
                                title="Wallet Transactions"
                                description={`Review the transaction history for ${wallet.supplierName}.`}
                              >
                                <TransactionsContent
                                  walletId={walletIdentifier}
                                  supplierName={wallet.supplierName||''}
                                />
                              </Modal.Window>
                            </>
                          ) : (
                            <span className="text-xs text-[#9ca3af]">
                              No wallet reference
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default AllWallets;
