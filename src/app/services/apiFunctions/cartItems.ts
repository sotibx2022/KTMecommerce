import axios from "axios";
export const fetchCartFromDatabase = async () => {
    try {
      const response = await axios.get("/api/cart/cartItems");
      return response.data.cartItems;
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };