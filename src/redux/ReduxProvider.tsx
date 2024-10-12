"use client"; // This marks this component as a client component

import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { persistor, store } from "../redux/store";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      <Toaster position="top-center" />
    </Provider>
  );
}
