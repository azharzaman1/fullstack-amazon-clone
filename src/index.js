import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./Files/StateProvider";
import { initialState } from "./Files/reducer";
import reducer from "./Files/reducer";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import ThemeWrapper from "./Files/Mui/ThemeWrapper";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper>
      <StateProvider reducer={reducer} initialState={initialState}>
        <Provider store={store}>
          <App />
        </Provider>
      </StateProvider>
    </ThemeWrapper>
  </React.StrictMode>,
  RootDirectory
);

// reportWebVitals();
