import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  render() {
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies;

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
            {
              displayMovies.map((movie, index) => (
                <MovieCard
                  movie={movie}
                  key={index}
                  dispatch={this.props.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              ))
            }
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No Movies to Display!</div> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  }
}

const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
