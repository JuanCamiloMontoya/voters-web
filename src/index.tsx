import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { injectStore } from "./common/axios/interceptors";
import { theme } from "./common/antd/theme";
import App from "./scenes";
import "./sass/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

injectStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
