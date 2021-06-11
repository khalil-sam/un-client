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
        console.log("SORT BAR PROPS:"+JSON.stringify(this.props));
        //this.handleDropdownChange = this.handleDropdownChange.bind(this);
        //this.doDropDownChange = this.props.doDropDownChange.bind(this);
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
        console.log("SORT BAR: handleDropdownChange");
        console.log("SHOULD BE IN THE FUNC:"+this.props.doDropDownChange);
        this.doDropdownChange(e);
    }

    render () {

        if(this.props.doDropDownChange==undefined) {
            console.log("WHERE IS IT??");
            return;
        }
        console.log("SHOULD BE HERE:"+this.doDropDownChange);

        return (
            <div className = "sortBox"> 
                    {!this.state.loadingOptions ?
                        <select id="year" name="year" className="yearSelect" onChange={this.handleDropdownChange}>
                            <option>{this.state.currentYear}</option>

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

export default SortBar;