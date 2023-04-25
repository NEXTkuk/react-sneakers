import React from "react";

import AppContext from "../context";
import Card from "../components/Card";

function Home() {
  const {
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchItem,
    onAddToFavorite,
    favorites,
    onAddToCart,
    isLoading,
  } = React.useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    // return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
    return filteredItems.map((item, index) => (
      <Card
        key={item.id}
        item={item}
        onFavorite={(obj) => onAddToFavorite(obj)}
        isFavorite={favorites.includes(item.id) ? true : false}
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        // {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
        <div className="search-block d-flex">
          {searchValue && (
            <img onClick={() => setSearchValue("")} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />
          )}
          <input onChange={onChangeSearchItem} value={searchValue} placeholder="Поиск ..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
      {console.log("Render home")}
    </div>
  );
}

export default Home;
