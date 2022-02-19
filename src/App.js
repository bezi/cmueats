import { useEffect, useState } from 'react';
import './App.css';
import queryLocations from './util/queryLocations';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    queryLocations().then((parsedLocations) => {
      setLocations(parsedLocations);
    })
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
