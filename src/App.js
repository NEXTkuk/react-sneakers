import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppContext from './context';
import Header from './components/Header';
import RightSide from './components/RightSide';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import get_items from './data/items';

function App() {
  const [items, setItems] = React.useState([]);

  let temp = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const [cartItems, setCartItems] = React.useState(temp);

  const localFavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
  const [favorites, setFavorites] = React.useState(localFavorites);

  const [searchValue, setSearchValue] = React.useState('');
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

        // Fix LocalStorage GitHub
        try {
          const currentDomain = window.location.pathname;
          const LsDomain = localStorage.getItem('domain');

          if (currentDomain !== LsDomain) {
            localStorage.clear();
            localStorage.setItem('domain', currentDomain);
          }
        } catch {
          console.log('Ошибка с LS');
        }

        const items = get_items();
        const localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const localFavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

        setIsLoading(false);

        setFavorites(localFavorites);
        setItems(items);
        setCartItems(localCart);
      } catch (error) {
        alert('Ошибка при запросе данных :(');
      }
    }

    fetchData();
  }, []);

  const onAddToCart = (card) => {
    const findItem = cartItems.find((item) => Number(item.id) === Number(card.id));
    if (findItem) {
      setCartItems((prev) => prev.filter((item) => item.id !== card.id));
    } else {
      setCartItems((prev) => [...prev, card]);
    }
  };

  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // console.log("Добавил в локал: ", cartItems);
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
    if (!arg.isFavorite) {
      let localFavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

      const newFavorites = [arg.id];
      localFavorites = [...localFavorites, ...newFavorites];
      setFavorites(localFavorites);
      localStorage.setItem('favorites', JSON.stringify(localFavorites));
    } else {
      let localFavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
      localFavorites = localFavorites.filter((idx) => idx !== arg.id);
      setFavorites(localFavorites);
      localStorage.setItem('favorites', JSON.stringify(localFavorites));
    }
  };

  const onChangeSearchItem = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        searchValue,
        favorites,
        isLoading,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
        setSearchValue,
        onChangeSearchItem,
      }}
    >
      <div className='wrapper clear'>
        <Header
          onClickCart={() => {
            setCartOpened(true);
            document.body.style.overflow = 'hidden';
          }}
        />

        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home
              // onChangeSearchItem={onChangeSearchItem}
              />
            }
          />

          <Route path='/favorites' exact element={<Favorites items={items} />} />
          <Route path='/orders' exact element={<Orders />} />
        </Routes>

        <RightSide
          items={cartItems}
          onClose={() => {
            setCartOpened(false);
            document.body.style.overflow = 'visible';
          }}
          onRemove={(id) => onRemoveItem(id)}
          opened={cartOpened}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
