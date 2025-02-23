import { lato } from "@/app/ui/fonts";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "../button";
import Link from "next/link";
import DeleteBtn from "./delete-btn";

import { PlusIcon } from "lucide-react";

export default async function ClientsTable({ clients, user_id }) {
  return (
    <div className="w-full p-1 md:p-0 ">
      <div className="flex justify-between">
        <h1 className={`${lato.className} mb-8 text-xl md:text-2xl`}>
          Clients
        </h1>
        <Link
          href="/dashboard/clients/create"
          className="bg-indigo-400  dark:bg-indigo-600 flex h-10 items-center
          rounded-lg px-4 text-sm font-medium text-white transition-colors 
           aria-disabled:cursor-not-allowed aria-disabled:opacity-50 cursor-pointer"
        >
          <PlusIcon className="h-5 w-5" />
        </Link>
      </div>
      {/* <Search placeholder="Search clients..." /> */}
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-visible rounded-md gray-50 dark:bg-gray-500 p-0 md:pt-0">
              {/* Vista móvil */}
              <div className="md:hidden">
                {clients?.map((client) => (
                  <div
                    key={client.client_id}
                    className="mb-2 w-full rounded-md bg-white dark:bg-slate-600 p-4"
                  >
                    <div className="flex items-center justify-between gap-3 ">
                      {client.image_url ? (
                        <Image
                          src={client.image_url.trimEnd()}
                          alt={client.name}
                          width={50}
                          height={50}
                          className="rounded-full "
                        />
                      ) : (
                        <UserCircleIcon className="w-6" />
                      )}
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-500 dark:text-white">
                          {client.email}
                        </p>
                      </div>
                      <div className="flex gap-1 pr-10">
                        <Link
                          href={`/dashboard/clients/edit/${client.client_id}`}
                        >
                          <Button className="bg-yellow-300">
                            <PencilIcon className="h-5 w-5" />
                          </Button>
                        </Link>
                        <br />

                        <DeleteBtn
                          clientId={Number(client.client_id)}
                          user_id={user_id}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Vista en web */}
              <table className=" text-center border rounded-lg overflow-hidden hidden min-w-full text-gray-900 md:table">
                <thead
                  className="bg-gray-50 dark:bg-gray-500 dark:text-white  
                text-left text-sm font-medium"
                >
                  <tr>
                    <th scope="col" className="px-4 py-5 sm:pl-6">
                      Image
                    </th>
                    <th scope="col" className="px-4 py-5 text-center">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-5 text-center">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-5 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients?.map((client) => (
                    <tr
                      key={client.client_id}
                      className="bg-white dark:bg-gray-600 group"
                    >
                      <td className="px-4 py-5 sm:pl-6">
                        {client.image_url ? (
                          <Image
                            src={client.image_url.trimEnd()}
                            alt={client.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                        ) : (
                          <UserCircleIcon className="w-6" />
                        )}
                      </td>
                      <td className="px-4 py-5 text-sm font-medium dark:text-white">
                        {client.name}
                      </td>
                      <td className="px-4 py-5 text-sm text-gray-500 dark:text-white">
                        {client.email}
                      </td>
                      <td className="flex justify-center gap-2 py-5">
                        <Link
                          href={`/dashboard/clients/edit/${client.client_id}`}
                        >
                          <Button className=" bg-yellow-300">
                            <PencilIcon className="h-5 w-5" />
                          </Button>
                        </Link>
                        <br />
                        <DeleteBtn
                          clientId={Number(client.client_id)}
                          user_id={user_id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
