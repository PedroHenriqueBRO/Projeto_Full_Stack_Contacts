import {Pencil, Plus} from "lucide-react";
import { Trash2 } from 'lucide-react';
import type {PostContact,Contact} from "./GerenciaOperacoes.tsx";
function TelaDeCrud(props){
    const contatoaux:PostContact={nome:"",email:"",phone:""};
    if(props.layout===0){
        return(<div></div>)
    }
    else if(props.layout===1){
        return(<div className={"bg-white shadow-lg h-full p-10 flex flex-col gap-2"}>
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
">
                        <Plus size={16} onClick={()=>props.setLayout(2)}/>
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
                {props.contacts.map((contact:Contact) =>{
                    return(<li className="py-2 text-gray-900 grid grid-cols-5">
                        <p className="font-extralight ml-[20px]">{contact.id}</p>
                        <p className="font-bold">{contact.nome}</p>
                        <p className="text-sm text-gray-600">
                            {contact.email}
                        </p>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                        <div className={'flex'}><button
                            title="Editar Registro"
                            className="
        p-1.5 rounded-full border border-gray-300
        text-indigo-600
        transition duration-150 ease-in-out

        hover:bg-indigo-50 hover:border-indigo-400
        focus:outline-none focus:ring-2 focus:ring-indigo-400
    ">
                            <Pencil size={18} />
                        </button><Trash2 onClick={()=>{
                            props.delete(contact.id)
                            props.getContacts("",1,10)

                        }
                        }></Trash2></div>
                    </li>)
                })
                }
                </ul>
            </div>
            <div className={'row-span-2 bg-gray-100 rounded-r-md shadow-lg rounded-l-md rounded-b-md rounded-tl-none rounded-tr-none'}></div>

        </div>
    </div>);
    }
    if(props.layout===2){
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
                    <div className={'flex flex-col items-center w-full mt-10'}><p><button

                        className="
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
                </button></p></div>
                </div>


            </div>
        </div>);

    }
}

export default TelaDeCrud;