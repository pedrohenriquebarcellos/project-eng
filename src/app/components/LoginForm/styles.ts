import styled from "styled-components";

export const SearchFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 800px;
    width: 100%;

    legend {
        margin: 0 auto;
    }

    input {
        flex: 1;
        border-radius: 6px;
        border: 0;
        background: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        padding: 1rem;

        &::placeholder {
            color: ${props => props.theme['gray-500']};
        }
    }

    button {
        gap: 0.75rem;
        cursor: pointer;
        text-align: center;

        border: 0;
        padding: 1rem;
        background: transparent;
        border: 1px solid ${props => props.theme['green-300']};
        color: ${props => props.theme['green-300']};
        font-weight: bold;
        border-radius: 6px;

        &:disabled {
            opacity: 0.7;
        }

        &:not(:disabled):hover {
            background: ${props => props.theme['green-500']};
            border: 1px solid ${props => props.theme['green-500']};
            color: ${props => props.theme.white};
            transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        }
    }
`;

export const ErrorMessage = styled.span`
    color: ${props => props.theme['red-300']};
    font-style: italic;
`;