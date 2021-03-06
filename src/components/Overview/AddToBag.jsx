import React from 'react';
import { useStateValue } from './store/StateProvider';
import BagModal from './BagModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collection from './Collection';
import Button from 'react-bootstrap/Button';

export default function AddToBag({ setView, darkTheme, setSaved, saved }) {
  const [{ basket, selected, toggleWarning }, dispatch] = useStateValue();
  const [show, setShow] = React.useState(false);

  const handleAdd = () => {
    if (typeof selected.quantity === 'number') {
      let newBasket = null;

      for (var i = 0; i < basket.length; i++) {
        if (
          basket[i].id === selected.id &&
          basket[i].size === selected.size &&
          basket[i].color === selected.color
        ) {
          basket[i].quantity += selected.quantity;

          basket[i].itemTotal = (
            basket[i].quantity * (selected.salePrice || selected.originalPrice)
          ).toFixed(2);

          newBasket = Array.from(new Set(basket));
        }
      }

      if (newBasket) {
        dispatch({
          type: 'REPLACE_BASKET',
          item: newBasket,
        });
      } else {
        dispatch({
          type: 'ADD_TO_BASKET',
          item: {
            id: selected.id,
            color: selected.color,
            size: selected.size,
            quantity: selected.quantity,
            thumbnail: selected.thumbnail,
            originalPrice: selected.originalPrice,
            salePrice: selected.salePrice,
            itemTotal: (
              selected.quantity * (selected.salePrice || selected.originalPrice)
            ).toFixed(2),
            name: selected.productName,
            photos: selected.photos,
            skus: selected.skus,
            disabled: true,
            productName: selected.productName,
            category: selected.category,
            productId: selected.productId,
            stockQuantityArr: selected.stockQuantityArr,
            index: selected.index,
          },
        });
      }

      setShow(true);
    } else {
      dispatch({
        type: 'TOGGLE_WARNING',
        item: true,
      });
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Container fluid>
        <Row className='pt-2'>
          <Col
            className='col-10 pe-2'
            style={{ padding: '0px', margin: '0px' }}
          >
            <Button
              variant={darkTheme ? 'outline-light' : 'outline-secondary'}
              style={{ width: '100%' }}
              onClick={handleAdd}
            >
              Add To Bag
            </Button>
          </Col>
          <Col style={{ padding: '0px', margin: '0px' }}>
            <Collection
              darkTheme={darkTheme}
              saved={saved}
              setSaved={setSaved}
              selected={selected}
            />
          </Col>
        </Row>
        {toggleWarning ? (
          <Row>
            <div style={{ color: 'red', textAlign: 'center' }}>
              --select size first--
            </div>
          </Row>
        ) : null}
      </Container>
      <BagModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        category={selected.category}
        name={name}
        setView={setView}
        darkTheme={darkTheme}
      />
    </>
  );
}
