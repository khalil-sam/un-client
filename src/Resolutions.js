import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';

class Resolutions extends React.Component {  
    constructor(props)
    {
        super(props);
        this.state = {
            resolutions : []
        }
        let params = {pagesize : 3};
        // body: JSON.stringify(data)
        fetch ('http://localhost:8081/resolutions')
        .then(response => response.json())
        .then(r => {
            this.setState({
                resolutions : r
            })
        })

        this.handleSelection = this.handleSelection.bind(this)
    }
    handleSelection(ev){
        const target = ev.target.dataset.key
        // const result = this.state.resolutions.filter(res => res.resid === target);
        const result = this.state.resolutions.filter(res => res.resid == target)[0]        
        this.props.onResolutionSelection(result)
    }
 

    render () {
        console.log("state:",this.state.resolutions);
        return (

            <aside className="aside" >
            
                    {this.state.resolutions.map(res => 
                    <Link to={"/resolutions/"+res.resid}> 
                    <button class="tablinks" data-key = {res.resid} onClick={this.handleSelection} id={res.resid}>{res.unres} </button>
                    </Link>)}
        </aside>
        )
    }

}

export default Resolutions;