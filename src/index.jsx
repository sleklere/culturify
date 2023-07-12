import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
// import Loading from "./pages/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        // loading={<Loading />}
        persistor={persistor}
        // for delaying loading screen
        // onBeforeLift={() => new Promise((resolve) => setTimeout(resolve, 1000))}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
