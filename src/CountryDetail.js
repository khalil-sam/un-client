import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';

let years = []
for (let i=1946; i<= 2019; i++) {
    years.push(i.toString());
}

class CountryDetail extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            currentCountry : "",
            list_resolutions : [],
            page_num : 20, 
            year : "",
            noResults : false,
            loading : true
        }
        this.IncrementItem = this.IncrementItem.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.showCountry = this.showCountry.bind(this);

        // this.changeyYear = this.changeyYear.bind(this);

        /*
        let country = this.props.match.params.countryID;
        this.setState({currentCountry : country}) // unnecessary?

        const baseURL = 'http://localhost:8081';
        let s = baseURL + '/votes/country/' + country +"?pagesize=" + this.state.page_num + "&year=" + this.state.year;
        console.log("fetch :", s);
        let res = [];
        fetch(s)
        .then(response => response.json())
        .then(resolutions_list => {
            res = resolutions_list;
        })
        .then(response => {
            this.setState({list_resolutions : res})
            console.log("return res:", res);
        })
        */
    }

    IncrementItem = () => {
        this.setState({ page_num: this.state.page_num + 5 });
    }

//   changeyYear = (e){
//     this.setState({selectValue:e.target.value});
//   };

    handleDropdownChange(e) {
        this.setState({ year: e.target.value });
    }

    componentDidUpdate(prevProps) {
        let country = this.props.match.params.countryID;
        if(country != prevProps.match.params.countryID) {
            this.setState({loading : true, currentCountry : country});
            this.showCountry(country);
        }
    }

    showCountry = (country) => {
        const baseURL = 'http://localhost:8081';
        let s = baseURL + '/votes/country/' + country +"?pagesize=" + this.state.page_num + "&year=" + this.state.year;

        console.log("fetch :", s);
        let res = [];
        fetch(s)
        .then(response => response.json())
        .then(resolutions_list => {
            this.setState({list_resolutions : resolutions_list, noResponse : (resolutions_list.length==0), loading : false})
            console.log("return res:", resolutions_list);
        })
    }

    render() {
        
        let country = this.props.match.params.countryID;

        let isCountry = false ;
        if (country != undefined){
            isCountry = true
        };

        if(this.state.loading) {
            this.showCountry(country);
            return (
                <div className="Country">
                <h1> {country} </h1>
                <p>Loading...</p>
                </div>
            )
        }

        console.log("NOT LOADING: country = " + country);

        return (
            <div>
                <div className = "box"> 
                    <select id="year" name="year" onChange={this.handleDropdownChange}>
                        {/* onchange={this.changeyYear}> */}
                        <option>Year</option>

                        {
                            years.map(yearStr => 
                                <option value={yearStr} key={yearStr}>{yearStr}</option>
                            )
                        }

                    </select> 
                </div>
                    
                <div className="Country">
                    <h1> {country} </h1>
                    {this.state.list_resolutions.map(resolution =>
                    
                        <div className="container" key={resolution.resid}>
                        
                        <h4><b>
                        <Link to = {`/resolutions/${resolution.resid}`}>
                            {resolution.unres}: {resolution.short}
                        </Link>
                        </b></h4>
                        <p>
                        {resolution.Countryname} voted {numToVote(resolution.vote)} for {resolution.unres} on {resolution.date}</p>
                        </div> 
                    )
                    }
                </div>

                {isCountry ?
                    <div style={{position : "relative", left :"60%"}}>
                        <button onClick={this.IncrementItem} className="slideUpBtn"></button>
                    </div> 
                    : 'Please select a country from the left panel'}
            </div>
        )
    } 
}

function numToVote(num) {
    if (num == "1") {return "Yes";}
    if (num == "2") {return "Abstain";} 
    if (num == "3") {return "No";} 
    if (num == "8") {return "Absent";} 
    if (num == "9") {return "Not a Member";} 
    else {return "Data Unclear: num is "+num;}
}

// function CountryDetail(props) {
// Resolutioner().then(hi => {return <div> hi </div>})
//             return 

export default withRouter(CountryDetail);