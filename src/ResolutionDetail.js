import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';
import Chart from "react-google-charts";

const VoteTable = lazy(() => import('./VoteTable'));

function numToVote(num) {
    if (num == "1") {return "Yes";}
    if (num == "2") {return "Abstain";} 
    if (num == "3") {return "No";} 
    if (num == "8") {return "Absent";} 
    if (num == "9") {return "Not a Member";} 
    else {return "Data Unclear";}
}

const fixResIdentifier = (rName) => {
    let nameArr = rName.split('/');
    nameArr[0] = "A/RES";
    return nameArr.join("/");
}

const getUNDoc = (name) => {
    // gets PDF link for the resolution w/ given name
    // name is like "A/65/537"
    // so do ?/ -> A/RES/
    name = fixResIdentifier(name);
    return "https://daccess-ods.un.org/access.nsf/Get?OpenAgent&DS=" + name + "&Lang=E";
}

class ResolutionDetail extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            votes : [], 
            rcid : "",
            abstain : 56,
            date : "",
            descr : "",
            no : 34,
            session : 0,
            unres : "",
            year : "",
            yes : 12,
            short : "",
            loading: true
        }
    }

    showRes(resolution) {
        console.log("showRes");

        const baseURL = 'https://unitednationsserver.herokuapp.com';

        let k =  baseURL + "/resolutions/resid/" + resolution
        let s = baseURL + '/r-votes/' + resolution;

        fetch(k)
        .then(response => response.json())
        .then(info => {
            fetch(s)
            .then(response => response.json())
            .then(votes_list => {
                this.setState({
                rcid : info[0].rcid,
                abstain : info[0].abstain,
                date : info[0].date,
                descr : info[0].descr,
                no : info[0].no,
                session : info[0].session,
                unres : info[0].unres,
                year : info[0].year,
                yes : info[0].yes,
                short : info[0].short,
                votes : votes_list,
                loading : false
                })
            })
        })
        
        
    }

    componentDidUpdate(prevProps) {
        const resolution =  this.props.match.params.resID;
        console.log("ResolutionDetail componentDidUpdate: resolution="+resolution);

        if(resolution != prevProps.match.params.resID) {
            this.setState({loading: true});
            this.showRes(resolution);
        }
    }

    render () {

        const resolution =  this.props.match.params.resID;
        console.log("resolution:", resolution);
        if (resolution === undefined) {
            return(<div>
            No resolutions selected; select a year from the dropdown on the left to start.
            </div>)
        }
        console.log("this is resolution:", resolution);

        if (this.state.loading) { // this.state.votes.length == 0
            // setup with a URL that has a res #
            this.showRes(resolution);
            return <p>Loading...</p>;
        }

        //console.log("GOT BELOW - votes:"+this.state.votes);

        return (
            <div className="country">
                <div className= "detailres">
                    <h1> {this.state.unres} : {this.state.short} </h1>
                    <h3> {this.state.descr} </h3>
                    <p> Date: {this.state.date} </p>
                    <p> Vote outcome: {this.state.yes} Yes, {this.state.no} No, {this.state.abstain} Abstain </p>
                    <a href={getUNDoc(this.state.unres)}>Resolution PDF</a> (No guarantee of this working, especially pre-1990)
                </div> 

                <h2>Votes</h2>

                <VoteTable votes = {this.state.votes}/>
            </div>
        )
    }
}

export default withRouter(ResolutionDetail);