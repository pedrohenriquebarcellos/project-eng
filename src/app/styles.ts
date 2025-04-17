import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1080px;
    background-color: ${props => props.theme["gray-800"]};
    padding: 1rem;
`;