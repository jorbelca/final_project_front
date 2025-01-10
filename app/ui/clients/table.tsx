import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";

import { fetchClients } from "@/app/lib/data";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function ClientsTable() {
  const clients = await fetchClients();

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Clients
      </h1>
      <Search placeholder="Search clients..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {clients?.map((client) => (
                  
                  <div
                    key={client.client_id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    {client.image_url ?
                      <Image src={client.image_url.trimEnd()} alt={client.name} width={100} height={100} />
                    :
                    <UserCircleIcon className="w-6" />
                    }
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{client.name}</p> 
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {client.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {client.company_name}
                        </p>
                       
                      </div>
                    </div>

                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6"></th>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Company Name
                    </th>
              
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {clients.map((client) => (
                    <tr key={client.client_id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                      <div
                    key={client.client_id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    {client.image_url ?
                    <div className="flex items-center gap-3">
                      <Image src={client.image_url.trimEnd()} alt={client.name} width={60} height={60} className="rounded-full"/>
                      </div>
                    :
                    <UserCircleIcon className="w-6" />
                    }
                      </div>
                      
                      </div>

                        <div className="flex items-center gap-3">
                         
                          <p>{client.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {client.email}
                      </td>
                   
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {client.company_name}
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
