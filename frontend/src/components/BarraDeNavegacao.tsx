import * as React from "react";

function BarraDeNavegacao(props){
    return(<div className="col-span-2 md:col-span-1 bg-black p-4 gap-10 flex flex-col border-r-white border">
        <button className=" hover:text-gray-500 text-white" onClick={
            async ()=> {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                if(props.layout===0) {
                   await props.getContacts("",1,10)
                    props.setLayout(1);
                }else {
                    props.setLayout(0);
                }

            }
        }>Contatos</button>
    </div>)
}
export default BarraDeNavegacao;