import React from 'react'

const Song = (props) => {
    return (
        <div>
            {props.details.title}
            {props.details.artist}
            {props.details.album}
            {props.details.year}
        </div>
    )
}

export default Song;