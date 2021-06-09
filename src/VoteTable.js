import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';

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
            absHTML : []
        }

        this.fixVotes = this.fixVotes.bind(this);
        this.fixVotes();
    }

    fixVotes() {
        let y = [];
            let n = [];
            let a = [];
            this.props.votes.forEach(vote => {
                let link = <li key={vote.Countryname}><Link to = {`/countries/${vote.Countryname}`}>
                            {vote.Countryname} </Link> </li>
                if(vote.vote==1) {
                    y.push(link);
                }
                else if(vote.vote==3) {
                    n.push(link);
                }
                else if(vote.vote==2) {
                    a.push(link);
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
                absHTML : a
            }
    }

    /*componentDidUpdate(prevProps) {
        if(prevProps.votes != this.props.votes) {
            this.fixVotes();
        }
    }*/

    render () {

        return (
            <div className="vote-table">
                <div className="yes-col">
                    <h4><center>Yes</center></h4>
                    <ol>
                    {this.state.yesHTML.map(line => {
                        return line;
                    })}
                    </ol>
                </div>
                <div className="no-col">
                    <h4><center>No</center></h4>

                    <ol>
                    {this.state.noHTML.map(line => {
                        return line;
                    })}
                    </ol>
                </div>
                <div className="abs-col">
                    <h4><center>Abstain</center></h4>

                    <ol>
                    {this.state.absHTML.map(line => {
                        return line;
                    })}
                    </ol>
                </div>
            </div>
        )
    }
}
    
export default withRouter(VoteTable);