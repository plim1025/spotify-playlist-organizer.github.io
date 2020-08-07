import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const CategoryMenu = props => {
    const setCategories = category => {
        if (props.checkedCategories.indexOf(category) > -1) {
            const categories = props.checkedCategories.filter(
                item => item !== category
            );
            props.handleSetCheckedCategories(categories);
        } else {
            props.handleSetCheckedCategories([
                ...props.checkedCategories,
                category,
            ]);
        }
    };

    return (
        <Modal
            className={css(ss.wrapper)}
            open={props.visible}
            onClose={props.handleClose}>
            <List className={css(ss.list)}>
                <div className={css(ss.listTitle)}>
                    Select Categories to Display
                </div>
                {[
                    'Album',
                    'Artists',
                    'Danceability',
                    'Energy',
                    'Instrumentalness',
                    'Duration',
                    'Loudness',
                    'Name',
                    'Popularity',
                    'Valence',
                    'Speechiness',
                    'Tempo',
                    'Year',
                ].map(category => (
                    <ListItem
                        key={category}
                        onClick={() => setCategories(category)}
                        className={css(ss.listItem)}>
                        <div
                            style={{
                                background:
                                    props.checkedCategories.indexOf(category) >
                                    -1
                                        ? '#606060'
                                        : null,
                            }}
                            className={css(ss.checkmark)}>
                            <svg
                                style={{
                                    fill:
                                        props.checkedCategories.indexOf(
                                            category
                                        ) > -1
                                            ? '#fff'
                                            : 'transparent',
                                }}
                                className={css(ss.checkmarkIcon)}
                                viewBox='0 0 512 512'>
                                {' '}
                                <path d='M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z' />
                            </svg>
                        </div>
                        <ListItemText
                            primary={
                                category === 'Duration'
                                    ? 'Length'
                                    : category === 'Instrumentalness'
                                    ? 'Instrumental'
                                    : category === 'Speechiness'
                                    ? 'Speech'
                                    : category === 'Valence'
                                    ? 'Positivity'
                                    : category
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Modal>
    );
};

const ss = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        width: 350,
        height: 480,
        outline: 'none',
        background: '#f0f0f0',
        borderRadius: 6,
    },
    listTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 700,
        padding: 10,
    },
    listItem: {
        height: 32,
    },
    checkmark: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderRadius: 8,
        marginRight: 20,
        border: '2px solid #606060',
        cursor: 'pointer',
    },
    checkmarkIcon: {
        height: 16,
        width: 16,
    },
});

export default CategoryMenu;
