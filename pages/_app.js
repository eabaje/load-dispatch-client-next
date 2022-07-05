import MainLayout from "../layout/mainLayout";
import "../styles/globals.css";
import { StateMachineProvider, createStore } from "little-state-machine";

function MyApp({ Component, pageProps }) {
  createStore({
    companyUser: {
      CompanyName: "",
      ContactEmail: "",
      ContactPhone: "",
      CompanyAddress: "",
      Country: "",
      Region: "",
      CompanyType: "",
      Specilaization: "",
      RoleType: "",
      FullName: "",
      Address: "",
      Email: "",
      Phone: "",
      Website: "",
      PaymentMethod: "",
      Currency: "",
    },
  });
  return (
    <StateMachineProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </StateMachineProvider>
  );
}

export default MyApp;
