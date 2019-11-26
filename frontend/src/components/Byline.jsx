import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";

class Byline extends React.Component {
    render() {
        const {
            authorUsername,
            datePosted
        } = this.props;

        const authorLink = <Link to={`/@${authorUsername}`}>@{authorUsername}</Link>;
        const dateStr = moment(datePosted).calendar();
        return <>Written by {authorLink} ({dateStr})</>
    }
}

Byline.propTypes = {
    authorUsername: PropTypes.string.isRequired,
    datePosted: PropTypes.any.isRequired
};

export default Byline;