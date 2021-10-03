import {HelmetProvider} from "react-helmet-async";
import { AuthProvider } from "~/services/auth";
import Main from "./Main";

export const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </HelmetProvider>
  )
};
