import React from 'react';
import { connect } from 'react-redux';
import Song from '../components/Song';

const PlaylistView = (props) => {
    return (
        <div>
            {
                props.songs ? props.songs.map(song => <Song key={song.title} details={song}/>)
                : null
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        songs: state.songs
    };
}

const mapDispatchToProps = dispatch => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);