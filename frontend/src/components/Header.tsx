import { Smartphone } from "lucide-react";
function Header() {
  return (
<div className="bg-black p-6 border-b-gray-400 border ">
    <div className="flex">
        <Smartphone className="text-purple-500"></Smartphone>
        <h1 className="text-white font-bold">My Contacts</h1>
    </div>
</div>
  );
}
export default Header;
