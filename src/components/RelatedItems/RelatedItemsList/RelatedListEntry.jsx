import React from 'react';
import axios from 'axios';
import Options from '../../../config.js';
import ProductImage from './ProductImage'
import RelatedItemRating from '../RelatedItemRating'


export default function RelatedProductEntry(props) {
  const [ current, setCurrent ] = React.useState()

  React.useEffect(()=>{
    const params = {
      product_id: props.currentItem.id
    }
    axios.get(`${Options.URL}/products/${params.product_id}/styles/?count=20`, {
      headers: {
        Authorization: Options.TOKEN
      }
    }).then(res => setCurrent(res.data))
  }, [])

  return (
    <>
    {current &&
      <div className="product-card-entry" style={{width: `${(props.related.length/4)*30}%` }}>
        <ProductImage
          currentItem={current}
          render={props.render}
          setRenderTable={props.setRenderTable}
          setSelectRelated={props.setSelectRelated}
          renderTable={props.renderTable}
        />
        <div className="related-product-category" style={{fontSize: '0.9em', marginLeft: '10px'}}> {props.currentItem.category}</div>
        <div className="related-product-name" style={{fontWeight:'bold', marginLeft: '10px', overflow:'hidden'}}>{props.currentItem.name}</div>
        <div className="related-product-price" style={{fontSize: '0.8em', marginLeft: '10px'}}>{`$${props.currentItem.default_price}`}</div>
        <RelatedItemRating currentItem={current} darkTheme={props.darkTheme}/>
      </div>
    }
    </>
  )
}


//style={{width: `${props.width * 0.4}`}}