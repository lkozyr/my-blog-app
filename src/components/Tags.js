import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './tags.css';

class Tags extends React.Component {

    parseTagsString = (str) => {
        const tagsStr = this.props.tags.trim();
        return tagsStr.replace(/\s/g, ',').replace(/,,/g, ',').split(',');
    }

    render() {
        if (!this.props.tags) return null;
        const tags = this.parseTagsString(this.props.tags.trim());
        return (
            <div className="tags">
                <ul>
                    <li key="titletag">Tags: </li>
                    {
                        tags.map((t, i) =>
                            <li key={`tag${t}${i}`}><Link to={`/search?q=${t}`}>{t}</Link></li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

Tags.propTypes = {
    tags:        PropTypes.string,
}
  
export default Tags;