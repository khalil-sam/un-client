import React from 'react';
import Countries from './Countries' 
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
class Navbar extends React.Component {  

    render () {
        return (
            <div id= "in-nav">
                <header className="header">
                                    <nav>
                    <Link to={`/`}>
                    Home
                    </Link>
                    <Link to={`/countries`}>
                    About
                    </Link>
                    <Link to={`/countries`}>
                    Countries
                    </Link>
                    <Link to={`/resolutions`}>
                    Resolutions
                    </Link>
                </nav>
                </header>

            </div>
            
                 
            

               
        )
    }

}

export default Navbar;