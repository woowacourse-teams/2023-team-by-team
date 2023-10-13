import { styled } from 'styled-components';

export const FakeButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 96px;
  height: 96px;

  border-radius: 12px;
  background-color: #dee1ff;

  transition: 0.2s;

  cursor: pointer;

  &:hover {
    background-color: #e8eaff;
  }

  & svg {
    color: #9792ff;
  }
`;

export const FileUploadInput = styled.input`
  display: none;
`;
