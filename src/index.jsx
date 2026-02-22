import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import i18next from "i18next";
import App from "./App";
import store from "./reducers";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));

root.render(
  <Suspense
    fallback={
      <div id="sus-fallback">
        <h1>{i18next.t("common.loading", "Cargando")}</h1>
      </div>
    }
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
);
