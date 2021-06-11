import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { runInThisContext } from 'vm';

const baseURL = 'https://unitednationsserver.herokuapp.com';

class CountryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountry : "",
            list_resolutions : [],
            page_size : 10, 
            year : "Select Year",
            noResults : false,
            loading : true,
            loadingOptions: true,
            loadingVotes: true,
            pageNum : 1,
            pageMax: 1,
            years: [],
            code : "",
            details: "",
            flag : "", 
            capital : "",
            region : "",
            subregion : "",
            area : "",
            currencies : [],
            borders : [],
            gini : "", 
            languages : [],
            population : "",
            blocs : [],
            timezones : [], 
            currency_name : ""
        }
        this.PrevPage = this.PrevPage.bind(this);
        this.NextPage = this.NextPage.bind(this);
        this.doDropdownChange = this.doDropdownChange.bind(this);
        this.showCountry = this.showCountry.bind(this);

        this.showCountry(this.props.match.params.countryID);

    }


    PrevPage = () => {
        if(this.state.pageNum > 1) {
            this.setState({ pageNum: this.state.pageNum - 1 });
        }
    }

    NextPage = () => {
        if(this.state.pageNum < this.state.pageMax) {
            this.setState({ pageNum: this.state.pageNum + 1 });
        }
    }

//   changeyYear = (e){
//     this.setState({selectValue:e.target.value});
//   };

    doDropdownChange(year) {
        this.setState({ year: year, loadingVotes : true }, 
        ()=>
        { this.showCountry(this.state.currentCountry)})
        
    }


    componentDidUpdate(prevProps) {
       
        if(this.props.year != prevProps.year) {
            this.doDropdownChange(this.props.year);
        }

        let country = this.props.match.params.countryID;
        if(country != prevProps.match.params.countryID) {
            this.setState({loadingOptions: true});


            let firstYear = 1946;
            let path = baseURL + '/votes/country/' + country
            + "?pagesize=1";
            fetch(path).then(result => {
                return result = result.json();
            }).then(result => {
                firstYear = parseInt(result[0].year);

                let years = [];
                for (let i=firstYear; i<= 2019; i++) {
                    years.push(i.toString());
                }
                this.props.updateYears(years);



                this.setState({currentCountry : country, years:years, loadingOptions: false});

                this.showCountry(this.state.currentCountry);
            }).catch(err => {
            });

            

        }
    }

    showCountry = (country) => {

        let s = baseURL + '/votes/country/' + country
            + "?pagesize=" + this.state.page_size
            + "&year=" + this.state.year
            + "&nolimit=1";

        console.log("fetch :", s);
        let res = [];

        fetch(s)
        .then(response => response.json())
        .then(votes_list => {
            console.log("this is votes_list",votes_list)
            let first_v =  votes_list[0]
            if (first_v != undefined){
                let countrycode = first_v.Country
                console.log(countrycode)
                this.setState({code : countrycode})
            }
            


            this.setState({
                // code : votes_list[0].Country,
                list_resolutions : votes_list.filter(res => res.unres),
                noResponse : (votes_list.length==0),
                pageNum: 1,
                pageMax: Math.ceil(votes_list.length / this.state.page_size),
                loading:false,
                loadingVotes:false
            })
        })
        .then(d => {
            if (this.state.code != ""){
            let v = "https://restcountries.eu/rest/v2/alpha/" + this.state.code
            return fetch(v)
            }})
        .then( (response) => {
        return(response.json())
        })
        .then( (body) => {
        console.log(body)
        this.setState({details : body, 
        flag : body.flag,
        capital : body.capital,
        region : body.region,
        subregion : body.subregion,
        area : body.area,
        currencies : body.currencies,
        borders : body.borders,
        gini : body.gini, 
        languages : body.languages,
        population : body.population,
        blocs : body.regionalBlocs,
        timezones : body.timezones}
        )
        })
        
        


        
        .catch(thing => {
            console.log("PROB in showCOUNTRY!! >:("+thing);
        });
        
        


    }

    render() {
        console.log("capital : ", this.state.capital)

        let blocs = this.state.blocs
        console.log("blocs:", blocs)

        
        let country = this.props.match.params.countryID;
        let country_details = this.state.detail;

        let isCountry = false ;
        if (country != undefined){
            isCountry = true
        }

        if(!isCountry) {
            return (
                <p>Please select a country from the sidebar.</p>
            )
        }
        else if(this.state.year=="Select Year") {
            return (
                <div className="Country">
                <h1> {country} </h1>
                <p>Once the dropdown above loads, please select a year. (SELECT YEAR)</p>
                </div>
            )
        }
        else if(this.state.loadingVotes) {
            //this.showCountry(country);
            return (
                <div className="Country">
                <h1> {country} </h1>
                <p>Loading votes...</p>
                </div>
            )
        }

        else {
            let page = this.state.pageNum - 1; // 0-based
            let display_countries = this.state.list_resolutions.slice(
                page*this.state.page_size,
                page*this.state.page_size + this.state.page_size);

            return (
                <div>
                        
                    <div className="Country">
                        <div className = "countryheader">
                        <h1> {country} </h1>
                        {this.state.capital === "" ? <p></p> : 
                        <div className = "detailedheader">
                        <p> {country} with its capital {this.state.capital} is a country in {this.state.region} specifically in the {this.state.subregion} region.</p>
                        {this.state.gini != "" ? <p>  {country} has a Gini of {this.state.gini} </p> : <p></p>}
                        <p> {country} has a population of {this.state.population} and an area of {this.state.area} km. {country} </p>
                        {blocs.length > 0 ?  <p> {country} is part of  {this.state.blocs.map((o)=><p> {o.name} which is also known as {o.acronym} </p>)} </p>  : <p></p> }
                        <div> There is/are {this.state.languages.length} official languages which is/are : {this.state.languages.length>0 ?  this.state.languages.map((l) => <p> {l.name} (natively known as {l.nativeName}) </p>)  : <p> [no languages ]</p> } </div>
                        <img src={this.state.flag} alt="Country flag"/> 
                        </div>}

                        </div>

                        {this.state.list_resolutions.length!=0 ?
                            (
                            <div>
                                <div className = "the-votes-for-a-country">
                                {display_countries.map(vote =>
                                    <div className="country-vote-container" key={vote.resid}>
                                        <p>
                                        <b>
                                        <Link to = {`/resolutions/${vote.resid}`}>
                                            {vote.unres}{/*: {resolution.short}*/}
                                        </Link>
                                        </b>
                                        </p>
                                        <p>{vote.Countryname} voted {numToVote(vote.vote)} for {vote.unres} on {vote.date}</p>
                                    </div> 
                                )
                                }
                                </div>
                                {/* page menu */}
                                {isCountry ?
                                    (this.state.list_resolutions.length != 0 ?
                                        <div className = "country-page-menu">
                                        {this.state.pageNum > 1 ?
                                        <button onClick={this.PrevPage} className="seeMoreBtn">Previous</button>
                                        :<p/>}

                                        Showing Page: {this.state.pageNum} of {this.state.pageMax}

                                        {this.state.pageNum < this.state.pageMax ?
                                        <button onClick={this.NextPage} className="seeMoreBtn">Next</button>
                                        :<p/>}
                                        </div> 
                                    : 'No results.')

                                    : 'Please select a country from the left panel'}
                            </div>
                            )
                        : <p>Please select a year. (NO RESOLUTIONS)</p>}
                    </div>

                    
                </div>
            )
        }
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