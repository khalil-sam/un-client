import React from 'react';
import CountryDetail from './CountryDetail'
import Countries from './Countries' 
import SortBar from './SortBar'
import { BrowserRouter as Router, Link, Route, useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';



class Countriespage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            currentCountry : {},
            year : 1946,
            years : "", 
            work : 0
        }
        this.handleCountrySelection = this.handleCountrySelection.bind(this)
        this.doDropDownChange = this.doDropDownChange.bind(this);
    }
    handleCountrySelection(country){
        console.log("this is workig:", country)
        this.setState({currentCountry : country})
    }

    updateYears = (years) => {
        console.log("entered update years")
        this.setState({years: years});
    }

    doDropDownChange = (year) => {
        console.log("new year value : ", year)
        this.setState({year: year})
        console.log("state year:" , this.state.year)

    }



    render () {
        console.log("do state year change? :", this.state.years)

        return (
            <div>
                <div className="tab"> 
                    <Countries onCountrySelection = {this.handleCountrySelection}/>
                </div>

                <div className="tabcontent">
                    <div className="sortOptions">
                    <SortBar doDropDownChange={this.doDropDownChange} years={this.state.years}/>
                    </div>
                    <main className="main" >
                    
                    <CountryDetail year={this.state.year} country = {this.state.currentCountry} updateYears={this.updateYears}/>
                    </main>
                </div> 
            </div>       
        )
    }
}

export default Countriespage;