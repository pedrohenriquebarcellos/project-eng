import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  width: 100%;
  padding: 3rem 2rem;
  margin: 4rem auto;
  border-radius: 16px;

  background: ${props => props.theme['gray-800']};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme['green-500']};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  legend {
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.theme['green-300']};
  }

  input {
    border-radius: 8px;
    border: 1px solid ${props => props.theme['gray-700']};
    background: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
    padding: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: ${props => props.theme['gray-500']};
    }

    &:focus {
      outline: none;
      border-color: ${props => props.theme['green-300']};
      box-shadow: 0 0 0 2px ${props => props.theme['green-500']}33;
    }
  }

  button {
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    background-color: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${props => props.theme['green-300']};
    }
  }
`;


export const ErrorMessage = styled.span`
  color: ${props => props.theme['red-300']};
  font-size: 0.875rem;
  font-style: italic;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;