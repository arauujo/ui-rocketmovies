import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import '@sweetalert2/theme-dark/dark.css';
import theme from '../../styles/theme';

export function ToastAlert({ title, icon }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    background: theme.COLORS.BACKGROUND_850,
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
}

export function ModalAlert({ title, text, icon }) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    background: theme.COLORS.BACKGROUND_850,
    confirmButtonColor: theme.COLORS.PINK,
    customClass: {
      confirmButton: 'confirm-button',
    },
  });
}
