import React, { lazy, Suspense } from 'react'

import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';

const defaultTxt = "Select Year";

class Resolutions extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            resolutions : [],
            year : ""
        }

        this.handleSelection = this.handleSelection.bind(this)
        this.handleDropdownChange = this.handleDropdownChange.bind(this);

        this.statics = {
            years : []
        }

        let years = []
        for(let i=1946; i <= 2019; i++) {
            years.push(i.toString());
        }
        this.statics.years = years;
        //console.log("years:"+this.statics.years);
    }
    
    handleSelection(ev){
        const target = ev.target.dataset.key
        const result = this.state.resolutions.filter(res => res.resid == target)[0]        
        this.props.onResolutionSelection(result)
    }

    handleDropdownChange(e) {
        console.log("Resolutions handleDropdownChange: year="+e.target.value);

        if(e.target.value==defaultTxt) {
            console.log("RESDROP BACK TO DEFAULT");
            this.setState({
                year : "",
                resolutions : []
            });
        }
        else {
            this.setState({ year: e.target.value });
            let s = 'http://localhost:8081/resolutions' + "?year=" + e.target.value
            fetch (s)
            .then(response => response.json())
            .then(r => {
                this.setState({
                    resolutions : r
                })
            })
        }
    }
 

    render () {

        /*
        let s = 'http://localhost:8081/resolutions' + "?year=" + this.state.year
        fetch (s)
        .then(response => response.json())
        .then(r => {
            this.setState({
                resolutions : r
            })
        })
        */

        console.log("state:",this.state.resolutions);
        /*this.statics.years.map(yearStr => {
            console.log("yearStr:"+yearStr);
        })*/
        return (

            <aside className="aside" >

            <select id="year" name="year" className = "res-year-select" onChange={this.handleDropdownChange}>
                <option key="Year">{defaultTxt}</option>

                {
                    this.statics.years.map(yearStr => {
                        return <option value={yearStr} key={yearStr}>{yearStr}</option>
                    })
                }

            </select> 



            <Suspense fallback={<h1>Still Loading…</h1>}>
                {this.state.resolutions.map(res => 
                <Link to={"/resolutions/"+res.resid} key={res.resid}> 
                <button className="tablinks" data-key = {res.resid} onClick={this.handleSelection} id={res.resid}>
                {res.unres} : {res.short}
                </button>
                </Link>)}
            </Suspense>

            </aside>
        )
    }
}

export default Resolutions;