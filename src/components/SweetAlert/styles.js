import { createGlobalStyle } from 'styled-components';

export const CustomSweetAlertStyles = createGlobalStyle`
  .confirm-button {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  }

  .swal2-title, .swal2-html-container {
    color: #E1E1E1;
  }
`;