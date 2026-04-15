import { useCart } from "../../cart/hooks/useCart";
import useGetOrderById from "./useGetOrderById";

type SummaryItem = {
  id: number;
  productName: string;
  productImage?: string;
  quantity: number;
  totalPrice: number;
};

type Props = {
  orderId?: string | null;
  selectedShippingPrice?: number;
};

// 🔁 تحويل cart items → شكل موحد
const mapCartItems = (items: SummaryItem[]): SummaryItem[] =>
  items.map((item) => ({
    id: item.id,
    productName: item.productName,
    productImage: item.productImage,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
  }));

// 🔁 تحويل order items → نفس الشكل
const mapOrderItems = (items: SummaryItem[]): SummaryItem[] =>
  items.map((item) => ({
    id: item.id,
    productName: item.productName || "Unknown product",
    productImage: item.productImage || "",
    quantity: item.quantity,
    totalPrice: item.totalPrice,
  }));

const useOrderSummaryData = ({ orderId, selectedShippingPrice = 0 }: Props) => {
  const { cart, isFetchingCart } = useCart();
  const { order, isFetchingOrder } = useGetOrderById(orderId || "");

  const isOrder = !!orderId;

  // ✅ Order mode
  if (isOrder) {
    const data = order?.data;

    return {
      items: mapOrderItems(data?.items || []),
      subtotal: data?.subTotal || 0,
      shipping: data?.deliveryFee || 0,
      total: data?.totalPrice || 0,
      isLoading: isFetchingOrder,
    };
  }

  // ✅ Cart mode
  const cartData = cart?.data;

  return {
    items: mapCartItems(cartData?.items || []),
    subtotal: cartData?.totalPrice || 0,
    shipping: selectedShippingPrice,
    total: (cartData?.totalPrice || 0) + selectedShippingPrice,
    isLoading: isFetchingCart,
  };
};

export default useOrderSummaryData;
