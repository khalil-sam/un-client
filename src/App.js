import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './navbar';
import home from './home';

import Countries from './Countries';
import Countriespage from './Countriespage';
import Resolutions from './Resolutions';
import Resolutionspage from './Resolutionspage';


import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';
// function BlogPost() {
//   let { countryID } = useParams();
  
//   return <div>Now showing post {countryID}</div>;
// }

class App extends React.Component {
    render () {
        return (
          <div id = "out-route">
          <Navbar/>
            <Switch>
            <Route path="/countries/:countryID" component = {Countriespage}>
            </Route>
            <Route exact path="/" component = {home}>
            </Route>
            <Route path="/resolutions/:resID" component = {Resolutionspage}>
            </Route>
            <Route exact path="/countries"  component = {Countriespage} />
           <Route exact path="/resolutions"  component = {Resolutionspage}/> 
           </Switch>
           </div>

        )
    }
}

export default App;


