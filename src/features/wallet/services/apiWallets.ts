import { isAxiosError } from "axios";
import axiosInstance from "../../../services/axiosInstance";
import type { withdrawalRequestT } from "../../../schemas/walletSchema";

export const getAllWallets = async () => {
  const res = await axiosInstance.get(`/api/Wallet/all-wallets`);
  return res.data;
};

export const getSupplierWallet = async () => {
  const res = await axiosInstance.get(`/api/Wallet/supplier/wallet`);
  return res.data;
};

export const getWalletTransactions = async (walletId?: string) => {
  const res = await axiosInstance.get(`/api/Wallet${walletId?`/${walletId}`:''}/transactions`);
  return res.data;
};

export const createWithdrawal = async (data: withdrawalRequestT) => {
  try {
    const res = await axiosInstance.post("/api/Wallet/create-withdrawal", data);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      throw new Error(message);
    }
    throw err;
  }
};