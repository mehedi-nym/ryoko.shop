import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '৳';
    const [location, setLocation] = useState('inside');
    const delivery_fee = location === 'inside' ? 60 : 120;
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [discount, setDiscount] = useState(0);
    const [coupon, setCoupon] = useState('');
    const validCoupons = { "SAVE10": 10, "OFF20": 20 };

    // Add to Cart Function
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size First');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    // Update quantity function
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        // If quantity is 0, remove the item from the cart
        if (quantity === 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size];

                // If no sizes remain for the item, remove the item itself
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            // Otherwise, update the quantity
            if (cartData[itemId]) {
                cartData[itemId][size] = quantity;
            } else {
                cartData[itemId] = { [size]: quantity };
            }
        }

        setCartItems(cartData); // Update the state
    };

    // Get total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    };

    // Get total item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                totalCount += cartItems[items][size];
            }
        }
        return totalCount;
    };

    // Apply coupon code
    const applyCoupon = () => {
        if (validCoupons[coupon]) {
            setDiscount(validCoupons[coupon]); // Set the discount amount
            return { success: true, discount: validCoupons[coupon] }; // Return success response
        } else {
            setDiscount(0); // Reset the discount if the coupon is invalid
            return { success: false, message: "Invalid coupon code" }; // Return error response
        }
    };

    // Remove coupon and reset discount
    const removeCoupon = () => {
        setCoupon('');   // Clear the coupon input
        setDiscount(0);  // Reset the discount
        toast.info("Coupon removed"); // Notify user
    };

    // Get the discounted amount
    const getDiscountedAmount = () => {
        const cartAmount = getCartAmount(); // Get the original cart amount
        const discountAmount = (cartAmount * discount) / 100; // Calculate the discount
        return cartAmount - discountAmount; // Return the cart amount after applying the discount
    };

    const value = {
        products,
        currency,
        delivery_fee,
        location,
        setLocation,
        discount,
        setDiscount,
        coupon,
        setCoupon,
        applyCoupon,
        removeCoupon,    // Added removeCoupon for coupon removal
        cartItems,
        addToCart,
        updateQuantity,  // Added updateQuantity here
        getCartAmount,
        getDiscountedAmount,
        getCartCount,     // Added here for use in Navbar
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
