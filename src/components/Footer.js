import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = (props) => {

    return (
        <footer className="footer">
            <ul>
                <li><Link to="/footer-link1">Some item</Link> |</li>
                <li><Link to="/footer-link2">Second item</Link> |</li>
                <li><Link to="/footer-link3">And third</Link> |</li>
            </ul>
        </footer>
    ); 
}

export default Footer;