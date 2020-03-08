import React from 'react';

function ListItem({restro, index}) {
  return (
    <div className="list-item-wrapper">
        <img src={'//source.unsplash.com/400x300/?ramen+' + index} alt={restro.Brand}/>
        <div className="text-content">
          <h4>{restro.Brand}</h4>
          <p className="grey-text fs-12 text-uppercase">{restro.Country}</p>
          <p className="grey-text fs-14">{restro.Variety}</p>
        </div>
        {restro.Stars !== "NaN" ? (<span className="rating">{restro.Stars} &nbsp;&#9733;</span>) : ""}
    </div>
  );
}

export default ListItem;
