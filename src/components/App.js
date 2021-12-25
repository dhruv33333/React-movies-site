import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {

  componentDidMount()
  {
    console.log("didMount");
    const { store } = this.props;   //destructuring

    store.subscribe(() => {
      console.log('UPDATed');
      console.log(this.props.store.getState());
      this.forceUpdate();
    })

    store.dispatch(addMovies(data));

    // console.log(this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState().movies;

    const index = favourites.indexOf(movie);

    if(index !== -1) {
      // movie found
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    console.log("RENDER");
    const { movies } = this.props.store.getState();
    const { list, favourites, showFavourites} = movies;

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
                dispatch={this.props.store.dispatch}
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

export default App;
