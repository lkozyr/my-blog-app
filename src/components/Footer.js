import React from 'react';
import './footer.css';

const Footer = (props) => {

    return (
        <footer className="footer">
            <ul>
                <li><a href="/footer-link1">Some item</a> |</li>
                <li><a href="/footer-link2">Second item</a> |</li>
                <li><a href="/footer-link3">And third</a> |</li>
            </ul>
        </footer>
    ); 
}

export default Footer;