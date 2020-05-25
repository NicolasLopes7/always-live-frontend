import styled from 'styled-components';

export const Input = styled.input`
    width: 50%;
    margin-top: 0px;
    margin-bottom: 10px;
    padding: 6px 12px;
    border-radius: 5px;
    color: palevioletred;
    border: 1px solid palevioletred;
    background: papayawhip;
    ::placeholder {
        color: palevioletred;
    }
`;

export default { Input };
