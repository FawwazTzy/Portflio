import { useState } from "react";

import "./App.css";
import { SearchBar } from "./Search/SearchBar";
import { SearchResultsList } from "./Search/SearchResultsList";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
      </div>
    </div>
  );
}

export default App;