import React from 'react';

function List(props) {
  if (props.error) {
    return <div className="movie">{props.error.message || props.error.toString()}</div>;
  } else if (props.loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <dl>
        {props.movies.map(item => (
          <dt
            key={item.imdbID}
            className={`movie ${props.checked.includes(item.imdbID) ? 'checked' : ''}`}
            onClick={(e) => props.check(item)}
          >
            {item.Poster !== 'N/A' &&
              <img src={item.Poster} alt={item.Title} className="poster" />
            }
            <div className="title">
              {item.Title} ({item.Year})
            </div>
          </dt>
        ))}
      </dl>
    );
  }
}

export default List;
