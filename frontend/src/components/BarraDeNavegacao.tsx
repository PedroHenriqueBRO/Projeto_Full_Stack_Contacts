function BarraDeNavegacao(props){
    return(<div className="col-span-3 md:col-span-1 bg-black p-4 gap-10 flex flex-col border-r-white border flex-grow">
        <button className=" hover:text-gray-500 text-white" onClick={
            async ()=> {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                if(props.layout===0) {
                    props.setLayout(1)
                   props.getContacts("",1,10)
                }else {
                    props.setLayout(0);
                }

            }
        }>Contatos</button>
    </div>)
}
export default BarraDeNavegacao;