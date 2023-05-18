import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../context";
import Card from "../components/Card";

import styles from "../components/Card/Card.module.scss";

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

    return isLoading ? (
      <div className="d-flex flex-wrap">
        {[...Array(4)].map((_, i) => {
          return (
            <div className={styles.card}>
              <ContentLoader
                speed={2}
                width={155}
                height={250}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
              </ContentLoader>
            </div>
          );
        })}
      </div>
    ) : (
      filteredItems.map((item, index) => (
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
      ))
    );

    // return filteredItems.map((item, index) => (
    //   <Card
    //     key={item.id}
    //     item={item}
    //     onFavorite={(obj) => onAddToFavorite(obj)}
    //     isFavorite={favorites.includes(item.id) ? true : false}
    //     added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
    //     onPlus={(obj) => onAddToCart(obj)}
    //     loading={isLoading}
    //     // {...item}
    //   />
    // ));
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
    </div>
  );
}

export default Home;
