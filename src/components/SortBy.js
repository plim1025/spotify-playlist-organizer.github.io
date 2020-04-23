import React from 'react';
import { connect } from 'react-redux';
import { sortByTitle } from '../redux/Actions';

const SortBy = (props) => {
    return (
        <div onClick={() => props.sortByTitle()}>
            hello
        </div>
    )
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => {
    return {
        sortByTitle: () => dispatch(sortByTitle())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SortBy);
