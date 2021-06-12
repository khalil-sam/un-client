import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';
import Chart from "react-google-charts";
const dotenv = require('dotenv');
dotenv.config();




function numToVote(num) {
    if (num == "1") {return "Yes";}
    if (num == "2") {return "Abstain";} 
    if (num == "3") {return "No";} 
    if (num == "8") {return "Absent";} 
    if (num == "9") {return "Not a Member";} 
    else {return "Data Unclear";}
}

class VoteTable extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            yesHTML : [],
            noHTML : [],
            absHTML : [],
            data_map : []
        }

        this.fixVotes = this.fixVotes.bind(this);
        this.fixVotes();
        this.changeName = this.changeName.bind(this);
    }

    changeName(country){
        if (country == "United States of America"){
            return  "US"
        }
        if (country == "Russian Federation"){
            return "RU"
        }
        if (country == "Venezuela, Bolivarian Republic of"){
            return "Venezuela"

        }
        if (country == "Bolivia (Plurinational State of)"){
            return "Bolivia"

        }
        if (country == "Iran (Islamic Republic of)") {
            return "Iran"
        }
        if (country == "Democratic People's Republic of Korea")
        {
            return "KP"
        }
        if (country == "Syrian Arab Republic"){
            return "Syria"

        }
        if (country == "Lao People's Democratic Republic"){
            return "Laos"

        }
        if (country == "Cote D'Ivoire"){
            return "CI"
        }
         if (country == "The former Yugoslav Republic of Macedonia"){
            return "MK"
        } 
        if (country == "United Republic of Tanzania") {
            return "Tanzania"

        }
        if (country == "Republic of Korea"){
            return "KR"

        }
        if (country == "United Kingdom of Great Britain and Northern Ireland")
        {return "GB"}
        else {
            return country
        }
    }

    fixVotes() {
        let y = [];
            let n = [];
            let a = [];
            let data = [['Country', 'Vote']];
            
            this.props.votes.forEach(vote => {
                let link = <li key={vote.Countryname}><Link to = {`/countries/${vote.Countryname}`}>
                            {vote.Countryname} </Link> </li>
                if(vote.vote==1) {
                    y.push(link);
                    data.push([this.changeName(vote.Countryname) , 1])
                    // this.setState({data_map : data_map.push([vote.Countryname , 1])})
                }
                else if(vote.vote==3) {
                    n.push(link);
                    data.push([this.changeName(vote.Countryname) , 2]);
                    // this.setState({data_map : data_map.push([vote.Countryname , 2])})
                }
                else if(vote.vote==2) {
                    a.push(link);
                    data.push([this.changeName(vote.Countryname) , 3]);
                    // this.setState({data_map : data_map.push([vote.Countryname , 3])})
                }
            })

            
            //console.log("y:"+y);
            /*this.setState({
                yesHTML : y,
                noHTML : n,
                absHTML : a
            })*/
            this.state = {
                yesHTML : y,
                noHTML : n,
                absHTML : a, 
                data_map : data
            }
    }

    /*componentDidUpdate(prevProps) {
        if(prevProps.votes != this.props.votes) {
            this.fixVotes();
        }
    }*/

    render () {

        const env = process.env;

        console.log("what is happening:", this.state.data_map)

        return (
            <div>
                        <Chart
                width={'800px'}
                height={'500px'}
                chartType="GeoChart"
                data= {this.state.data_map}
                mapsApiKey={process.env.REACT_APP_APIKEY}
                colors = {['red', 'green', 'yellow']}
                rootProps={{ 'data-testid': '1' }}
                
                options={{
                title: 'Voting map',
                colors: ['green', 'red','yellow'],

  }}
/>
            <div className="vote-table">
                <div className="yes-col">
                    <h4><center>Yes <i class="far fa-check-circle"></i> </center></h4>
                    <ol>
                    {this.state.yesHTML.map(line => {
                        return line;
                    })}
                    </ol>
                </div>
                <div className="no-col">
                    <h4><center>No <i class="far fa-times-circle"></i></center></h4>

                    <ol>
                    {this.state.noHTML.map(line => {
                        return line;
                    })}
                    </ol>
                </div>
                <div className="abs-col">
                    <h4><center>Abstain <i class="far fa-question-circle"></i></center></h4>

                    <ol>
                    {this.state.absHTML.map(line => {
                        return line;
                    })}
                    </ol>
                </div>
            </div>
            <div>

            </div>
            </div>
        )
    }
}
    
export default withRouter(VoteTable);
