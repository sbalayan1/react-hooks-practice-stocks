import React, {useMemo} from "react";
import Stock from "./Stock";

function StockContainer({stocks, portfolio, handleAddStock}) {
  const renderStocks = useMemo(() => stocks.map(stock => <Stock key={stock.id} stock={stock} onClick={handleAddStock} stocks={stocks} portfolio={portfolio}/>),[stocks, handleAddStock, portfolio])

  return (
    <div>
      <h2>Stocks</h2>
      {renderStocks}
    </div>
  );
}

export default StockContainer;
