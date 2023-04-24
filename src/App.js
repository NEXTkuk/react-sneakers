import React from "react";
import { Routes, Route } from "react-router-dom";
// import axios from "axios";

import Header from "./components/Header";
import RightSide from "./components/RightSide";
import AppContext from "./context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import get_items from "./data/items";

function App() {
  const [items, setItems] = React.useState([]);

  let temp = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  const [cartItems, setCartItems] = React.useState(temp);

  // const [favorites, setFavorites] = React.useState([]);
  const localFavorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
  const [favorites, setFavorites] = React.useState(localFavorites);

  const [searchValue, setsearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // const cartResponse = await axios.get("https://642d4369bf8cbecdb40169ba.mockapi.io/cart");
        // const favoritesResponse = await axios.get("https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites");
        // const itemsResponse = await axios.get("https://642d4369bf8cbecdb40169ba.mockapi.io/items");

        // setIsLoading(false);
        // setCartItems(cartResponse.data);
        // setFavorites(favoritesResponse.data);
        // setItems(itemsResponse.data);

        const items = get_items();
        const localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const localFavorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);

        setIsLoading(false);

        setFavorites(localFavorites);
        setItems(items);

        setCartItems(localCart);
        console.log("local card: ", localCart);

        // setFavorites(localFavorites);
        // setItems(items);
      } catch (error) {
        alert("Ошибка при запросе данных :(");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = (card) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(card.id));
    if (findItem) {
      setCartItems((prev) => prev.filter((item) => item.id !== card.id));
    } else {
      setCartItems((prev) => [...prev, card]);
    }
  };

  // const onAddToCart = async (obj) => {
  //   try {
  //     const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
  //     if (findItem) {
  //       setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
  //       await axios.delete(`https://642d4369bf8cbecdb40169ba.mockapi.io/cart/${obj.id}`);
  //     } else {
  //       setCartItems((prev) => [...prev, obj]);
  //       const { data } = await axios.post("https://642d4369bf8cbecdb40169ba.mockapi.io/cart", obj);
  //       setCartItems((prev) =>
  //         prev.map((item) => {
  //           if (item.parentId === data.parentId) {
  //             return {
  //               ...item,
  //               id: data.id,
  //             };
  //           }
  //           return item;
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     alert("Ошибка при добавлении в корзину :(");
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("Добавил в локал: ", cartItems);
    } catch (e) {
      console.log(e);
    }
  }, [cartItems]);

  const onRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // const onRemoveItem = (id) => {
  //   try {
  //     axios.delete(`https://642d4369bf8cbecdb40169ba.mockapi.io/cart/${id}`);
  //     setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  //   } catch (error) {
  //     alert("Ошибка при удалении из корзины");
  //     console.error(error);
  //   }
  // };

  const onAddToFavorite = (arg) => {
    if (!arg.favorites) {
      let localFavorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

      const newFavorites = [arg.id];
      localFavorites = [...localFavorites, ...newFavorites];
      setFavorites(localFavorites);
      localStorage.setItem("favorites", JSON.stringify(localFavorites));
    } else {
      let localFavorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
      localFavorites = localFavorites.filter((idx) => idx !== arg.id);
      setFavorites(localFavorites);
      localStorage.setItem("favorites", JSON.stringify(localFavorites));
    }
  };

  // const onAddToFavorite = async (obj) => {
  //   try {
  //     if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
  //       axios.delete(`https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites/${obj.id}`);
  //       setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
  //     } else {
  //       const { data } = await axios.post("https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites", obj);
  //       setFavorites((prev) => [...prev, data]);
  //     }
  //   } catch (error) {
  //     alert("Не удалось добавить в фавориты");
  //     console.error(error);
  //   }
  // };

  const onChangeSearchItem = (event) => {
    setsearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}
    >
      <div className="wrapper clear">
        <RightSide
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={(id) => onRemoveItem(id)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setsearchValue={setsearchValue}
                onChangeSearchItem={onChangeSearchItem}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
