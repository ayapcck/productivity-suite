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

        const { content, step } = this.props;
        const { id, name } = content;
        
        this.state = {
            editing: false,
            id,
            name,
            stepName: step
        };

        this.changeStep = this.changeStep.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteStateChange = this.handleDeleteStateChange.bind(this);
        this.handleEditingChange = this.handleEditingChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    changeStep(nextStep) {
        const { userLoggedIn } = this.props;

        if (userLoggedIn) {
            if (nextStep === 'list' || nextStep === 'note') {
                const { name } = this.state;
                const listName = nextStep === 'list' && name === '' 
                    ? 'New List' : 'New Note';
                this.handleAddNewNote(listName, nextStep);
            } else {
                this.setState({ name: '', stepName: nextStep });
            }
        } else {
            alert('You need an account to use this feature');
        }
    }    

    componentDidMount() {
        document.getElementById('content').addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.getElementById('content').removeEventListener('mousedown', this.handleClick);
    }

    async handleAddNewNote(name, step) {
        const { addNote } = this.props;
        
        await addNote("", name, step);
        this.setState({ stepName: 'uninitialized' });
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
    
    handleDeleteStateChange() {
        this.setState({ stepName: 'uninitialized' });
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
        const { content, noteId, showDeleteNoteConfirmation, step, updateNote } = this.props;
        const { id } = content;
        const { editing, name, stepName } = this.state;
        
        const useStepName = stepName === 'final' ? step : stepName;
        const currentStep = _.get(NoteSteps, useStepName);
        const stepProps = {
            changeStep: this.changeStep,
            content,
            editing,
            noteId,
            updateNote
        };
        const stepContent = currentStep.getContent(stepProps);
        const finalStep = useStepName === 'note' || useStepName === 'list';
        
        const headerProps = {
            editing,
            listName: name,
            onDeleteClick: () => showDeleteNoteConfirmation(id),
            onEditClick: this.handleEditingChange,
            onNameChange: this.handleNameChange
        };
        const header = <ThemeProvider theme={colorTheme}>
            <NoteHeader {...headerProps} />
        </ThemeProvider>;

        const stepWithWrappers = <Spacer stepName={useStepName}>
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
