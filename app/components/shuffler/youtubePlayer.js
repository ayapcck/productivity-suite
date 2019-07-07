import React from 'react';

let loadYT;

export default class YoutubePlayerContainer extends React.Component {

    // componentDidMount() {
    //     if (!loadYT) {
    //         loadYT = new Promise((resolve) => {
    //             let tag = document.createElement('script');
    //             tag.id = 'iframe-demo';
    //             tag.src = 'https://www.youtube.com/iframe_api';
    //             let firstScriptTag = document.getElementsByTagName('script')[0];
    //             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //             window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    //         });
    //     }
    //     loadYT.then((YT) => {
    //         const { activeVideo } = this.state;
    //         const videoId = 'M7lc1UVf-VE';
    //         this.player = new YT.Player('youtubePlayer', {
    //             videoId: videoId
    //         });
    //     });   
    // }

    render() {
        const { activeVideoId, containerClass } = this.props;

        const videoId = activeVideoId === '' ? 'M7lc1UVf-VE' : activeVideoId;

        const ytContainer = <iframe id="youtubePlayer"
            width="640" height="360"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            frameBorder="0">
        </iframe>;
        
        return ytContainer;
    }
}