import { Smartphone } from "lucide-react";
function Header() {
  return (
<div className="bg-indigo-700 p-6 shadow-lg border ">
    <div className="flex">
        <Smartphone className="text-white"></Smartphone>
        <h1 className="text-white font-bold">My Contacts</h1>
    </div>
</div>
  );
}
export default Header;
