import { Separator } from "@/components/ui/separator";
import { Copyright } from "lucide-react";

function Footer() {
  return (
    <>
      <Separator />
      <div className="flex items-center justify-center">
        <Copyright/>
         2026 hui
      </div>
    </>
  );
}

export default Footer;
