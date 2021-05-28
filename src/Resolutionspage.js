import React from 'react';
import ResolutionDetail from './ResolutionDetail'
import Resolutions from './Resolutions' 
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



class Resolutionspage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            currentResolution : []
        }
        this.handleResolutionSelection = this.handleResolutionSelection.bind(this)
    }
    handleResolutionSelection(resolution){
        console.log("this is workig:", resolution.resid)
        this.setState({currentResolution : resolution})
    }


    render () {
        return (
            <div>
            <div class="tab">
                <Resolutions onResolutionSelection = {this.handleResolutionSelection}/>
            </div>
            <div class="tabcontent">
                <main className="main" >
                <ResolutionDetail resolution_id = {this.state.currentResolution.resid}/>
                <section className="companions">
                
                    other details
                </section>
                </main>

            </div>

            
            
            </div>
                 
            

        )
    }
}

export default Resolutionspage;