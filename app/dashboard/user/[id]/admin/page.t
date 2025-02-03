// "use client";

// import { usersFull } from "@/app/lib/data";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// interface User {
//   id: number;
//   name: string;
//   profile_photo_path: string;
//   active: number;
//   budgets: Array<{ state: string }>;
//   clients: Array<any>;
//   costs: Array<any>;
//   admin: boolean;
// }

// // const getBudgetCounts = (user: User) => {
// //   const router = useRouter();
// //   useEffect(() => {
// //     if (!user.admin) {
// //       router.push("dashboard/user");
// //     }
// //   }, [user]);
// //   return user.budgets.reduce((acc, budget) => {
// //     acc[budget.state] = (acc[budget.state] || 0) + 1;
// //     return acc;
// //   }, {} as Record<string, number>);
// // };

// export default async function AdminPanel() {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setUsers(await usersFull());
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="flex align-center justify-center gap-5 items-end">
//             <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//               Admin
//             </h2>
//           </div>
//         </div>
//       </header>

//       <main>
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           {users ??
//             users.map((user) => (
//               <div
//                 key={user.id}
//                 className="overflow-x-auto p-2 m-3 bg-white rounded-lg flex flex-row justify-between"
//               >
//                 <div className="w-1/4 pl-2">
//                   <h3 className="font-bold">User</h3>
//                   <div>{user.id}</div>
//                   <Image
//                     src={user.profile_photo_path || "/placeholder.svg"}
//                     alt=""
//                     width={30}
//                     height={30}
//                   />
//                   <div>{user.name}</div>

//                   {user.active === 1 ? (
//                     <div className="text-green-500">Active</div>
//                   ) : (
//                     <div className="text-red-500">Inactive</div>
//                   )}

//                   <button
//                     onClick={() => {
//                       /* changeState function would go here */
//                     }}
//                     className="rounded-sm bg-zinc-400 hover:bg-zinc-500 text-white p-1"
//                   >
//                     Change State
//                   </button>
//                 </div>
//                 <div className="px-4 flex flex-col justify-center items-center w-1/4">
//                   <h3 className="font-bold">Budgets</h3>
//                   <div>Nº: {user.budgets.length}</div>

//                   {/* <div>
//                   {["draft", "approved", "rejected", "sent"].map((state) => (
//                     <span
//                       key={state}
//                       className="flex flex-row items-center gap-2 py-1"
//                     >
//                       {user.budgets.some(
//                         (budget) => budget.state === state
//                       ) && <BudgetState status={state} />}
//                       {getBudgetCounts(user)[state] || 0}
//                     </span>
//                   ))}
//                 </div> */}
//                 </div>
//                 <div className="px-4 flex flex-col justify-center items-center w-1/4">
//                   <h3 className="font-bold">Clients</h3>
//                   <div>Nº: {user.clients.length}</div>
//                 </div>
//                 <div className="px-4 flex flex-col justify-center items-center w-1/4">
//                   <h3 className="font-bold">Costs</h3>
//                   <div>Nº: {user.costs.length}</div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </main>
//       <div className="pb-10"></div>
//     </div>
//   );
// }
