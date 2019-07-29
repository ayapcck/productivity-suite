import React from 'react';
import _ from 'lodash';

import { NoteSteps } from './steps';

import styles from './notes.less';

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stepName: this.props.step
        };

        this.changeStep = this.changeStep.bind(this);
    }

    changeStep(nextStep) {
        this.setState({ stepName: nextStep });
    }

    render() {
        const { stepName } = this.state;
        
        const currentStep = _.get(NoteSteps, stepName);
        const step = currentStep.getContent(this.changeStep);
        const finalStep = stepName === 'note' || stepName === 'list';

        const noteClass = finalStep ? styles.finalNote : styles.note;

        return <div className={noteClass}>
            {step}
        </div>;
    }
}