import { createContext, useContext, useState } from "react";

export const TextContext = createContext();

export function useUser() {
  let context = useContext(TextContext);

  return context;
}

function TextProvider({ children }) {
  const [user, setUser] = useState({ name: "vlad" });
  return (
    <TextContext.Provider value={{ user }}>{children}</TextContext.Provider>
  );
}

export default TextProvider;
