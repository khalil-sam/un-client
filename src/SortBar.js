import React from 'react';
import CountryDetail from './CountryDetail'
import Countries from './Countries' 
import { BrowserRouter as Router, Link, Route, useParams, withRouter } from 'react-router-dom';
import queryString from 'query-string';



class SortBar extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            currentYear : "Select Year",
            loading: true,
            years: []
        }
        // this.doDropdownChange = this.doDropdownChange.bind(this);
        // this.handleDropdownChange = this.handleDropdownChange.bind(this);


    }

    componentDidUpdate(prevProps) {
        if(prevProps.year != this.props.year) {
            this.setState({currentYear: this.props.year});
        }

        /*if(prevProps.doDropDownChange != this.props.doDropDownChange) {
            this.setState({currentYear: this.props.year});
        }*/

        if(prevProps.years != this.props.years) {
            this.setState({years: this.props.years});
        }

        else if (prevProps != this.props) {
            this.setState({});
        }
    }

    handleDropdownChange = (e) => {

        this.props.doDropDownChange(e.target.value);
    }

    render () {


        if(this.props.doDropDownChange==undefined) {
            console.log("WHERE IS IT??");
            return;
        }

        return (
            <div className = "box"> 
                    {!this.state.loadingOptions ?
                        <select id="year" name="year" onChange={this.handleDropdownChange}>
  

                            {
                                this.state.years.map(yearStr => 
                                    <option value={yearStr} key={yearStr}>{yearStr}</option>
                                )
                            }
                            

                        </select>
                    : <div class="yearSelDiv">Loading...</div>}
            </div>
        )
    }
}

export default withRouter(SortBar);