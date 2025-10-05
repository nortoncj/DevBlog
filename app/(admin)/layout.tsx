import CmsNavbar from "@/components/CmsNavbar";
import Provider from "../utils/Provider";
import "../globals.css";

export const metadata = {
  title: "Admin - Chris Norton",
  description: "Admin Dashboard for Chris Norton's Portfolio",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            
            <body>
                <Provider>  
                <CmsNavbar />
                    {children}
                </Provider>
            </body>
        </html>
    )
}