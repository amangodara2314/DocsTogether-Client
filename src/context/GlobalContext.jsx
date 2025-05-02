import { createContext, useContext } from "react";
import { Toaster } from "sonner";

const MainContext = createContext();

export default function GlobalContext({ children }) {
  return (
    <MainContext.Provider value={{}}>
      {children}
      <Toaster richColors />
    </MainContext.Provider>
  );
}

export const useGlobalContext = () => useContext(MainContext);
