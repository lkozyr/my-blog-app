import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './css/previous-next-nav.css';

const PreviousNextNav = (props) => {

    return (
        <nav className="previous-next-nav">
            <div className="nav-item">
                {
                    props.previous
                    ?
                        <Link to={`/read/${props.previous.url}`}>  
                            <div className="nav-item-header prev">
                                &#8592; previous
                            </div>
                            <div className="nav-item-article">
                                {props.previous.title}
                            </div>
                        </Link>
                    :   
                        null
                }
            </div>
            <div className="nav-item">
                {
                    props.next
                    ?
                        <Link to={`/read/${props.next.url}`}>  
                            <div className="nav-item-header next">
                                next  &#8594;
                            </div>
                            <div className="nav-item-article">
                                {props.next.title}
                            </div>
                        </Link>
                    :
                        null
                }
                
            </div>
        </nav>
    ); 
}

PreviousNextNav.propTypes = {
    next:       PropTypes.object,
    previous:   PropTypes.object,
}

export default PreviousNextNav;