import {Pencil, Plus} from "lucide-react";
import { Trash2 } from 'lucide-react';
import type {PostContact,Contact} from "./GerenciaOperacoes.tsx";
import {useState} from "react";
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
function TelaDeCrud(props){
    const contatoaux:PostContact={nome:"",email:"",phone:""};
    const [editar,setEditar] = useState(false);
    const [id, setId] = useState<number>(-1);
    let pageSize:number = 10;
    if(props.layout===0){
        return(<div></div>)
    }
    else if(props.layout===1){
        return(props.loading?<div className={"w-full h-full flex items-center justify-center"}> <h1 className={"text-[50px]"}>Carregando Contatos...</h1></div>:<div className={"bg-white shadow-lg h-full p-10 flex flex-col gap-2"}>
            <div className={"grid grid-cols-2 w-full"}>
                <div className={"col-span-1"}><h1 className={"text-black text-[30px]"}>Contatos</h1></div>
                <div className={"col-span-1 flex justify-end items-center w-full"}> <p className={""}>
                    <button className="
    inline-flex items-center justify-center gap-1.5
    px-4 py-2 text-sm font-medium
    rounded-lg
    bg-gray-900 text-white
    shadow-md shadow-gray-900/40
    transition-all duration-150 ease-in-out
    hover:bg-black
    hover:shadow-lg hover:shadow-gray-900/50
    focus:outline-none focus:ring-2 focus:ring-gray-400
" onClick={()=>props.setLayout(2)}>
                        <Plus size={16}/>
                        Create
                    </button>
                </p>
                </div>
            </div>
        <div className={"bg-gray-500 rounded-md grid grid-rows-15 border"}>

            <div className={'flex-grow flex-wrap row-span-3 bg-gray-100 shadow-lg rounded-r-md sm:gap-10 md:gap-20 lg:gap-35 xl:gap-45 2xl:gap-70  rounded-l-md rounded-t-md rounded-b-none flex items-end '}>
                <h1 className={"ml-[17px]"}>Id</h1>
                <h1>Name</h1>
                <h1>Email</h1>
                <h1 >Phone</h1>
            </div>
            <div className={'row-span-10 bg-white shadow-lg rounded-b-none'}>
                <ul>

                {
                        props.contacts.map((contact:Contact) =>{
                            if(!editar && contact.id!==id){
                        return(<li className="py-2 text-gray-900 grid grid-cols-5">
                            <p className="font-extralight ml-[20px]">{contact.id}</p>
                            <p className="font-bold">{contact.nome}</p>
                            <p className="text-sm text-gray-600">
                                {contact.email}
                            </p>
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                            <div className={'flex gap-3 items-center'}><button
                                title="Editar Registro"
                                className="
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                " onClick={()=>{setEditar(true); setId(contact.id)}}>
                                <Pencil size={18} />
                            </button>
                                <Trash2 onClick={async ()=>{
                                await props.delete(contact.id)
                                props.getContacts("",1,10)

                            }
                            }></Trash2></div>
                        </li>)} if(editar && contact.id===id){
                                return(<li className="py-2 text-gray-900 grid grid-cols-5">
                                    <p className="font-extralight ml-[20px]" > {contact.id}</p>
                                    <input className="font-bold " placeholder={contact.nome} onChange={(e)=>contatoaux.nome=e.target.value}></input>
                                    <input className="text-sm text-gray-600" placeholder={contact.email} onChange={(e)=>contatoaux.email=e.target.value}>
                                    </input>
                                    <input className="text-sm text-gray-600" placeholder={contact.phone} onChange={(e)=>contatoaux.phone=e.target.value}></input>
                                    <div className={'flex items-center gap-3'}><button
                                        title="Confirmar Atualização"
                                        className="
                                        ml-5
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                " onClick={async ()=>{
                                    console.log(contatoaux)
                                        console.log(contact.id)
                                    await props.putContact(contatoaux,contact.id);
                                    props.getContacts("",1,10)
                                        setId(-1)
                                    setEditar(false);
                                }}>
                                        <Check size={18} />
                                    </button>
                                        <X onClick={()=>{
                                            setId(-1)
                                            setEditar(false)
                                        }
                                        }></X></div>
                                </li>)
                            }
                    })
                }
                </ul>
            </div>
            <div className={'row-span-2 bg-gray-100 rounded-r-md shadow-lg rounded-l-md rounded-b-md rounded-tl-none rounded-tr-none flex justify-end gap-2'}>
                <p className={"mt-2"}>Rows per page: </p>
                <div><input
                    type="number"
                    id="quantidade"
                    min="1"
                    max="10"
                    className="
            mt-1 block w-full
            rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500
            sm:text-sm p-2"
                onChange={(e)=>pageSize= e.target.value as unknown as number}
                />
                </div>
                <div ><button
                    title="Confirmar Atualização"
                    className=" mt-1
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                " onClick={async ()=>{
                    props.getContacts("",1,pageSize)

                }}>
                    <Check size={18} />
                </button></div>
            </div>

        </div>
        </div>);
    }
    if (props.layout === 2) {
        return (<div className={"bg-white shadow-lg h-full w-full p-10 flex flex-col gap-2"}>
            <div className={"flex flex-col w-full h-full"}>
                <div>
                    <h1 className={"font-extralight"}>Contatos / New</h1>
                </div>
                <div className={"col-span-1"}><h1 className={"text-black text-[30px]"}>Criar Contato</h1></div>
                <div className={" w-full h-[300px] bg-gray-100 rounded-md"}>
                    <div className={"grid grid-rows-6 "}>
                        <h1 className={'text-center h-[22px]'}>Nome</h1>
                        <div className={"justify-center flex"}><input className={"bg-gray-300 rounded-md border text-center w-[250px]"} onChange={(e)=>contatoaux.nome=e.target.value} /></div>
                        <h1 className={'text-center h-[22px]'}>Email</h1>
                        <div className={"justify-center flex"}><input className={"bg-gray-300 rounded-md border text-center w-[250px]"}  onChange={(e)=>contatoaux.email=e.target.value}/></div>
                        <h1 className={'text-center h-[22px]'}>Phone</h1>
                        <div className={"justify-center flex"}><input className={"bg-gray-300 rounded-md border text-center w-[250px]"}  onChange={(e)=>contatoaux.phone=e.target.value}/></div>
                    </div>
                    <div className={'grid grid-cols-2 justify-center items-center '}>
                        <div className={'flex justify-end mr-25'}>

                        <X className={'rounded-md border'} onClick={()=>{
                            props.setLayout(1);
                        }}></X></div>
                        <div>
                        <button

                        className=" ml-9
                        inline-flex items-center justify-center gap-1.5
                        px-3 py-1.5
                        text-sm font-medium text-gray-700
                        rounded-md
                        border border-gray-300 bg-white
                        transition-all duration-150 ease-in-out

                        hover:bg-gray-50 hover:border-gray-400
                        focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                        "
                        >
                    <Plus size={16} className="text-gray-500" onClick={ async ()=>{
                        await props.postContact(contatoaux);
                        props.getContacts("",1,10)}} />
                        Create
                </button></div></div>
                </div>


            </div>
        </div>);

    }
}

export default TelaDeCrud;