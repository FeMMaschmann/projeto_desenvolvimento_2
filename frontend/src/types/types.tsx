export const baseURL = "http://localhost:5000";

export type TypesLogged = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TypesLoginData = {
  setLoggedData: React.Dispatch<
    React.SetStateAction<{
      Id: number;
      FirstName: string;
      LastName: string;
      Email: string;
      BusinessName: string;
    }>
  >;
  loggedData: {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    BusinessName: string;
  };
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginData = {
  email: string;
  password: string;
};
