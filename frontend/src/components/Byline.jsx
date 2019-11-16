import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

class Byline extends React.Component {
    render() {
        const {
            author,
            datePosted
        } = this.props;

        const authorLink = <Link to={`/@${author.username}`}>@{author.username}</Link>;
        const dateStr = moment(datePosted).calendar();
        return <>Written by {authorLink} ({dateStr})</>
    }
}

Byline.propTypes = {
    author: PropTypes.object.isRequired,
    datePosted: PropTypes.any.isRequired
};

export default Byline;