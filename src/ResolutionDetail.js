import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';



//console.log(__dirname)

// let resolutions = [];

// const showResolutions = () => {
//     console.log("SHOWING resolutions!");
//     fetch(`${baseURL}/resolutions`)
//         .then(response => response.json())
//         .then(data => {
//             resolutions = data;
//             const listItems = data.map(item =>
//             `<button class="tablinks" onclick="openRes('${item.unres}')" id=${item.unres}>${item.unres}: ${item.short}</button>`
//             );
//             document.querySelector('.tab').innerHTML =
//                     `${listItems.join('')}`             
//         })
//         //.then(attachEventHandlers);
// }

// showResolutions();

// const showResDetails = (res) => {
//         console.log(JSON.stringify(res));
//         let tab = document.querySelector('.top-detail');
//         tab.innerHTML =
//         `<h1>Resolution Details: ${res.unres}</h1>`;
//         tab.innerHTML +=
//         resReadout(res);

//         // votes on this res
//         let area = document.querySelector('.bottom-detail');
//         area.innerHTML = `Loading...`;
//         fetch(`${baseURL}/r-votes/${res.resid}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             area.innerHTML = 
//             voteReadout(data);
//         })

//         /*console.log("DRAWING MAP USING API CALL!!");
//         drawMap();*/
// }

// function openRes(resName) {
//     // a
//     var result = resolutions.filter(obj => {
//         return obj.unres == resName
//     })[0];
//     showResDetails(result);
// }

// function resReadout(res) {
//     return `
//     Topic: ${res.short}
//     <br>
//     Date: ${res.date}
//     <br>
//     Result: Yes ${res.yes}; No ${res.no}; Abstain ${res.abstain}
//     <br>
//     <p>Description: ${res.descr}</p>
//     <br>
//     <h3>Votes on this Resolution</h3>
//     `
// }

// function voteReadout(votes) {
//     let memberVotes = votes.filter(item => {
//         return item.member == "1";
//     })
//     let result = ``;
//     memberVotes.forEach(vote => {
//         result += `<br>${vote.Countryname}: ${numToVote(vote.vote)}<br>`;
//     });
//     return result;
// }

function numToVote(num) {
    if (num == "1") {return "Yes";}
    if (num == "2") {return "Abstain";} 
    if (num == "3") {return "No";} 
    if (num == "8") {return "Absent";} 
    if (num == "9") {return "Not a Member";} 
    else {return "Data Unclear";}
}



class ResolutionDetail extends React.Component { 
    constructor(props)
    {
        super(props);
        this.state = {
            votes : [], 
            rcid : "",
            abstain : 0,
            date : "",
            descr : "",
            no : 0,
            session : 0,
            unres : "",
            year : "",
            yes : 0,
        }}

    render () {

        const resolution =  this.props.match.params.resID;
        console.log("resolution:", resolution);
        if (resolution === undefined){
            return(<div>
            No resolutions selected 
            </div>)
        }
        console.log("this is resolution:", resolution);
        const baseURL = 'http://localhost:8081';



        let s = baseURL + '/r-votes/' + resolution;
        console.log("fetch :", s);

        fetch(s)
        .then(response => response.json())
        .then(votes_list => {
            this.setState({
                votes : votes_list
            })

        })
        let k =  baseURL + "/resolutions/resid/" + resolution
        fetch(k)
        .then(response => response.json())
        .then(info => {
            this.setState({
            rcid : info[0].rcid,
            abstain : info[0].abstain,
            date : info[0].date,
            descr : info[0].descr,
            no : info[0].no,
            session : info[0].session,
            unres : info[0].unres,
            year : info[0].year,
            yes : info[0].yes
            })


        })

        return (
            <div className="country">
            <div className= "detailres">
                <h2> {this.state.unres} </h2>
                <h3> {this.state.descr} </h3>
                <p> number of countries that voted yes : {this.state.yes}, number of countries that voted no : {this.state.no}, number of countries that abstained {this.state.abstain} </p>
            </div> 
                {this.state.votes.map(vote =>
                    <div>
                    <p>
                    <Link to= {`/countries/${vote.Countryname}`}>
                    {vote.Countryname}: 
                    </Link>
                      voted {numToVote(vote.vote)}</p>
                    </div> 
        )

    }
     </div>
)}

}
    

    



export default withRouter(ResolutionDetail);