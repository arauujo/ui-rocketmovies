import { createGlobalStyle } from 'styled-components';

export const CustomSweetAlertStyles = createGlobalStyle`
  .confirm-button {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  }
`;