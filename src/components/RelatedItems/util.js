import React from 'react';

const comparison = {
  rows: (arr1, arr2) => {
    let combinedArr = arr1.features.concat(arr2.features)

    const filteredArr = combinedArr.reduce((a, {feature, value}) => {
      let item = a.find(element => element.feature === feature);
      if (!item) {
        return [...a, {feature , value: [value]}]
      }
      item.value.push(value)
      return a;
    }, [])
   
    return filteredArr.map(feature => {
      if (feature.value.length > 1) {
        return (
          <tr>
            <td>{feature.value[0]}</td>
            <th scope="row">{feature.feature}</th>
            <td>{feature.value[1]}</td>
          </tr>
        )
      } else if (arr1.features.some(item => item.feature === feature.feature)) {
        return (
          <tr>
            <td>{feature.value[0]}</td>
            <th scope="row">{feature.feature}</th>
            <td></td>
          </tr>
        )
      } else if (arr2.features.some(item => item.feature === feature.feature)) {
        return (
          <tr>
            <td></td>
            <th scope="row">{feature.feature}</th>
            <td>{feature.value[0]}</td>
          </tr>
        )
      }
    })
  }
}

export default comparison;

// console.log(arr2)
    // if (arr2.features.length > arr1.features.length) {
    //   return arr2.features.map((feature, i) => (
    //   <tr>
    //     <td>{(feature.value) ? (feature.value) : (null)}</td>
    //     <th scope="row">{feature.feature}</th>
    //     <td></td>
    //   </tr>
    // ))
    // } else {
    //   return arr1.features.map(feature => (
    //     <tr>
    //       <td>{(feature.value) ? (feature.value) : (null)}</td>
    //       <th scope="row">{feature.feature}</th>
    //       <td></td>
    //     </tr>
    //   ))
    // }