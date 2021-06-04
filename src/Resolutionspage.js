import React, { lazy, Suspense } from 'react'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const Resolutions = lazy(() => import('./Resolutions' ))
const ResolutionDetail = lazy(() => import('./ResolutionDetail' ))





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
             <Suspense fallback={<h1>Still Loading…</h1>}>


            <div class="tab">
                <Resolutions onResolutionSelection = {this.handleResolutionSelection}/>
            </div>
            <div class="tabcontent">
                <main className="main" >
                <ResolutionDetail resolution_id = {this.state.currentResolution.resid}/>
                </main>

            </div>
            </Suspense>

            
            
            </div>
                 
            

        )
    }
}

export default Resolutionspage;