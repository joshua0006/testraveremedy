import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  unitPrice: number;
  quantity: number;
  flavor: string;
  priceId?: string; // Add optional priceId field
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  applyVoucher: (code: string) => void;
  discountAmount: number;
  discountPercentage: number;
  isVoucherValid: boolean;
  voucherMessage: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [isVoucherValid, setIsVoucherValid] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState('');
  
  // Valid voucher code constants
  const VALID_VOUCHER_CODE = 'neverstopraving';
  const DISCOUNT_PERCENTAGE = 10;
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('raveRemedyCart');
    const savedVoucher = localStorage.getItem('raveRemedyVoucher');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    
    if (savedVoucher) {
      try {
        const voucher = JSON.parse(savedVoucher);
        setVoucherCode(voucher.code);
        setIsVoucherValid(voucher.isValid);
        setDiscountPercentage(voucher.percentage);
        setVoucherMessage(voucher.message);
      } catch (error) {
        console.error('Failed to parse voucher from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('raveRemedyCart', JSON.stringify(cart));
  }, [cart]);
  
  // Save voucher to localStorage whenever it changes
  useEffect(() => {
    if (voucherCode || isVoucherValid) {
      localStorage.setItem('raveRemedyVoucher', JSON.stringify({
        code: voucherCode,
        isValid: isVoucherValid,
        percentage: discountPercentage,
        message: voucherMessage
      }));
    }
  }, [voucherCode, isVoucherValid, discountPercentage, voucherMessage]);
  
  const applyVoucher = (code: string) => {
    if (code.toLowerCase() === VALID_VOUCHER_CODE) {
      setIsVoucherValid(true);
      setDiscountPercentage(DISCOUNT_PERCENTAGE);
      setVoucherMessage(`${DISCOUNT_PERCENTAGE}% discount applied!`);
    } else if (code.trim() === '') {
      setIsVoucherValid(false);
      setDiscountPercentage(0);
      setVoucherMessage('Please enter a voucher code');
    } else {
      setIsVoucherValid(false);
      setDiscountPercentage(0);
      setVoucherMessage('Invalid voucher code');
    }
  };
  
  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.flavor === item.flavor
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        // Add new item if it doesn't exist
        return [...prevCart, item];
      }
    });
    
    // Removed automatic cart opening behavior
    // setIsCartOpen(true);
  };
  
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  
  // Calculate discount amount
  const discountAmount = isVoucherValid ? Math.round(cartTotal * (discountPercentage / 100)) : 0;
  
  // Calculate total number of items
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      voucherCode,
      setVoucherCode,
      applyVoucher,
      discountAmount,
      discountPercentage,
      isVoucherValid,
      voucherMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};