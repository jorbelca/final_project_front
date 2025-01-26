import SideNav from "@/app/ui/dashboard/sidenav";
import Footer from "../ui/footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen md:flex-row bg-slate-100 ">
        <div className="h-0 w-0 flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow mt-20  md:overflow-y-auto md:p-12 sm:pt-20 sm:mt-50">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
