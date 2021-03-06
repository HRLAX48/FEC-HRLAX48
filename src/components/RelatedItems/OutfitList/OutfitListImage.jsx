import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MigoPNG from '../../../assets/Migos.png'


export default function OutfitListImage(props) {

  function removeOutfit(selected, e) {
    e.stopPropagation();
    let removeOutfit = selected.filter((product) => product.color !== props.currentStyle.color);
    props.setSaved(removeOutfit)
  }

  return(
    <>
    {(props.currentStyle) &&
      <div className="card-product-image">
       <img src={`${props.currentStyle.thumbnail || MigoPNG}`}/>
      <HighlightOffIcon className="remove-card-entry" onClick={(e) => removeOutfit(props.outfits, e)} />
      </div>
    }
    </>
  )
}
