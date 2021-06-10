import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';

class Countries extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            countries : [],
            pageNum : 1,
            pageSize : 10,
            pageMax : 1
        }

        fetch ('http://localhost:8081/votes/country')
        .then(response => response.json())
        .then(c => {
            this.setState({
                countries : c,
                pageMax : Math.ceil(c.length / this.state.pageSize)
            })
        })

        console.log("hello",this.state.countries);
        console.log(typeof this.state.countries)
        this.handleSelection = this.handleSelection.bind(this)
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
        const result = this.state.countries.filter(country => country=== target)[0];
        
        
        this.props.onCountrySelection(result)
    }
 
    render () {
        let page = this.state.pageNum - 1; // 0-based
        let page_countries = this.state.countries/*.slice(
            page*this.state.pageSize,
            page*this.state.pageSize + this.state.pageSize);*/

        return (
            <aside className="countries-aside" >

                <h3 className = "country-list-label">Scroll for More</h3>
               
                {/* Country name list */}
                {page_countries.map(country => 
                    <Link to={"/countries/"+country} key={country}> 
                    <button className="tablinks" data-key = {country} onClick={this.handleSelection} id={country}>{country} </button>
                    </Link>
                )}

                {/* Page selection */}
                {/*}
                <div className = "res-page-menu">
                    {this.state.pageNum > 1 ?
                    <button onClick={this.prevPage} className="resPgBtn">Previous</button>
                    :<p/>}
                    Showing Page: {this.state.pageNum} of {this.state.pageMax}
                    {this.state.pageNum < this.state.pageMax ?
                    <button onClick={this.nextPage} className="resPgBtn">Next</button>
                    :<p/>}
                </div>
                    */}

        </aside>
        )
    }

}

export default Countries;