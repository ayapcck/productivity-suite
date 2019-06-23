import React from 'react';
import classnames from 'classnames';

import InputBox from '../forms/inputBox';
import FormButton from '../forms/button';

import styles from './shufflerApp.less';

var Logger = require('../utilities/logger');

const descriptionText = 'You can add multiple playlists by putting a new URL on each line.';
const descriptionContainer = <div className={styles.addPlaylistDescription}>
    {descriptionText}
</div>;

export default class ShufflerApp extends React.Component {
    constructor(props) {
        super(props);
    }

    log(message, functionName) {
        Logger.log(message, 'shufflerApp', functionName);
    }

    render() {
        const shufflerApp = <div className={styles.shufflerContent}>
            <div className={styles.leftColumn}>
                <div className={classnames(styles.musicInputContainer)}>
                    <span className={styles.spanHeader}>Add Playlists</span>
                    <form id="addSongs" className={styles.musicInputForm}>
                        <div className={styles.playlistBox}>
                            {descriptionContainer}
                            <InputBox type='area' text='Playlists' name='playlists' />
                        </div>
                        <FormButton text='Shuffle' type='submit' 
                            name='shufflePlaylists' containerClass={styles.pushDown} />
                    </form>
                </div>
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.songList}>

                </div>
            </div>
        </div>;

        return shufflerApp;
    }
}