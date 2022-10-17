import { TypesLogged, TypesLoginData } from "../types/types";
import Menu from "./Menu";

export default function Account(props: TypesLogged & TypesLoginData) {
  return (
    <>
      <Menu
        isLogged={props.isLogged}
        setIsLogged={props.setIsLogged}
        loggedData={props.loggedData}
        setLoggedData={props.setLoggedData}
      />
    </>
  );
}
