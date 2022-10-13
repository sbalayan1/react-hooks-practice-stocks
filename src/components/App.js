import React, {useState, useEffect, useCallback, useMemo} from "react";


//import components
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [count, setCount] = useState(0)
  const [countArr, setCountArr] = useState([])
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [filterObj, setFilterObj] = useState({
    filter: false,
    sort: ''
  })

  useEffect(() => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => setStocks(data))
  }, [])

  useEffect(() => {
    if (countArr.length > 5) {
      setCountArr([])
      return
    }

    if (count % 3 === 0 && countArr[countArr.length-1] !== count) {
      setCountArr((state) => [...state, count])
    }

  
  }, [count, countArr])

  const displayCountArr = useMemo(() => countArr.map(num => <li key={num}>{num}</li>), [countArr])
  const handleIncreaseCount = useCallback(() => {
    setCount(count+1)
  }, [count])

  const handleClearCount = useCallback(() => {
    setCount(0)
    setCountArr([])
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
      return a
    })
  , [filterObj, stocks])

  return (
    <div>
      <Header />
      <h2>
        {count}
      </h2>
      <ul>
        countArray: {displayCountArr}
      </ul>
      <button onClick={handleIncreaseCount}>increase count</button>
      <button onClick={handleClearCount}>clear count</button>
      <MainContainer stocks={stocksToDisplay} portfolio={portfolio} handleAddStock={handleAddStock} handleRemoveStock={handleRemoveStock} filterStocks={filterStocks}/>
      {count}
      {countArr}
    </div>
  );
}

export default App;
