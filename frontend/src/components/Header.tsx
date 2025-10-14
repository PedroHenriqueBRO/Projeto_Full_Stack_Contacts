import { Smartphone } from "lucide-react";
function Header() {
    return (
        <div className="bg-[#49708a] p-6 shadow-lg ">
            <div className="flex">
                <Smartphone className="text-white"></Smartphone>
                <h1 className="text-white font-bold">My Contacts</h1>
            </div>
        </div>
    );
}
export default Header;
