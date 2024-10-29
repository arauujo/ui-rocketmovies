import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/auth';
import { Routes } from './routes';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import { CustomSweetAlertStyles } from './components/SweetAlert/styles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustomSweetAlertStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
