import {User} from "lucide-react"
function BarraDeNavegacao(props){
    return(<div className="col-span-3 md:col-span-1 bg-[#49708a] gap-10 flex flex-col w-full h-full flex-grow border border-r-0 border-l-0 border-b-0 border-t-black">
        <div className={" flex  flex-col w-full gap-1"}>
            <div className={"ml-2 flex flex-row justify-center"} >
                <User className={"mt-1 text-white"}></User>
                <button className=" hover:text-gray-500 text-white " onClick={
            async ()=> {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                if(props.layout===0) {
                    props.setLayout(1)
                   props.getContacts("",1,10)
                }else {
                    props.setLayout(0);
                }

            }
        }><h1 className={"text-[20px]"}>Contatos</h1></button></div></div>
    </div>)
}
export default BarraDeNavegacao;