import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div>
          <header id="header">
            <div className="container text-center">
                <div className="menu" >
                    <div id="logo" className="text-center">
                        <a href="#studio"><img src="icons/logo.png" alt="" title="" /></a>
                    </div>
                </div>
            </div>
        </header>
                <div className="">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main
