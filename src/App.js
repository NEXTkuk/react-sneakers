import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setsearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  // https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites

  React.useEffect(() => {
    axios.get("https://642d4369bf8cbecdb40169ba.mockapi.io/items").then((res) => {
      setItems(res.data);
    });

    axios.get("https://642d4369bf8cbecdb40169ba.mockapi.io/cart").then((res) => {
      setCartItems(res.data);
    });

    axios.get("https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites").then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://642d4369bf8cbecdb40169ba.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://642d4369bf8cbecdb40169ba.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post("https://6436b5c23e4d2b4a12d99c95.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchItem = (event) => {
    setsearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <RightSide items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setsearchValue={setsearchValue}
              onChangeSearchItem={onChangeSearchItem}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route path="/favorites" exact element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
    </div>
  );
}

export default App;
