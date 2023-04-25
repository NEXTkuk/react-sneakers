import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./RightSide.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function RightSide({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      // const { data } = await axios.post("https://6436b5c23e4d2b4a12d99c95.mockapi.io/orders", {
      //   items: cartItems,
      // });

      const orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
      // const newOrder = [...orders, cartItems];

      setOrderId(orders.length + 1);

      const newOrder = [...orders, cartItems];
      localStorage.setItem("orders", JSON.stringify(newOrder));

      // setOrderId(data.id);
      // setIsOrderComplete(true);

      await delay(1000);
      setCartItems([]);

      // for (let i = 0; i < cartItems.length; i++) {
      //   const item = cartItems[i];
      //   await axios.delete("https://642d4369bf8cbecdb40169ba.mockapi.io/cart/" + item.id);
      //   await delay(1000);
      // }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    // <div
    //   className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}
    //   onClick={(e) => e.target.className === "overlayVisible" && onClose()}
    //   onClick={console.log("ok")}
    // >

    <div
      className={`${styles.overlay} ${opened ? styles.overlayVisible : "overlay"}`}
      onClick={(e) => e.target.className.includes("overlayVisible") && onClose()}
    >
      <div className={styles.rightSide}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="./img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div style={{ backgroundImage: `url(${obj.imgUrl})` }} className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className="removeBtn" src="./img/btn-remove.svg" alt="Remove" />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice * 0.05} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="./img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "./img/complete-order.jpg" : "./img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default RightSide;
