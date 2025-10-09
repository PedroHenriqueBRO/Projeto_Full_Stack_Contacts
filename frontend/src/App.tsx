import Header from "./components/Header";
import Caixadeform from "./components/Caixadeform";
import { Smartphone } from "lucide-react";
function App() {
  return (
    <div className="bg-black w-screen h-screen flex justify-center">
      <div className="absolute mr-410 mt-2 flex rounded-md">
        <Smartphone size={25} className="text-indigo-600 mt-3" />
        <h1 className="text-white text-[30px]">My Contacts</h1>
      </div>
      <div className="absolute">
        <Caixadeform></Caixadeform>
      </div>
      <div className="absolute">
        <Header></Header>
      </div>
    </div>
  );
}

export default App;
