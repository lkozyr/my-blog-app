import React from 'react';
import './about.css';

const About = () => {

    return (
        <div className="about">
            <div className="photo">
                <img src="https://openclipart.org/image/2400px/svg_to_png/277089/Female-Avatar-5.png" alt="me" />
            </div>
            <div className="description">
                <h2>Hello, I am Evelyn!</h2>
                <h4>Blogger. Writer. Journalist.</h4>
                <p>I enjoy reading, and the knowledge and perspective that my reading 
                    gives me has strengthened my teaching skills and presentation 
                    abilities. I have been successful at raising a family, and I 
                    attribute this success to my ability to plan, schedule, and handle 
                    many different tasks at once. 
                </p>
            </div>
        </div>
    ); 
}

export default About;