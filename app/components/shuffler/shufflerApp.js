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

const parseVideoList = (jsonResponse) => {
    const videoList = _.map(jsonResponse.items, (item) => {
        const snippet = item.snippet;
        return {
            id: snippet.resourceId.videoId,
            title: snippet.title
        };
    });
    return {
        nextPageToken: _.get(jsonResponse, 'nextPageToken', ''),
        videoList: videoList
    };
};

const fetchVideoListPart = async (listId, pageToken = '') => {
    const url = createUrl(listId, pageToken);
    const jsonResponse = await getJson(url);
    return parseVideoList(jsonResponse);
};

const fetchVideoList = (listId, pageToken = '') => fetchVideoListPart(listId, pageToken).then((videoListContent) => {
    if (videoListContent.nextPageToken !== '') {
        return fetchVideoList(listId, videoListContent.nextPageToken)
            .then((nextVideoListContent) => _.concat(videoListContent.videoList, nextVideoListContent));
    }
    return videoListContent.videoList;
});

const durstenfeldShuffle = (list) => {
    const N = list.length;
    let listToBeShuffled = list;
    for (let i = N-1; i > 0; i--) {
        const j = _.random(i);
        const temp = listToBeShuffled[i];
        listToBeShuffled[i] = listToBeShuffled[j];
        listToBeShuffled[j] = temp;
    }
    return listToBeShuffled;
};

export default class ShufflerApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: '',
            activeVideoId: ''
        }

        this.shuffle = this.shuffle.bind(this);
        this.updateActiveVideo = this.updateActiveVideo.bind(this);
    }

    log(message, functionName) {
        Logger.log(message, 'shufflerApp', functionName);
    }

    shuffle(ev) {
        ev.preventDefault();
        const listId = ev.target[0].value;
        //this.setState({ list: list });
        fetchVideoList(listId).then((videoIdList) => {
            const shuffledList = durstenfeldShuffle(videoIdList);
            this.setState({ list: shuffledList });
        });
    }

    updateActiveVideo(videoId) {
        this.setState({ activeVideoId: videoId });
    }

    render() {
        const { activeVideoId, list } = this.state;
        
        const shuffleProps = {
            containerClass: styles.pushDown,
            name: 'shufflePlaylists',
            text: 'Shuffle',
            type: 'submit'
        };

        const songs = _.map(list, (item, index) => {
            return <Song key={index} index={index} 
                songName={item.title} active={item.id === activeVideoId} />;
        });

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
                <div className={styles.youtubeContainer}>
                    <YoutubePlayerContainer updateActiveVideo={this.updateActiveVideo} list={list} />
                </div>
                <div className={styles.songPanel}>
                    <div className={styles.infoAndControls}></div>
                    <div className={styles.songList}>
                        {songs}
                    </div>
                </div>
            </div>
        </div>;

        return shufflerApp;
    }
}

const Song = (props) => {
    const {index, active, songName} = props;

    return <p key={index} className={classnames(active ? styles.activeSong : '')}>{songName}</p>
}