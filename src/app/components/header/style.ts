import styled from "styled-components";
import * as Popover from "@radix-ui/react-popover"

export const HeaderContainer = styled.header`
    width: 100%;
    background: ${props => props.theme['gray-900']};
    padding: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 1rem;

    svg {
        max-width: 40px;
        color: ${props => props.theme['green-300']}
    };

    h1 {
        text-align: center;
        flex: 1;
    }

    @media screen and (max-width: 768px) {
        small {
            display: none;
        }
    }
`;

export const Content = styled(Popover.Content)`
    padding: 1rem;
    border-radius: 8px;
    background: ${props => props.theme['white']};
`;

