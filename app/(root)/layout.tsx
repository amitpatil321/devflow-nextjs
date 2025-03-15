import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import NavBar from "@/components/shared/navbar/NavBar";
import ToasterWrapper from "@/components/toastWrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <NavBar />
      <div className="flex">
        <LeftSidebar />
        <section className="dark: flex min-h-screen flex-1 flex-col px-4 py-12 pt-36 dark:bg-dark-500 dark:text-white max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
        <ToasterWrapper richColors />
      </div>
    </main>
  );
};

export default Layout;
