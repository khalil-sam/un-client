import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';


class CountryDetail extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            currentCountry : "",
            list_resolutions : [],
            // empty_c : True,
            page_num : 1
        }
        this.IncrementItem = this.IncrementItem.bind(this);

    }

  IncrementItem = () => {
    this.setState({ page_num: this.state.page_num + 1 });
  }
    render() {
        const baseURL = 'http://localhost:8081';
        let country = this.props.match.params.countryID;
        // this.setState({currentCountry : country})
        let s = baseURL + '/votes/country/' + country;
        console.log("fetch :", s);

        let res = []

        let isCountry = false ;
        if (country != undefined){
            isCountry = true
        };


        
        fetch(s)
        .then(response => response.json())
        .then(resolutions_list => {
            res = resolutions_list;
            })
        .then(response => {
            this.setState({list_resolutions : res})
            console.log("return res:", res);
            })
        return (
            <div>
            

            
                <div className="Country">
                <h2> {country} </h2>
                {this.state.list_resolutions.map(resolution =>
                
                    <div class="container">
                    
                    <h4><b> <Link to= {`/resolutions/${resolution.resid}`}>
                     {resolution.unres}
                    </Link></b></h4>
                    <p>
                    {resolution.Countryname} voted {numToVote(resolution.vote)} for {resolution.unres} on {resolution.date}</p>
                    </div> 
        )
        


    }
      </div>
      {isCountry ?       
<div style={{position : "relative", left :"60%"}}>
<button onClick={this.IncrementItem} class="slideUpBtn">
</button>
{this.state.page_num}
</div>  : 'Please select a country'}

      
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
    else {return "Data Unclear";}
}






// function CountryDetail(props) {
// Resolutioner().then(hi => {return <div> hi </div>})

    

    
    

    
    

//             return 


    
  







export default withRouter(CountryDetail);