var React = require('react');

import classnames from 'classnames';

import { CenterPanel } from '../centerPanel/centerPanel.js';
import { clickedInsideContainer } from '../utilities/DOMHelper.js';

import styles from './formPopup.less';

export default class FormPopup extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseFromClickOutside = this.handleCloseFromClickOutside.bind(this);
    }
    
    handleCloseFromClickOutside(e) {
        const { id } = this.props;
        const container = document.getElementById(id);
        !clickedInsideContainer(e, container) && this.props.handleCloseForm();
    }

    render() {
        const { content, id } = this.props;

        const formPopup = <React.Fragment>
            <div className={classnames(styles.opaqueBackground)}></div>
            <div className={classnames(styles.container)} onMouseDown={this.handleCloseFromClickOutside}>
                <CenterPanel content={content} id={id}/>
            </div>
        </React.Fragment>

        return formPopup;
    }
}