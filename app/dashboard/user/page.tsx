
import { getSubscription, getUser } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";


export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "User Dashboard",
};
export default async function Page() {
  
    const user = await getUser(12);
    const subscription = await getSubscription(12);
    //console.log(subscription);
    

  return ( 
    <div className="w-full">{user.length> 0?<>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{user[0].name}</h1>
      </div>
      <br />
      <Suspense fallback={<InvoicesTableSkeleton />}>
            <table>
                <thead>
                    <tr>

                        <th>Email</th>
                        <th>Active</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user[0].email}</td>
                        <td>{user[0].active}</td>
                        <td>{user[0].created_at.toLocaleDateString()}</td>
                        <td>{user[0].updated_at.toLocaleDateString()}</td>
                        <td>{subscription[0].name}</td>
                    </tr>
                </tbody>
            </table>
      </Suspense></>:<><p>No user found</p></>}
    </div>
  );
}
