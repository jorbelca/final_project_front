import Footer from "../ui/footer";
import SideNav from "../ui/sidenav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" md:flex-row bg-slate-300 dark:bg-gray-800 ">
        <div className="h-0 w-0 flex-none md:w-64">
          <SideNav />
        </div>
        <div className="min-h-[90vh] flex-grow mt-20 pt-10 p-4 sm:p-6 md:p-12 md:pt-20 md:mt-50">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
