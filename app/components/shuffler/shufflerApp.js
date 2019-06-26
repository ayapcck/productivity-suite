import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import InputBox from '../forms/inputBox';
import FormButton from '../forms/button';
import YoutubePlayerContainer from './youtubePlayer';
import { getJson } from '../utilities/jsonHelpers';
import Logger from '../utilities/logger';

import styles from './shufflerApp.less';

const descriptionText = 'You can add multiple playlists by putting a new URL on each line.';
const descriptionContainer = <div className={styles.addPlaylistDescription}>
    {descriptionText}
</div>;

const createUrl = (playlistId, pageToken) => {
    let apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?`;
    let params = {
        part: 'snippet',
        maxResults: 50,
        pageToken: pageToken,
        playlistId: playlistId,
        key: 'AIzaSyDWMvuja3zbshZYsg4KkgSPWiA972SkJFs'
    };
    _.forIn(params, (value, key) => {
        apiUrl = value === '' ? apiUrl : apiUrl.concat(key, '=', value.toString(), '&');
    });
    return apiUrl.slice(0, apiUrl.length - 1);
}

const parseVideoIds = (jsonResponse) => {
    const videoIds = _.map(jsonResponse.items, 'snippet.resourceId.videoId');
    return {
        nextPageToken: _.get(jsonResponse, 'nextPageToken', ''),
        videoIds: videoIds
    };
};

const fetchSomeVideoIds = async (listId, pageToken = '') => {
    const url = createUrl(listId, pageToken);
    const jsonResponse = await getJson(url);
    return parseVideoIds(jsonResponse);
};

const fetchVideoIds = (listId, pageToken = '') => fetchSomeVideoIds(listId, pageToken).then((videoIdContent) => {
    if (videoIdContent.nextPageToken !== '') {
        return fetchVideoIds(listId, videoIdContent.nextPageToken)
            .then((nextVideoIdContent) => _.concat(videoIdContent.videoIds, nextVideoIdContent.videoIds || nextVideoIdContent));
    }
    return videoIdContent;
});

export default class ShufflerApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: '',
            activeVideoId: ''
        }

        this.shuffle = this.shuffle.bind(this);
    }

    log(message, functionName) {
        Logger.log(message, 'shufflerApp', functionName);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.list !== nextState.list) {
            this.setState({ activeVideoId: nextState.list[0] });
        }
        return true;
    }

    shuffle(ev) {
        ev.preventDefault();
        const listId = ev.target[0].value;
        //this.setState({ list: list });
        fetchVideoIds(listId).then((videoIds) => this.setState({ list: videoIds }));
    }

    render() {
        const { activeVideoId } = this.state;
        
        const shuffleProps = {
            containerClass: styles.pushDown,
            name: 'shufflePlaylists',
            text: 'Shuffle',
            type: 'submit'
        };

        const shufflerApp = <div className={styles.shufflerContent}>
            <div className={styles.leftColumn}>
                <div className={classnames(styles.musicInputContainer)}>
                    <span className={styles.spanHeader}>Add Playlists</span>
                    <form id="addSongs" className={styles.musicInputForm} onSubmit={this.shuffle}>
                        <div className={styles.playlistBox}>
                            {descriptionContainer}
                            <InputBox type='area' text='Playlists' name='playlists' />
                        </div>
                        <FormButton {...shuffleProps} />
                    </form>
                </div>
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.songList}>
                    <YoutubePlayerContainer activeVideoId={activeVideoId} />
                </div>
            </div>
        </div>;

        return shufflerApp;
    }
}