import React from 'react';
import styled from 'styled-components';

const DSLHowToContent = styled.div`
    height : 100%;
    overflow: auto;
`;

const DSLHowToContainer = styled.div`
    border-color: ${(props) => props.theme.accentColor};
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    height: 100%;
    padding: 5px 5px 10px 5px;
    overflow: hidden;

    & p {
        margin: 5px;
    }
`;

export const ContentExplanation = () => <DSLHowToContainer>
    <DSLHowToContent>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat dui in feugiat interdum. Morbi eget fringilla mi. Quisque ut tortor magna. Nulla nisl nisl, iaculis in nibh ut, congue condimentum nisl. Fusce vulputate sollicitudin erat non congue. Maecenas in vestibulum nisi. Duis a est ac ipsum placerat mollis. Aenean nulla justo, volutpat sit amet egestas id, sagittis et nulla. Proin elementum a velit nec commodo. Nulla eleifend mollis sagittis. Ut vitae mi vitae quam vehicula ornare non id sem. Duis risus dolor, vulputate sit amet ultrices at, ullamcorper at ante. Nulla nisi sapien, scelerisque et faucibus sit amet, efficitur tincidunt tellus. Quisque iaculis tortor eget efficitur ullamcorper.
        </p>

        <p>
            Curabitur ut vulputate purus, aliquet pulvinar justo. Sed non enim non dui molestie cursus. Phasellus gravida nunc at lacus ultricies posuere. Donec efficitur condimentum lectus, sit amet euismod massa porta vulputate. Pellentesque mattis sed quam a ornare. Proin tempus purus erat, eget dapibus metus ultrices id. Aliquam quis ultrices sem, at volutpat elit. Praesent sapien odio, placerat sit amet augue a, lobortis semper metus. Nam luctus dolor turpis, id tincidunt urna egestas nec. In dui neque, tincidunt nec scelerisque sed, aliquet eu dolor. Proin lacinia fermentum tortor, ut vulputate libero tempus dapibus.
        </p>

        <p>
            Fusce et rhoncus ligula. Etiam molestie efficitur egestas. Aenean tincidunt sagittis facilisis. Ut iaculis ultrices imperdiet. Pellentesque ut mattis urna, eu volutpat sapien. Vestibulum eu dictum tellus. Aliquam id fringilla justo. Nam auctor porta dolor, eget auctor dui facilisis sit amet. Nulla quis eros enim. In non ante dolor. Fusce porttitor sapien at erat euismod, vel vehicula massa tincidunt. Nulla orci eros, euismod commodo dignissim tempus, posuere non nibh.
        </p>
    </DSLHowToContent>
</DSLHowToContainer>;