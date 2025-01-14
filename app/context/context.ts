// "use server";
// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define el tipo de datos que el contexto manejará
// interface User {
//   user_id: number;

// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }


// const SidebarContext = createContext({});

// export function Sidebar() {
//   const [isOpen, setIsOpen] = useState();

//   return (
//     <SidebarContext.Provider value={{ isOpen }}>
//       <SidebarNav />
//     </SidebarContext.Provider>
//   );
// }


// // Hook personalizado para usar el contexto

// export default function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser debe ser usado dentro de un UserProvider");
//   }
//   return context;
// }
