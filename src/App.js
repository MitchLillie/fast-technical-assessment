import List from './List';
import './App.css';
import {useState} from 'react';
import {useMovies} from './useMovies';

function App() {
  // local state
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState({});
  const [confirming, setConfirming] = useState(false);
  const [movies, error, loading] = useMovies(query);

  // methods
  const handleCheck = (item) => {
    const nextChecked = {...checked};
    if (!Object.keys(checked).includes(item.imdbID)) {
      nextChecked[item.imdbID] = item;
    } else {
      delete nextChecked[item.imdbID];
    }
    setChecked(nextChecked);
  }

  const confirmPlaylist = () => {
    setConfirming(true);
  }

  const complete = () => {
    setConfirming(false);
    setChecked({});
  }

  // rendering
  if (confirming) {
    // TODO: make this DRYer
    return (
      <div className="app">
        <div className="main">
          <div className="flex">
            <h1>MMDb</h1><p className="subtitle">Mitch's Movie Database</p>
          </div>
          <label htmlFor="confirm">
            Are you sure you want to add {Object.keys(checked).length} movies to your playlist?
          </label>
          <button
            id="confirm"
            onClick={complete}
          >
            Confirm
          </button>
          <List
            movies={Object.values(checked)}
            check={() => {}}
            checked={Object.keys(checked)}
          />
        </div>
        <footer>
          My favorite color is orange
        </footer>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="main">
        <div className="flex">
          <h1>MMDb</h1><p className="subtitle">Mitch's Movie Database</p>
        </div>
        <label htmlFor="search">Search movies</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="button add"
          disabled={!Object.keys(checked).length}
          onClick={confirmPlaylist}
        >
          Add To Playlist
        </button>

        <List
          movies={movies}
          error={error}
          loading={loading}
          check={handleCheck}
          checked={Object.keys(checked)}
        />
      </div>
    </div>
  )
}

export default App;
