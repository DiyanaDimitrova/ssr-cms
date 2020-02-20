import React, { useState, useEffect } from "react";
import Header from './component/Header'
import Column from './component/Column'

import "./App.css";

function App() {
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/home')
        const jsonResponse = await response.json()
        setData(jsonResponse)
      } catch (err) {
        console.log('err', err)
        setError(err)
      }
    }
    fetchData()
  }, [])
  const { title, column1, column2 } = data
  return error ? (
      <div>
        Error occured!
      </div>
    ) : (
      <div>
        <div className="title-container">
          <Header title={title}/>
        </div>
        <div className="column-container">
          <Column column={column1}/>
          <Column column={column2}/>
        </div>
      </div>
    )
}

export default App;
