import { HeaderLayout } from "@/components/layout/header/layout";
import { AppSidebar } from "@/components/layout/sidebar/layout";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
     
        <SidebarProvider>
          <AppSidebar/>
          <SidebarInset>
            <HeaderLayout url={""} title={""} page={""}/>
        <main className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </main>
      </SidebarInset>
        </SidebarProvider>
      
      </div>
    );
  }
  