function BarraDeNavegacao(props: { layout: number; setLayout: (arg0: number) => void; }){
    return(<div className="col-span-2 md:col-span-1 bg-black p-4 gap-10 flex flex-col border-r-white border">
        <button className=" hover:text-gray-500 text-white" onClick={()=>props.layout===0?props.setLayout(1):props.setLayout(0)}>Contatos</button>
    </div>)
}
export default BarraDeNavegacao;