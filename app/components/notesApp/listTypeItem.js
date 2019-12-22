import React from 'react';
import styled from 'styled-components';

import Icon from '../icons/icon';

import styles from './notes.less';

const ListItem = styled.div`
    display: grid;
    grid-template-columns: 20px 1fr;
    min-height: 27px;
    padding: 2.5px;
    text-align: left;
`;

export const ListTypeItem = props => {
    const { content, disabled, id, onChange } = props;

    return <ListItem id={id} className="listItem">
        <Icon iconClass="fas fa-circle" iconStyles={styles.bulletPoint}
            wrapperStyles={styles.bulletPointWrapper} />
        <div type="text" className={styles.listContent} contentEditable={!disabled}
            disabled={disabled} onBlur={onChange}
            suppressContentEditableWarning="true">{content}</div>
    </ListItem>;
};