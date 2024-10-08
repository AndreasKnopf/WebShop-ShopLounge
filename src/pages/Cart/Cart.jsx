import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import styles from "./Cart.module.css";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";

export default function Cart() {
  const { cartItems, setCartItems, addToCart, removeFromCart, removeProduct } = useContext(CartContext);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  if (cartItems.length === 0) {
    return <p className={styles.cartEmpty}>Ihr Warenkorb ist leer.</p>;
  }

  const handleCheckout = () => {
    if (loggedInUser) {
      setCartItems([]);
      localStorage.removeItem("cartItems");
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.cartWrapper}>
      <h1>Warenkorb</h1>
      <CartSummary totalItems={totalItems} totalPrice={totalPrice} handleCheckout={handleCheckout} />
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.itemNumber} className={styles.cartItem}>
            <div className={styles.imageBox}>
              <img src={item.image1} alt={item.productName} />
            </div>
            <h2>{item.productName}</h2>
            <div className={styles.itemInfo}>
              <p>ArtikelNr.: {item.itemNumber}</p>
              <p>Preis: {item.price} €</p>
              <p>Anzahl: {item.quantity}</p>
              <p>Gesamt: {(item.price * item.quantity).toFixed(2)} €</p>

              <div className={styles.quantityControls}>
                <div>
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <button onClick={() => removeProduct(item)} className={styles.removeButton}>
                  Produkt entfernen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
