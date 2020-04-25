import React from 'react'

const Song = (props) => {
    return (
        <div>
            {props.details.name}
            {props.details.artist}
            {props.details.album}
            {props.details.year}
        </div>
    )
}

export default Song;