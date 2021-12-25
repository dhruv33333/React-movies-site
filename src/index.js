import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './components/App';
import movies from './reducers';
import reportWebVitals from './reportWebVitals';


const store = createStore(movies);
console.log(store);
// console.log("before state" + store.getState());
// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name:'Action-Kamen' }]
// })
// console.log("after state" + store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
