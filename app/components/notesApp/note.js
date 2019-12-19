import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import Icon from '../icons/icon';
import { NoteSteps } from './steps';
import { clickedInsideContainer } from '../utilities/DOMHelper.js';

import styles from './notes.less';
import utilStyles from '../utilities/utilities.less';

const getListItemContent = () => {
    const listItems = document.getElementsByClassName(styles.listContent);
    let content = '';
    _.forEach(listItems, listItem => {
        content = `${content},${listItem.value}`;
    });
    content = content.slice(1);
    return content;
}

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        const { content } = this.props;
        const { id, name } = content;
        
        const listName = name === '' ? 'List' : name;

        this.state = {
            editing: false,
            id,
            name: listName,
            stepName: this.props.step
        };

        this.changeStep = this.changeStep.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEditingChange = this.handleEditingChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    changeStep(nextStep) {
        this.setState({ stepName: nextStep });
    }    

    componentDidMount() {
        document.getElementById('content').addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.getElementById('content').removeEventListener('mousedown', this.handleClick);
    }

    handleClick(ev) {
        if (this.state.editing) {
            const listContainer = document.getElementsByClassName(styles.finalNote)[0];
            !clickedInsideContainer(ev, listContainer) && this.handleEditingChange();
        }
    }

    handleContentUpdate() {
        const { id, name, stepName } = this.state;
        let content = null;
        if (stepName === 'list') {
            content = getListItemContent();
        }
        content !== null && this.props.updateNote(content, name, id);
    }

    handleEditingChange() {
        const { editing } = this.state;
        if (editing) {
            this.handleContentUpdate();
        } else {

        }
        this.setState({ editing: !editing });
    }

    handleNameChange(ev) {
        const { name } = this.state;
        ev.target.value !== name && this.setState({ name: ev.target.value });
    }

    render() {
        const { content, updateNote } = this.props;
        const { editing, name, stepName } = this.state;
        
        const currentStep = _.get(NoteSteps, stepName);
        const stepProps = {
            changeStep: this.changeStep,
            content,
            editing,
            updateNote
        };
        const step = currentStep.getContent(stepProps);
        const finalStep = stepName === 'note' || stepName === 'list';
        const noteClass = finalStep ? styles.finalNote : styles.note;
        
        const headerProps = {
            editing,
            listName: name,
            onEditClick: this.handleEditingChange,
            onNameChange: this.handleNameChange
        };

        const stepContent = finalStep ? renderFinalNote(headerProps, step) : step;

        return <div className={noteClass}>
            {stepContent}
        </div>;
    }
}

const renderHeader = props => {
    const { editing, listName, onEditClick, onNameChange } = props;

    const headerStyles = classnames(utilStyles.spanHeader, styles.noteHeader,
        editing ? styles.noteHeaderEditing : '');

    return <div className={headerStyles}>
        {editing && <span>Editing - </span>}
        <input type="text" className={classnames(styles.listName, editing ? styles.listNameEditing : '')} 
            value={listName} disabled={!editing} onChange={onNameChange} />
        <Icon iconClass="far fa-edit" noWrapper={true} 
            iconStyles={classnames(styles.editNoteButton, editing ? styles.editNoteButtonActive : '')} 
            onClick={onEditClick} />
    </div>;
};

const renderFinalNote = (headerProps, step) => {
    return <React.Fragment>
        {renderHeader(headerProps)}
        {step}
    </React.Fragment>;
};
