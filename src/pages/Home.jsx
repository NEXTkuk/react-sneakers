import Card from "../components/Card";

function Home({ items, searchValue, setsearchValue, onChangeSearchItem, onAddToFavorite, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input onChange={onChangeSearchItem} value={searchValue} placeholder="Поиск ..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              // title={item.title}
              // price={item.price}
              // imgUrl={item.imgUrl}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
