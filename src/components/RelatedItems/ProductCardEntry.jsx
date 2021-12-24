import React from 'react';
import axios from 'axios';
import Options from '../../config.js';
import ProductImage from './ProductImage'
import RelatedItemRating from './RelatedItemRating'

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
    <div className="related-product-card-entry">
      {current &&
      <div>
        <ProductImage
          currentItem={current}
          render={props.render}
          setSaved={props.setSaved}
          outfits={props.outfits}
          whoRender={props.whoRender}
        />
        <div className="related-product-category"> {props.currentItem.category}</div>
        <div className="related-product-name">{props.currentItem.name}</div>
        <div className="related-product-price">{props.currentItem.default_price}</div>
        <RelatedItemRating currentItem={current} />
      </div>
      }
    </div>
  )
}

// {results: [{photos: [{ url: ''}]}]}
