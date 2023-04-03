import React from 'react'
import axios from 'axios';
import { useState, useEffect} from 'react'
import { Link, Route, Routes} from 'react-router-dom'

import List from './components/List.jsx';
import  Card from './components/Card.jsx'
import './App.css'
import Item from './components/Item.jsx';



function App() {
  const [data, setData] = useState(null);
  const [listData, setListData] = useState([]);
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151'
   
  const fetchData = async () => {
    const response = await axios.get(url)
    setData(response)
    setListData(response.data.results.map((obj) =>
      obj.url
    ))
  };
  
  console.log('list data is')
  console.log(listData)
  
  useEffect(() =>{
    fetchData()
  },[url])

  if(!data){
    return (<div> Loading...</div>)
  }
  return (
    <>
    <div className="App">
        <nav>
          <left>
            <h2>Pokemon Data</h2>
            <h5>Data displays Generation 1 Pokemon</h5>
          </left>
          <ul className='right'>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li><Link to="/"> Search </Link></li>
            <li>About</li>
          </ul>
        </nav>
        <div className="dashboard">
          <Card header="Total:" info="151"/>
          <Card header="Most Common Type: " info="Poison" />
          <Card header="Average Weight: " info="149.3 lbs" />
        </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<List list={listData}/>}/>
          <Route path='/:id' element={<Item />}/>
        </Routes>
      </div>
    </div>
    
    </>
  )
}

export default App
