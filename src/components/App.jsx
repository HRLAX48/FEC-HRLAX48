import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './Checkout';
import Catalogue from './Catalogue';
import Options from '../config.js';
import Detail from './Detail';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useStateValue } from '../components/Overview/store/StateProvider';

let theme;
export function siteTheme() {
  return theme;
}

export default function App(props) {
  const [view, setView] = React.useState('catalogue');
  const [products, setProducts] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const [saved, setSaved] = React.useState(
    () => JSON.parse(localStorage.getItem('outfits')) || []
  );
  const [{ basket }, dispatch] = useStateValue();
  const [darkTheme, setDarkTheme] = React.useState(
    () => JSON.parse(localStorage.getItem('darkMode')) || false
  );

  const [page, setPage] = React.useState(1);

  theme = darkTheme;

  React.useEffect(() => {
    axios
      .get(`${Options.URL}/products/?count=10&page=${page}`, {
        headers: {
          Authorization: Options.TOKEN,
        },
      })
      .then((res) => setProducts(res.data));
  }, [page]);

  React.useEffect(() => {
    localStorage.setItem('outfits', JSON.stringify(saved));
  }, [saved]);

  React.useEffect(() => {
    localStorage.setItem('bagItems', JSON.stringify(basket));
  }, [basket]);

  const themedStyle = {
    backgroundColor: darkTheme ? 'rgb(25, 25, 25)' : 'white',
    color: darkTheme ? 'white' : 'black',
  };

  return (
    <div className='d-flex flex-column heightWrapper' style={themedStyle}>
      <Header
        setView={setView}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
      />
      {view === 'catalogue' && (
        <div className='container vertCenter'>
          <Catalogue
            setView={setView}
            products={products}
            setSelected={setSelected}
            darkTheme={darkTheme}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
      {view === 'detail' && (
        <div className='container flex-grow-1 mb-5'>
          <Detail
            selected={selected}
            products={products}
            setView={setView}
            setSelected={setSelected}
            saved={saved}
            setSaved={setSaved}
            outfits={saved}
            darkTheme={darkTheme}
          />
        </div>
      )}
      {view === 'checkout' && (
        <div className='container flex-grow-1'>
          <Checkout
            darkTheme={darkTheme}
            basket={basket}
            dispatch={dispatch}
            setView={setView}
            setSelectedProduct={setSelected}
            products={products}
          />
        </div>
      )}
      <div>
        <Footer darkTheme={darkTheme} />
      </div>
    </div>
  );
}
