import React from "react";

//import components
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer({stocks, portfolio, handleAddStock, handleRemoveStock, filterStocks}) {

  return (
    <div>
      <SearchBar filterStocks={filterStocks}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} portfolio={portfolio} handleAddStock={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={stocks} portfolio={portfolio} handleRemoveStock={handleRemoveStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
