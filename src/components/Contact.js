import React from 'react';
import './contact.css';
import fbImage from '../assets/img/fb.svg';
import twImage from '../assets/img/tw.svg';
import ghImage from '../assets/img/gh.svg';
import emImage from '../assets/img/em.svg';

const Contact = (props) => {

    return (
        <div className="contact">
            <h2>Contact me</h2>
            <ul>
                <li>
                    <a href="https://www.facebook.com/">
                        <img src={fbImage} alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/">
                        <img src={twImage} alt="Twitter" />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/">
                        <img src={ghImage} alt="Github" />
                    </a>
                </li>
                <li>
                    <a href="mailto:me@me.me">
                        <img src={emImage} alt="Email" />
                    </a>
                </li>
            </ul>
        </div>
    ); 
}

export default Contact;