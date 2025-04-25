import React, { useContext, useState, useEffect } from 'react'; 
import { ShopContext } from '../context/ShopContext'; 
import { toast } from 'react-toastify'; 
import Title from './Title'; 
import crossIcon from '../assets/cross_icon_white.png'; 
import infoIcon from '../assets/i_icon.png'; 
import { assets } from '../assets/assets';

const CartTotal = () => {
    const { 
        currency, 
        delivery_fee, 
        getCartAmount, 
        location, 
        setLocation, 
        discount, 
        setDiscount, 
        coupon, 
        setCoupon, 
        applyCoupon, 
        getDiscountedAmount 
    } = useContext(ShopContext);

    const [isCouponApplied, setIsCouponApplied] = useState(false);

    useEffect(() => {
        setIsCouponApplied(discount > 0);
    }, [discount]);

    const handleApplyCoupon = async () => {
        if (!coupon) {
            toast.error("Please enter a coupon code.");
            return;
        }

        try {
            const response = await applyCoupon(coupon); // Call applyCoupon function

            if (response.success) {
                setDiscount(response.discount); // Update discount state
                setIsCouponApplied(true);
                toast.success("Coupon applied successfully!");
            } else {
                setIsCouponApplied(false);
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
        }
    };
      
    const handleRemoveCoupon = () => {
        setCoupon(''); 
        setDiscount(0); 
        setIsCouponApplied(false);
        toast.info("Coupon removed");
    };
    
    // Calculate discount amount with a maximum discount of 100
    const discountAmount = () => {
        const calculatedDiscount = (getCartAmount() * discount) / 100;
        return Math.min(calculatedDiscount, 100); // Cap discount at 100 units
    };

    // Calculate the total amount
    const totalAmount = () => {
        const subtotal = getCartAmount();
        const discountedAmount = discount > 0 ? discountAmount() : 0;
        return subtotal - discountedAmount + delivery_fee;
    };

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount().toFixed(2)}</p>
                </div>
                <hr />

                <div className='flex justify-between'>
                    <p>Shipping Location</p>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="inside">Inside Dhaka</option>
                        <option value="outside">Outside Dhaka</option>
                    </select>
                </div>

                <div className='flex justify-between'>
                    <p>Shipping fee</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />

                <div className='flex justify-between items-center'>
                    <p>Coupon</p>
                    <div className='flex items-center'>
                        <input 
                            type="text" 
                            value={coupon} 
                            onChange={(e) => setCoupon(e.target.value)} 
                            className="border p-1 w-40"
                            placeholder="Enter Coupon Code" 
                        />

                        {!isCouponApplied ? (
                            <button 
                                onClick={handleApplyCoupon} 
                                className="hover:bg-[#ff00bf] bg-[#ff2cce] text-white px-3 py-1 ml-2"
                            >
                                Apply
                            </button>
                        ) : (
                            <button 
                                onClick={handleRemoveCoupon} 
                                className="bg-gray-500 text-white px-3 py-1 ml-2 flex items-center"
                            >
                                <img src={crossIcon} alt="Remove coupon" className="w-4 h-4 mr-1 color-white" />
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                {/* Only show discount if discount > 0 */} 
                {discount > 0 && <hr />}
                {discount > 0 && (
                    <div className='flex justify-between items-center'>
                        <div>
                            <p>Discount ({discount}%)</p>
                            <div className="flex items-center mt-1">
                                <img className='w-4 h-4' src={assets.i_icon} alt="Info icon" /> 
                                <p className="text-xs">MAXIMUM DISCOUNT IS {currency}100</p>
                            </div>
                        </div>
                        <p>- {currency} {discountAmount().toFixed(2)}</p>
                    </div>
                )}

                <hr />

                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {totalAmount().toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
