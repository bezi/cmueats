import './App.css';
import axios from 'axios';

const BASE_URL = "https://apis.dining.scottylabs.org/locations";

async function queryLocations() {
  const { data: locations } = axios.get(BASE_URL);
  return locations;
}

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
