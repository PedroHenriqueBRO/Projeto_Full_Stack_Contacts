import { useCallback, useState } from "react";
interface Contact {
  nome: string;
  email: string;
  phone: string;
}
function Caixadeform() {
  const lista: string[] = [
    "Buscar Contatos",
    "Criar Contato",
    "Atualizar Contato",
    "Deletar Contato",
  ];
  // eslint-disable-next-line prefer-const
  let contato: Contact = { nome: "", email: "", phone: "" };
  const [contatos, setContatos] = useState<Contact[]>();
  const [page, setPage] = useState<number>(1);
  const [pagemax, setPagesize] = useState<number>(10);
  const [searchName, setSearchName] = useState<string>("");
  const [layout, setLayout] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const fetchContacts = useCallback(
    async (
      name: string,
      page: number | undefined,
      pagesize: number | undefined
    ) => {
      const url = `http://localhost:8082/contacts?q=${name}&page=${page}&pageSize=${pagesize}`;
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Falha ao buscar contatos na API.");
        }
        const data = await response.json();
        setContatos(data.data as Contact[]);
      } catch (error) {
        setContatos([]);
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const postContacts = useCallback(async (contato: Contact | undefined) => {
    const url = `http://localhost:8082/contacts`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contato),
      });
      if (!response.ok) {
        throw new Error("Falha ao tentar criar contato na API.");
      }
      contato = { nome: "", email: "", phone: "" };
      setLayout(0);
    } catch (error) {
      console.error("Erro na criação:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  const putContacts = useCallback(
    async (contato: Contact | undefined) => {
      const url = `http://localhost:8082/contacts/${id}`;
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contato),
        });
        if (!response.ok) {
          throw new Error("Falha ao tentar atualizar contato na API.");
        }
        contato = { nome: "", email: "", phone: "" };
        setLayout(0);
      } catch (error) {
        console.error("Erro na criação:", error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  if (layout == 0) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        {lista.map((value, index) => {
          if (index == 0) {
            return (
              <button
                onClick={() => setLayout(index + 1)}
                className="rounded-full bg-black w-[200px] h-[60px] mt-23 cursor-pointer transition duration-150"
              >
                <h1 className="text-white">{value}</h1>
              </button>
            );
          }
          return (
            <button
              onClick={() => setLayout(index + 1)}
              className="rounded-full bg-black w-[200px] h-[60px] cursor-pointer transition duration-150"
            >
              <h1 className="text-white">{value}</h1>
            </button>
          );
        })}
      </div>
    );
  }
  if (layout == 1) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80 text-center cursor-pointer transition duration-150"
        >
          <h1 className="text-white">Voltar</h1>
        </button>

        <div className="h-[400px] w-full flex flexcol justify-center">
          <h1 className="absolute font-bold text-[20px]">Nome de Busca</h1>
          <input
            type="text"
            placeholder="Nome de busca"
            className=" absolute w-[300px] h-[50px] mt-10 bg-white border-2 text-center"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          ></input>
          <h1 className="absolute font-bold text-[20px] mt-25">Pagina</h1>
          <input
            type="text"
            placeholder="Pagina atual"
            className=" absolute w-[300px] h-[50px] mt-35 bg-white border-2 text-center"
            onChange={(e) => {
              setPage(e.target.value as unknown as number);
            }}
          ></input>
          <h1 className="absolute font-bold text-[20px] mt-50">
            Tamanho máximo de paginas
          </h1>
          <input
            type="text"
            placeholder="Páginas máximas"
            className=" absolute w-[300px] h-[50px] mt-60 bg-white border-2 text-center"
            onChange={(e) => {
              setPagesize(e.target.value as unknown as number);
            }}
          ></input>
          <button
            onClick={() => {
              fetchContacts(searchName, page, pagemax);
              setLayout(5);
            }}
            disabled={loading || searchName.length === 0}
            className="w-[300px] h-[60px] bg-white mt-80 rounded-full cursor-pointer transition duration-150"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
  if (layout == 2) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80 cursor-pointer transition duration-150"
        >
          <h1 className="text-white">Voltar</h1>
        </button>
        <div className="h-[400px] w-full flex flexcol justify-center">
          <h1 className="absolute font-bold text-[20px]">Nome</h1>
          <input
            type="text"
            placeholder="Nome Completo"
            className=" absolute w-[300px] h-[50px] mt-10 bg-white border-2 text-center"
            onChange={(e) => {
              contato.nome = e.target.value;
            }}
          ></input>
          <h1 className="absolute font-bold text-[20px] mt-23">Email</h1>
          <input
            type="text"
            placeholder="exemplo@exemplo.com"
            className=" absolute w-[300px] h-[50px] mt-33 bg-white border-2 text-center"
            onChange={(e) => {
              contato.email = e.target.value;
            }}
          ></input>
          <h1 className="absolute font-bold text-[20px] mt-47">Telefone</h1>
          <input
            type="text"
            placeholder="+99 99 99999-9999"
            className=" absolute w-[300px] h-[50px] mt-57 bg-white border-2 text-center"
            onChange={(e) => {
              contato.phone = e.target.value;
            }}
          ></input>
          <button
            onClick={() => {
              postContacts(contato);
            }}
            className="w-[300px] h-[60px] bg-white mt-80 rounded-full cursor-pointer transition duration-150"
          >
            Criar
          </button>
        </div>
      </div>
    );
  }
  if (layout == 3) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="absolute rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80 cursor-pointer transition duration-150"
        >
          <h1 className="text-white">Voltar</h1>
        </button>
      </div>
    );
  }
  if (layout == 4) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80 cursor-pointer transition duration-150"
        >
          <h1 className="text-white">Voltar</h1>
        </button>
      </div>
    );
  }
  if (layout == 5) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => {
            setId(0);
            setPage(1);
            setPagesize(10);
            setSearchName("");
            setLayout(0);
          }}
          className="absolute bg-black w-[100px] h-[50px] rounded-r-lg text-white mr-80 mt-5 cursor-pointer transition duration-150"
        >
          Voltar
        </button>
        {loading ? (
          <h2 className="text-white text-lg mt-20">Carregando contatos...</h2>
        ) : contatos && contatos.length > 0 ? (
          <div className="w-full h-full overflow-y-auto bg-white p-4 rounded-lg shadow-inner mt-20">
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              Resultados para: "{searchName}"
            </h2>
            <ul className="divide-y divide-gray-200">
              {contatos.map((contato) => (
                <li className="py-2 text-gray-900">
                  <p className="font-bold">{contato.nome}</p>
                  <p className="text-sm text-gray-600">
                    Email: {contato.email}
                  </p>
                  <p className="text-sm text-gray-600">Tel: {contato.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h2 className="text-white text-lg mt-20">
            Nenhum contato encontrado para "{searchName}".
          </h2>
        )}
      </div>
    );
  }
}
export default Caixadeform;
