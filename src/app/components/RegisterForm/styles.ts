import styled, { keyframes } from "styled-components";

export const RegisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1024px;
  width: 100%;
  padding: 3rem 2rem;
  margin: 4rem auto;
  border-radius: 16px;

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    legend {
      text-decoration: underline;
      margin-bottom: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 2rem 1rem;
    margin: 2rem auto;
  }

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

  select,
  input {
    margin: 0.5rem 0;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${props => props.theme['gray-700']};
    background: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
    padding: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: ${props => props.theme['gray-500']};
      font-style: italic;
    }

    &:focus {
      outline: none;
      border-color: ${props => props.theme['green-300']};
      box-shadow: 0 0 0 2px ${props => props.theme['green-500']}33;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

export const GroupFields = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0 1rem;
  flex-wrap: wrap;
  margin: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin: 0;    
  }

  label {
    font-size: 0.875rem;
    font-weight: bold;
    color: ${props => props.theme['gray-400']};    

    &.required {
      &::after {
        content: '*';
        color: ${props => props.theme['red-300']};
        margin-left: 0.25rem;
      }
    }
  }
`;

export const FieldsWrapper = styled.div<{ flex?: string }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: ${ ({flex}) => flex || '1' };

  @media screen and (max-width: 768px) {
    flex: 1 1 100%;
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #555;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 0.6s linear infinite;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  
  button {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;