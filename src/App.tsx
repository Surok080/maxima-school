import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [cofe, setCofe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://random-data-api.com/api/coffee/random_coffee?size=100"
        );
        setCofe(data.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const data = {
    name: 'Мой любимый кофе',
    description: 'Описание различных сортов кофе',
    structure: [
      "blend_name","origin","variety","notes","intensifier", "id"
    ],
    data: cofe,
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error fetching users</h2>
      ) : (
        <Table  data={data}/>
      )}
    </>

  );
}

export default App;
