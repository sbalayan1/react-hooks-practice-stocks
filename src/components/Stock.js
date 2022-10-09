import React, {useCallback} from "react";

function Stock({stock, onClick, stocks, portfolio}) {
  const {name, price, ticker} = stock
  const handleClick = useCallback(() => onClick(stock), [stock, onClick])

  return (
    <div>
      <div className="card" onClick={handleClick}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
