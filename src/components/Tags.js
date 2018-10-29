import React from 'react';
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
  
export default Tags;