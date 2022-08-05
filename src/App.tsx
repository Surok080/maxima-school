import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import MOCK_DATA from './app/data/MOCK_DATA.json';

function App() {
  const [people, setPeople] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPeople(MOCK_DATA);
      setLoading(false);
    }, 2000);
  }, []);

  const data = {
    name: 'Список людей',
    description: 'Описание персонала',
    structure: [
      "first_name", "last_name", "email", "gender", "ip_address", "id"
    ],
    data: people,
  }

  return (
    <>
      {loading ? (
        <div className='loading'></div>
      ) : (
        <Table data={data} />
      )}
    </>
  );
}

export default App;
