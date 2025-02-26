import CustomAlert from "@/components/CustomAlert";
import PublicNavbar from "@/components/PublicNavbar";

export default function PublicLayout({ children }) {
  return (
    <div>
      <CustomAlert/>
      <PublicNavbar/>
      {children}
    </div>
  );
}
