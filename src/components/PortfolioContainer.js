import React, {useMemo} from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, stocks, handleRemoveStock}) {
  const renderPortfolio = useMemo(() => portfolio.map(stock => <Stock key={stock.id} stock={stock} onClick={handleRemoveStock} stocks={stocks} portfolio={portfolio}/>), [portfolio, stocks, handleRemoveStock])
  return (
    <div>
      <h2>My Portfolio</h2>
      {renderPortfolio}
    </div>
  );
}

export default PortfolioContainer;
