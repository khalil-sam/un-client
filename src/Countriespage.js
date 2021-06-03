import React from 'react';
import CountryDetail from './CountryDetail'
import Countries from './Countries' 
import { BrowserRouter as Router, Link, Route, useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';



class Countriespage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            currentCountry : {}
        }
        this.handleCountrySelection = this.handleCountrySelection.bind(this)
    }
    handleCountrySelection(country){
        console.log("this is workig:", country)
        this.setState({currentCountry : country})
    }


    render () {

        return (
            <div>
            <div class="tab">
            
                <Countries onCountrySelection = {this.handleCountrySelection}/>
            </div>
            <div class="tabcontent">
                <main className="main" >
                <CountryDetail country = {this.state.currentCountry}/>
                
                

                </main>

            </div>

            
            
            </div>
                 
            

        )
    }
}

export default Countriespage;