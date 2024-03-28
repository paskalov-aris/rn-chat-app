import { object, string } from 'yup';
import { LoginFieldNames } from './loginScreen.types';

export const loginSchema = object().shape({
  [LoginFieldNames.password]: string().required('Password is required'),
});
