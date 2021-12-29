import React from "react";
import RelatedList from './RelatedList'
import axios from 'axios';
import OutfitList from './OutfitList';
import Compare from './Compare'
import Options from '../../config.js';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function RelatedItems(props) {
  const [relatedItems, setRelatedItems] = React.useState([]);
  const [renderTable, setRenderTable] = React.useState(false);
  const [selectRelated, setSelectRelated] = React.useState();

  React.useEffect(() => {
      axios.get(`${Options.URL}/products/${props.selected.id}/related`, {
        headers: {
          Authorization: Options.TOKEN
        }
      }).then((res) => {
        let related = props.products.filter(item => res.data.includes(item.id))
        setRelatedItems(related)
      })
   }, [props.selected])

  return (
    <div className="related-products">
      <div className="sectionTitle">RELATED ITEMS</div>

          <div className="related-product-list">
            <RelatedList
              selected={props.selected}
              related ={relatedItems}
              setRenderTable={setRenderTable}
              renderTable={renderTable}
              setSelectRelated={setSelectRelated}
            />
          {renderTable &&
            <Compare
              related={relatedItems}
              renderTable={renderTable}
              selected={props.selected}
              selectRelated={selectRelated}
            />
          }
          </div>
      <div className="sectionTitle">YOUR OUTFITS</div>
          <div className="user-created-outfit">
            <OutfitList
              currentView={props.selected}
              saved={props.saved}
              setSaved={props.setSaved}
              outfits={props.outfits}
            />
          </div>
    </div>
  )
}