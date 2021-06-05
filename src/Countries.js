import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';

class Countries extends React.Component {  
    constructor(props)
    {
        super(props);
        this.state = {
            countries : []
        }

        fetch ('http://localhost:8081/votes/country')
        .then(response => response.json())
        .then(c => {
            this.setState({
                countries : c
            })
        })

        console.log("hello",this.state.countries);
        console.log(typeof this.state.countries)
        this.handleSelection = this.handleSelection.bind(this)
    }
    handleSelection(ev){
        const target = ev.target.dataset.key
        const result = this.state.countries.filter(country => country=== target)[0];
        
        
        this.props.onCountrySelection(result)
    }
 
    render () {
        return (
            <aside className="aside" >
               
                {this.state.countries.map(country => 
                    <Link to={"/countries/"+country} key={country}> 
                    <button className="tablinks" data-key = {country} onClick={this.handleSelection} id={country}>{country} </button>
                    </Link>
                )}
        </aside>
        )
    }

}

export default Countries;