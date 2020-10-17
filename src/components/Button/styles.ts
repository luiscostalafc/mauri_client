import styled, { css} from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  isLoading: number
  typeColor?: 'create'| 'edit' | 'delete'
}

const backgroundVariationColor = {
  create: css`
   background: #48BB78;
  `,
  edit: css`
  background: #4299E1;
  `,
  delete: css`
  background: #F56565;
  `
}

export const Container = styled.button<ContainerProps>`
  background: #ff9000;
  ${(props) => backgroundVariationColor[props.typeColor || '#ff9000']}
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.3s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
`
