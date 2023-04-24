import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
  const { items, favorites, cartItems } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      {favorites.length === 0 ? (
        <div className="d-flex justify-center flex-wrap ">
          <div className={"d-flex justify-center flex-column align-center"}>
            <img src="img/empty-favorites.svg" alt="Грустно" width={70} height={70} />

            <h2>{"Закладок нет :("}</h2>
            <div className="no-item opacity-6 ">{"Вы ничего не добавляли в закладки"}</div>
            <Link to="/">
              <button className="greenButton">
                <img src="./img/arrow.svg" alt="Arrow" />
                Вернутся назад
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {items.map(
            (item) =>
              favorites.includes(item.id) && (
                <Card key={item.id} item={item} isFavorite cartItem={cartItems.find((i) => i.id === item.id)} />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Favorites;
