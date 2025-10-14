import { Pencil, Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import type { Contact, PostContact } from "./ContactsInterfaces.tsx";
import { useState } from "react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Search } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { ArrowLeft } from "lucide-react";
function TelaDeCrud(props: {
  layout: number;
  loading: boolean;
  setLayout: (arg0: number) => void;
  getContacts: (
    arg0: string,
    arg1: number,
    arg2: number,
    arg3: string,
    arg4: string,
  ) => void;
  contacts: Contact[];
  delete: (arg0: number) => Promise<void>;
  postContact: (arg0: PostContact) => void;
  putContact: (arg0: Contact, arg1: number) => Promise<void>;
}) {
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [procurar, setProcurar] = useState<boolean>(false);
  let q: string = "";
  const [sort, setSort] = useState<string>("none");
  const [order, setOrder] = useState<string>("asc");
  const [nomeError, setNomeError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [qError, setQError] = useState<string>("");
  const [pageSizeError, setPageSizeError] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [editNome, setEditNome] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");

  function validateNome(value: string) {
    if (!value || value.trim() === "") return "Nome é obrigatório.";
    if (value.length > 100) return "Nome deve ter no máximo 100 caracteres.";
    return "";
  }
  function validateEmail(value: string) {
    if (!value || value.trim() === "") return "Email é obrigatório.";
    if (value.length > 254) return "Email deve ter no máximo 254 caracteres.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Email inválido.";
    return "";
  }
  function validatePhone(value: string) {
    if (!value || value.trim() === "") return "Telefone é obrigatório.";
    return "";
  }
  function validateQ(value: string) {
    if (value.length > 100) return "Busca (q) deve ter no máximo 100 caracteres.";
    return "";
  }
  function validatePageSize(value: number) {
    if (!Number.isInteger(value) || value <= 0) return "pageSize deve ser um inteiro positivo.";
    if (value > 10) return "pageSize máximo é 10.";
    return "";
  }

  if (props.layout === 0) {
    return <div></div>;

  }
  //Tela de listar contatos
   else if (props.layout === 1) {
    return props.loading ? (
      <div className={"w-full h-full flex items-center justify-center"}>
        {" "}
        <h1 className={"text-[50px]"}>Carregando Contatos...</h1>
      </div>
    ) : (
      <div className={"bg-gray-50 shadow-lg h-full p-10 flex flex-col gap-2"}>
        <div>
          <button
            onClick={() => {
              props.setLayout(0);
              setEditar(false);
              setId(-1);
              setPage(1);
              setPageSize(10);
              setSort("none");
              setOrder("none");
              setProcurar(false);
            }}
          >
            <ArrowLeft className="hover:size-[27px]"></ArrowLeft>
          </button>
        </div>
        <div className={"grid grid-cols-2 w-full"}>
          <div className={"col-span-1"}>
            <h1 className={"text-black text-[30px]"}>Contatos</h1>
          </div>
          <div
            className={"col-span-1 flex justify-end items-center w-full gap-3"}
          >
            <div className={" flex col-span-1 ml-3 items-center"}>
              {procurar ? (
                <div className={"flex items-center gap-1"}>
                  <input
                    placeholder={"Nome/email de busca"}
                    className={"rounded-full border text-center"}
                    onChange={(e) => {
                      q = e.target.value;
                      setQError(validateQ(q));
                    }}
                  />
                  {qError && (
                    <span className="text-red-600 text-xs ml-2">{qError}</span>
                  )}
                  <button
                    title="Confirmar Atualização"
                    className=" mt-1
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                "
                    onClick={async () => {
                      if (qError) return;
                      setProcurar(false);
                      await props.getContacts(q, 1, 10, sort, order);
                      setEditar(false);
                      setId(-1);
                      setPage(1);
                      setPageSize(10);
                      setSort("none");
                      setOrder("none");
                      q = "";
                    }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setProcurar(true);
                  }}
                >
                  <Search className={"hover:size-7"}></Search>
                </button>
              )}
            </div>
            <button
              className={"items-center"}
              onClick={() => {
                props.getContacts("", 1, 10, sort, order);
                setEditar(false);
                setId(-1);
                setPage(1);
                setPageSize(10);
                setSort("none");
                setOrder("none");
                setProcurar(false);
              }}
            >
              <RefreshCw className={"hover:size-7"}></RefreshCw>
            </button>
            <p className={""}>
              <button
                className="
                    inline-flex items-center justify-center gap-1.5
                    px-4 py-2 text-sm font-medium
                    rounded-lg
                    bg-gray-900 text-white
                    shadow-md shadow-gray-900/40
                    transition-all duration-150 ease-in-out
                    hover:bg-black
                    hover:shadow-lg hover:shadow-gray-900/50
                    focus:outline-none focus:ring-2 focus:ring-gray-400
"
                onClick={() => props.setLayout(2)}
              >
                <Plus size={16} />
                Create
              </button>
            </p>
          </div>
        </div>
        <div
          className={
            " rounded-md flex flex-col border border-gray-200 shadow-lg"
          }
        >
          <div
            className={
              "flex-grow flex-wrap rounded-r-md sm:gap-10 md:gap-30 lg:gap-40 xl:gap-43 2xl:gap-75 rounded-l-md rounded-t-md rounded-b-none flex items-end "
            }
          >
            <h1 className="ml-[50px]">Name</h1>
            <h1>Email</h1>
            <h1>Phone</h1>
            <h1>CreatedAt</h1>
          </div>

          <div className={"bg-white shadow-lg rounded-b-none flex h-fit"}>
            <ul>
              {props.contacts.map((contact: Contact) => {
                return (
                  <li className="py-2 text-gray-900 grid grid-cols-5 border-b border-gray-200 xl:gap-30 2xl:gap-45 ">
                    <div>
                      <p className="font-bold text-center">{contact.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-center">
                        {contact.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-center">
                        {contact.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-center w-[200px]">
                        {contact.createdAt.slice(0, 19)}
                      </p>
                    </div>
                    <div className={"flex gap-3 items-center"}>
                      <button
                        title="Editar Registro"
                        className="
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                "
                        onClick={() => {
                          setEditar(true);
                          setId(contact.id);
                          setEditNome(contact.nome);
                          setEditEmail(contact.email);
                          setEditPhone(contact.phone);
                          setServerError("");
                          props.setLayout(3);
                        }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className={"border rounded-md hover:bg-red-500"}
                        onClick={async () => {
                          await props.delete(contact.id as number);
                          props.getContacts("", page, pageSize, sort, order);
                        }}
                      >
                        <Trash2></Trash2>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={
              "rounded-r-md rounded-l-md rounded-b-md rounded-tl-none rounded-tr-none grid grid-cols-2 gap-2"
            }
          >
            <div className={"flex flex-row gap-1"}>
              <p className={"mt-2"}>Order By:</p>{" "}
              <select
                id="ordenacao"
                name="ordenacao"
                className="
                        text-sm text-gray-900
                        border border-gray-300 rounded-md
                        shadow-sm
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    "
                value={sort}
                onChange={(e) => {
                  const sortaux = e.target.value;
                  setSort(sortaux);
                  if (order === "none") {
                    setOrder("asc");
                  }
                  props.getContacts(
                    "",
                    page,
                    pageSize,
                    sortaux,
                    order === "none" ? "asc" : order,
                  );
                }}
              >
                <option value="name">Name</option>
                <option value="createdAt">CreatedAt</option>
                <option value="none">None</option>
              </select>
              {sort !== "none" ? (
                <select
                  id="ordenacao"
                  name="ordenacao"
                  className="
            text-sm text-gray-900
            border border-gray-300 rounded-md
            shadow-sm
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        "
                  value={order}
                  onChange={(e) => {
                    const orderaux = e.target.value;
                    setOrder(orderaux);
                    props.getContacts("", page, pageSize, sort, orderaux);
                  }}
                >
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              ) : (
                <div></div>
              )}
            </div>
            <div className={" flex justify-end w-full gap-2"}>
              <p className={"mt-2"}>Rows per page: </p>
              <div>
                <input
                  type="number"
                  id="quantidade"
                  min="1"
                  max="10"
                  value={pageSize}
                  className="
            mt-1 block w-full
            rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500
            sm:text-sm p-2"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPageSize(val as unknown as number);
                    setPageSizeError(validatePageSize(val));
                  }}
                />
                {pageSizeError && (
                  <span className="text-red-600 text-xs">{pageSizeError}</span>
                )}
              </div>
              <div className={"mr-3"}>
                <button
                  title="Confirmar Atualização"
                  className=" mt-1
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                "
                  onClick={async () => {
                    if (pageSizeError) return;
                    const pageSizeAux = pageSize;
                    setPageSize(pageSizeAux);
                    props.getContacts("", 1, pageSizeAux, sort, order);
                    setPage(1);
                  }}
                >
                  <Check size={18} />
                </button>
              </div>
              <div className={"flex gap-2 mr-3"}>
                <ChevronLeft
                  className={"mt-2 border rounded-full hover:size-7"}
                  onClick={() => {
                    if (page - 1 !== 0) {
                      setPage(page - 1);
                      const newPage = page - 1;
                      props.getContacts("", newPage, pageSize, sort, order);
                    }
                  }}
                ></ChevronLeft>
                <p className={"mt-2"}>{page}</p>
                <ChevronRight
                  className={"mt-2 border rounded-full hover:size-7"}
                  onClick={async () => {
                    const newPage = page + 1;
                    props.getContacts("", newPage, pageSize, sort, order);
                    setPage(page + 1);
                  }}
                ></ChevronRight>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //Tela de criar contato
  if (props.layout === 2) {
    return (
      <div
        className={"bg-white shadow-lg h-full w-full p-10 flex flex-col gap-2"}
      >
        <div className={"flex flex-col w-full h-full"}>
          <div>
            <h1 className={"font-extralight"}>Contatos / New</h1>
          </div>
          <div className={"col-span-1"}>
            <h1 className={"text-black text-[30px]"}>Criar Contato</h1>
          </div>
          <div
            className={
              " w-full h-fit bg-gray-100 border-gray-200 shadow-lg rounded-md"
            }
          >
            <div className={"grid grid-rows-3 mt-13 gap-3"}>
              <div className={"justify-center flex flex-col items-center"}>
                <h1 className={"text-center h-[22px]"}>Nome</h1>
                <input
                  className={
                    "bg-gray-300 rounded-md border text-center w-[250px]"
                  }
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    setNomeError(validateNome(e.target.value));
                  }}
                />
                {nomeError && (
                  <span className="text-red-600 text-xs mt-1">{nomeError}</span>
                )}
              </div>

              <div className={"justify-center flex flex-col items-center"}>
                <h1 className={"text-center h-[22px]"}>Email</h1>
                <input
                  className={
                    "bg-gray-300 rounded-md border text-center w-[250px]"
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(validateEmail(e.target.value));
                  }}
                />
                {emailError && (
                  <span className="text-red-600 text-xs mt-1">{emailError}</span>
                )}
              </div>

              <div className={"justify-center flex flex-col items-center"}>
                <h1 className={"text-center h-[22px]"}>Phone</h1>
                <input
                  className={
                    "bg-gray-300 rounded-md border text-center w-[250px]"
                  }
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError(validatePhone(e.target.value));
                  }}
                />
                {phoneError && (
                  <span className="text-red-600 text-xs mt-1">{phoneError}</span>
                )}
              </div>
            </div>
            <div className={"grid grid-cols-2 justify-center items-center "}>
              <div className={"flex justify-end mr-25"}>
                <button
                  className={"rounded-md border hover:bg-red-400"}
                  onClick={() => {
                    props.setLayout(1);
                    setNomeError("");
                    setEmailError("");
                    setPhoneError("");
                    setNome("");
                    setEmail("");
                    setPhone("");
                    setServerError("");
                  }}
                >
                  <X></X>
                </button>
              </div>
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
                  onClick={async () => {
                    const nError = validateNome(nome);
                    const eError= validateEmail(email);
                    const pError = validatePhone(phone);
                    setNomeError(nError);
                    setEmailError(eError);
                    setPhoneError(pError);
                    if (nError || eError || pError) return;
                    try {
                      await props.postContact({ nome, email, phone });
                    } catch (e: any) {
                      if (e?.message === "Email duplicado!" || e?.message === "Phone duplicado!") {
                        setServerError(e.message);
                        return;
                      }
                      setServerError("Erro ao criar contato.");
                      return;
                    }
                    props.getContacts("", page, pageSize, sort, order);
                    props.setLayout(1);
                    setNome("");
                    setEmail("");
                    setPhone("");
                    setNomeError("");
                    setEmailError("");
                    setPhoneError("");
                    setServerError("");
                  }}
                >
                  <Plus size={16} className="text-gray-500" />
                  Create
                </button>
              </div>
            </div>
          </div>
          {serverError && (
            <div className="text-center text-red-700 text-sm mt-2">{serverError}</div>
          )}
        </div>
      </div>
    );
  }
  //Tela de editar contato
  if (props.layout === 3) {
    return props.loading ? (
      <div className={"w-full h-full flex items-center justify-center"}>
        {" "}
        <h1 className={"text-[50px]"}>Carregando Contatos...</h1>
      </div>
    ) : (
      <div className={"bg-white shadow-lg h-full p-10 flex flex-col gap-2"}>
        <div className={"grid grid-cols-2 w-full"}>
          <div className={"col-span-1"}>
            <h1 className={"text-black text-[30px]"}>Contatos</h1>
          </div>
          <div className={"col-span-1 flex justify-end items-center w-full"}>
            {" "}
            <p className={""}>
              <button
                className="
                inline-flex items-center justify-center gap-1.5
                px-4 py-2 text-sm font-medium
                rounded-lg
                bg-gray-900 text-white
                shadow-md shadow-gray-900/40
                transition-all duration-150 ease-in-out
                hover:bg-black
                hover:shadow-lg hover:shadow-gray-900/50
                focus:outline-none focus:ring-2 focus:ring-gray-400
"
                onClick={() => props.setLayout(2)}
              >
                <Plus size={16} />
                Create
              </button>
            </p>
          </div>
        </div>
        {serverError && (
          <div className="text-center text-red-700 text-sm mb-2">{serverError}</div>
        )}
        <div className={"border-gray-200 shadow-lg grid grid-rows-15 border"}>
          <div
            className={
              "flex-grow flex-wrap row-span-3 bg-gray-100 shadow-lg rounded-r-md gap-10 sm:gap-15 md:gap-40 lg:gap-55 xl:gap-60 2xl:gap-90  rounded-l-md rounded-t-md rounded-b-none flex items-end "
            }
          >
            <h1 className="ml-[17px]">Name</h1>
            <h1>Email</h1>
            <h1>Phone</h1>
          </div>
          <div className={"row-span-10 bg-white shadow-lg rounded-b-none"}>
            <ul>
              {props.contacts.map((contact: Contact) => {
                if (editar && contact.id === id) {
                  return (
                    <li className="py-2 text-gray-900 grid grid-cols-4">
                      <input
                        className="font-bold "
                        value={editNome}
                        onChange={(e) => setEditNome(e.target.value)}
                      ></input>
                      <input
                        className="text-sm text-gray-600"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      ></input>
                      <input
                        className="text-sm text-gray-600"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      ></input>
                      <div className={"flex items-center gap-3"}>
                        <button
                          title="Confirmar Atualização"
                          className="
                                        ml-5
                                    p-1.5 rounded-full border border-gray-300
                                    text-indigo-600
                                    transition duration-150 ease-in-out

                                    hover:bg-indigo-50 hover:border-indigo-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                "
                        onClick={async () => {
                          setServerError("");
                          try {
                            await props.putContact({ ...contact, nome: editNome, email: editEmail, phone: editPhone }, contact.id);
                          } catch (e: any) {
                            if (e?.message === "Email duplicado!" || e?.message === "Phone duplicado!") {
                              setServerError(e.message);
                              return;
                            }
                            setServerError("Erro ao atualizar contato.");
                            return;
                          }
                          props.getContacts("", page, pageSize, sort, order);
                          setId(-1);
                          setEditar(false);
                          props.setLayout(1);
                        }}
                        >
                          <Check size={18} />
                        </button>
                        <X
                          onClick={() => {
                            setId(-1);
                            setEditar(false);
                            setServerError("");
                            props.setLayout(1);
                          }}
                        ></X>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div
            className={
              "row-span-2 bg-gray-100 rounded-r-md shadow-lg rounded-l-md rounded-b-md rounded-tl-none rounded-tr-none flex justify-end gap-2"
            }
          ></div>
        </div>
      </div>
    );
  }
}

export default TelaDeCrud;
