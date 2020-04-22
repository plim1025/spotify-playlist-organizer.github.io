import React from 'react'

export default function Song(props) {
    return (
        <div>
            {props.details.title}
            {props.details.artist}
            {props.details.album}
            {props.details.year}
        </div>
    )
}
