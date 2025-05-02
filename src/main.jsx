import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/poppins";
import { Provider } from "react-redux";
import store from "./store/store.js";
import GlobalContext from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalContext>
      <App />
    </GlobalContext>
  </Provider>
);
