import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { clickedInsideContainer } from '../utilities/DOMHelper.js';
import { NoteHeader } from './noteHeader';
import { NoteSteps } from './steps';
import { NoteTypes } from './types';

import { colorTheme } from '../../colors';

const Container = styled.div`
    display: block;
    grid-row: 2;
    margin: 10px;
    padding: 5px 10px 5px 0;
`;

const Spacer = styled.div`
    height: 100%;
    ${ ({ stepName }) => stepName === 'list' && `
        max-height: -webkit-fill-available;
    `}
    overflow: auto;
`;

const StyledNote = styled.div`
    align-items: center;
    border-color: ${props => props.theme.accentColor};
    border-radius: 20px;
    box-sizing: border-box;
    border-style: solid;
    border-width: 2px;
    color: ${props => props.theme.textColor};
    display: inline-grid;
    margin: 5px;
    max-height: 100%;
    min-height: 45%;
    overflow: hidden;
    text-align: center;
    vertical-align: top;
    ${ ({ editing, theme }) => editing && `
        border-color: ${theme.inputFocusColor};
    `}
    ${ ({ finalStep }) => finalStep && `
        grid-template-rows: 40px;
        padding: 0;
    `}
`;

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        const { content, stepName } = this.props;
        const { id, name } = content;
        
        this.state = {
            editing: false,
            id,
            name,
            stepName: this.props.step
        };

        this.changeStep = this.changeStep.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEditingChange = this.handleEditingChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    changeStep(nextStep) {
        if (nextStep === 'list' || nextStep === 'note') {
            const { addNote } = this.props;
            const { name } = this.state;
            const listName = nextStep === 'list' 
                && name === '' 
                ? 'New List' : 'New Note';
            this.setState({ name: listName, stepName: nextStep });
            addNote("", listName, nextStep)
        } else {
            this.setState({ stepName: nextStep });
        }       
    }    

    componentDidMount() {
        document.getElementById('content').addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.getElementById('content').removeEventListener('mousedown', this.handleClick);
    }

    handleClick(ev) {
        if (this.state.editing) {
            const { noteId } = this.props;
            const listContainer = document.getElementById(noteId);
            !clickedInsideContainer(ev, listContainer) && this.handleEditingChange();
        }
    }

    handleContentUpdate() {
        const { noteId, updateNote } = this.props;
        const { id, name, stepName } = this.state;
        let content = null;
        content = NoteTypes[stepName].getContent(noteId);
        content !== null && updateNote(content, name, id);
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
        const { content, noteId, toggleDeleteNoteConfirmation, updateNote } = this.props;
        const { editing, name, stepName } = this.state;
        
        const currentStep = _.get(NoteSteps, stepName);
        const stepProps = {
            changeStep: this.changeStep,
            content,
            editing,
            noteId,
            updateNote
        };
        const stepContent = currentStep.getContent(stepProps);
        const finalStep = stepName === 'note' || stepName === 'list';
        
        const headerProps = {
            editing,
            listName: name,
            onDeleteClick: toggleDeleteNoteConfirmation,
            onEditClick: this.handleEditingChange,
            onNameChange: this.handleNameChange
        };
        const header = <ThemeProvider theme={colorTheme}>
            <NoteHeader {...headerProps} />
        </ThemeProvider>;

        const stepWithWrappers = <Spacer stepName={stepName}>
            <Container>
                {stepContent}
            </Container>
        </Spacer>;

        return <StyledNote editing={editing} finalStep={finalStep} id={noteId}>
            { finalStep && header }
            { finalStep ? stepWithWrappers : stepContent }
        </StyledNote>;
    }
}
