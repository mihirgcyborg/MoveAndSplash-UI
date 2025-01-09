export interface defaultValuesProps {
    [key: string]: string;
  };

export type registerUserProps = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,               
  dateOfBirth: string,
}

export type loginUserProps = {
    email: string,
    password: string,
}