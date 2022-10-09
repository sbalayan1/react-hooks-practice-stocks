import React, {useState, useEffect, useCallback, useMemo} from "react";


//import components
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [filterObj, setFilterObj] = useState({
    filter: false,
    sort: ''
  })

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(res => res.json())
    .then(data => setStocks(data))
  }, [])

  const handleAddStock = useCallback(stock => {
    if (portfolio.find(s => s.id === stock.id) === undefined) setPortfolio([...portfolio, stock])
  }, [portfolio])

  const handleRemoveStock = useCallback(stock => {
    let filterStock = portfolio.filter(s => s.id !== stock.id)
    setPortfolio(filterStock)
  }, [portfolio])

  const filterStocks = useCallback((e) => setFilterObj({...filterObj, [e.target.name]: e.target.value}), [filterObj])

  const stocksToDisplay = useMemo(() => 
    stocks.filter(stock => {
      if (filterObj.filter === false) return stock
      return filterObj.filter === stock.type 
    }).sort((a,b) => {
      if (filterObj.sort === 'Alphabetically') return a.name.localeCompare(b.name)
      if (filterObj.sort === 'Price') return a.price - b.price
    })
  , [filterObj, stocks])

  return (
    <div>
      <Header />
      <MainContainer stocks={stocksToDisplay} portfolio={portfolio} handleAddStock={handleAddStock} handleRemoveStock={handleRemoveStock} filterStocks={filterStocks}/>
    </div>
  );
}

export default App;
