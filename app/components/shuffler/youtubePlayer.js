import React from 'react';

let loadYT;

export default class YoutubePlayerContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            activeVideoId: null,
            list: null
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.state.list !== nextProps.list) {
            let activeVideoId = nextProps.list[0].id;
            this.setState({ 
                activeVideoId: activeVideoId,
                list: nextProps.list });
            this.props.updateActiveVideo(activeVideoId);
            this.loadVideo(activeVideoId);
        }
        return true;
    }

    componentDidMount() {
        if (!loadYT) {
            loadYT = new Promise((resolve) => {
                let tag = document.createElement('script');
                tag.id = 'iframe-demo';
                tag.src = 'https://www.youtube.com/iframe_api';
                let firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = () => resolve(window.YT);
            });
        }
        loadYT.then((YT) => {
            const videoId = 'M7lc1UVf-VE';
            this.player = new YT.Player('youtubePlayer', {
                videoId: videoId,
                events: {
                    'onStateChange': this.onPlayerStateChange
                }
            });
        });   
    }

    onPlayerStateChange(ev) {
        let currentVideoEnded = ev.data === 0;
        if (currentVideoEnded) {

        }
    }

    loadVideo(videoId) {
        this.player.loadVideoById(videoId);
    }

    render() {
        const { activeVideoId } = this.state;

        const videoId = activeVideoId === '' ? 'M7lc1UVf-VE' : activeVideoId;

        const ytContainer = <iframe id="youtubePlayer"
            width="640" height="360"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            frameBorder="0">
        </iframe>;
        
        return ytContainer;
    }
}