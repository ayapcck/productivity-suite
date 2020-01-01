import React from 'react';
import styled from 'styled-components';

const StyledBulletPoint = styled.i`
    font-size:  0.5em;
`;
const BPWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;

const ListContent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.backgroundColor};
    border-radius: 15px;
    border-style: solid;
    box-sizing: border-box;
    border-width: 2px;
    color: ${(props) => props.theme.textColor};
    padding: 2.5px;
    text-align: left;
    &:focus {
        outline: 0;
        box-shadow: 0 0 2pt 1pt ${(props) => props.theme.inputFocusColor};
    }
`;
const ListItem = styled.div`
    display: grid;
    grid-template-columns: 20px 1fr;
    min-height: 27px;
    padding: 2.5px;
    text-align: left;
`;

export const ListTypeItem = props => {
    const { content, editing, id, onChange } = props;

    return <ListItem id={id} className="listItem">
        <BulletPoint />
        <ListContent contentEditable={editing} onBlur={onChange}
            suppressContentEditableWarning="true">
                {content}
        </ListContent>
    </ListItem>;
};

const BulletPoint = () => {
    return <BPWrapper>
        <StyledBulletPoint className="fas fa-circle"></StyledBulletPoint>
    </BPWrapper>
};