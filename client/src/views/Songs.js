import React, { useState, useEffect } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Sort from './Sort';
import Song from '../components/Song';

const Songs = props => {
    const [checkmark, toggleCheckmark] = useState(false);

    useEffect(() => {
        if (checkmark) {
            props.setSongs(props.songs.map(song => song.id));
        } else {
            props.setSongs([]);
        }
    }, [checkmark]);

    const toggleSong = (selected, song) => {
        if (selected) {
            props.setSongs([...props.toggledSongs, song.id]);
        } else {
            props.setSongs(
                props.toggledSongs.filter(songid =>
                    songid !== song.id ? songid : null
                )
            );
        }
    };

    return (
        <div className={css(ss.songWrapper)}>
            <Sort
                checkmark={checkmark}
                checkedCategories={props.checkedCategories}
                handleSetCheckedCategories={props.setCheckedCategories}
                handleSelectAll={toggleCheckmark}
            />
            {props.songs.length
                ? props.songs.map(song => (
                      <Song
                          key={song.id}
                          details={song}
                          handleToggle={() =>
                              toggleSong(
                                  !props.toggledSongs.includes(song.id),
                                  song
                              )
                          }
                          toggled={props.toggledSongs.includes(song.id)}
                          categories={props.checkedCategories}
                      />
                  ))
                : null}
        </div>
    );
};

const ss = StyleSheet.create({
    songWrapper: {
        width: '100%',
        overflow: 'hidden',
    },
});

export default Songs;
