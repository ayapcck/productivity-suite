var React = require('react');

import classnames from 'classnames';

import CenterPanel from '../centerPanel/centerPanel.js';
import Icon from '../icons/icon.js';

import centeredBoxStyles from '../centerPanel/centerPanel.less';
import styles from './formPopup.less';

export default class FormPopup extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseFromClickOutside = this.handleCloseFromClickOutside.bind(this);
    }
    
    handleCloseFromClickOutside(e) {
        let clickX = e.clientX;
        let clickY = e.clientY;
        if (clickX !== 0 && clickY !== 0) {
            let loginContainer = document.getElementsByClassName(centeredBoxStyles.centeredBox);
            let containerRect = loginContainer[0].getBoundingClientRect();
            let clickInsideContainer = clickX > containerRect.left && clickX < containerRect.right &&
                                        clickY > containerRect.top && clickY < containerRect.bottom;
            !clickInsideContainer && this.props.handleCloseForm();
        }
    }

    render() {
        let formPopup = <React.Fragment>
            <div className={classnames(styles.opaqueBackground)}></div>
            <div className={classnames(styles.container)} onMouseDown={this.handleCloseFromClickOutside}>
                <CenterPanel content={this.props.content} />
            </div>
        </React.Fragment>

        return formPopup;
    }
}