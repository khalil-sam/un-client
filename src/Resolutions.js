import React, { lazy, Suspense } from 'react'

import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';

const defaultTxt = "Select Year";

class Resolutions extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            resolutions : [],
            year : "",
            pageNum : 1,
            pageSize : 20,
            pageMax : 1
        }

        this.handleSelection = this.handleSelection.bind(this)
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);

        this.statics = {
            years : []
        }

        let years = []
        for(let i=1946; i <= 2019; i++) {
            years.push(i.toString());
        }
        this.statics.years = years;
    }

    prevPage = () => {
        if(this.state.pageNum > 1) {
            this.setState({ pageNum: this.state.pageNum - 1 });
        }
    }

    nextPage = () => {
        if(this.state.pageNum < this.state.pageMax) {
            this.setState({ pageNum: this.state.pageNum + 1 });
        }
    }
    
    handleSelection(ev){
        const target = ev.target.dataset.key
        const result = this.state.resolutions.filter(res => res.resid == target)[0]        
        this.props.onResolutionSelection(result)
    }

    handleDropdownChange(e) {

        if(e.target.value==defaultTxt) {
            this.setState({
                year : defaultTxt,
                resolutions : []
            });
        }
        else {
            this.setState({ year: e.target.value });
            let s = 'https://unitednationsserver.herokuapp.com/resolutions'
                + "?year=" + e.target.value
                + "&nolimit=1";
            fetch (s)
            .then(response => response.json())
            .then(r => {

                this.setState({
                    resolutions : r.filter(res => res.short != ""),
                    pageNum: 1,
                    pageMax: Math.ceil(r.length / this.state.pageSize)
                })
            })
        }
    }
 

    render () {


        console.log("state.resolutions:",this.state.resolutions);

        let page = this.state.pageNum - 1; // 0-based
        let page_resolutions = this.state.resolutions.slice(
            page*this.state.pageSize,
            page*this.state.pageSize + this.state.pageSize);
        

        return (

            <aside className="aside" >

            {/* Year selection */}
            <select id="year" name="year" className = "res-year-select" onChange={this.handleDropdownChange}>
                <option key="Year">{defaultTxt}</option>
                {
                    this.statics.years.map(yearStr => {
                        return <option value={yearStr} key={yearStr}>{yearStr}</option>
                    })
                }

            </select> 

            {/* List of resolutions */}
            <Suspense fallback={<h1>Still Loading…</h1>}>
                {page_resolutions.map(res => 
                <Link to={"/resolutions/"+res.resid} key={res.resid}> 
                <button className="tablinks" data-key = {res.resid} onClick={this.handleSelection} id={res.resid}>
                {res.unres} : {res.short}
                </button>
                </Link>)}
            </Suspense>

            {/* Page menu */}
            {(this.state.year!=defaultTxt) ?
                <div className = "res-page-menu">
                    {this.state.pageNum > 1 ?
                    <button onClick={this.prevPage} className="resPgBtn">Previous</button>
                    :<p/>}

                    <div className="pageMenuLabel">
                    Showing Page: {this.state.pageNum} of {this.state.pageMax}
                    </div>

                    {this.state.pageNum < this.state.pageMax ?
                    <button onClick={this.nextPage} className="resPgBtn">Next</button>
                    :<p/>}
                </div>

            : <p></p>}

            </aside>
        )
    }
}

export default Resolutions;