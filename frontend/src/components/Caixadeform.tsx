import { useCallback, useState } from "react";
interface Contact {
  id: number;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contatos, setContatos] = useState<Contact[]>();
  const [searchName, setSearchName] = useState<string>("");
  const [layout, setLayout] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchContacts = useCallback(async (name: string) => {
    const url = `http://localhost:8082/contacts?q=${name}&page=${1}&pageSize=${10}`;
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
  }, []);
  if (layout == 0) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        {lista.map((value, index) => {
          if (index == 0) {
            return (
              <button
                onClick={() => setLayout(index + 1)}
                className="rounded-full bg-black w-[200px] h-[60px] mt-23"
              >
                <h1 className="text-white">{value}</h1>
              </button>
            );
          }
          return (
            <button
              onClick={() => setLayout(index + 1)}
              className="rounded-full bg-black w-[200px] h-[60px]"
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
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80 text-center"
        >
          <h1 className="text-white">Voltar</h1>
        </button>

        <div className="h-[400px] w-full flex flexcol justify-center">
          <h1 className="absolute font-bold text-[25px] mt-15">
            Digite o Nome de Busca
          </h1>
          <input
            type="text"
            className=" absolute w-[300px] h-[50px] mt-30 bg-white border-2 text-center"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              fetchContacts(searchName);
              setLayout(5);
            }}
            disabled={loading || searchName.length === 0}
            className="w-[300px] h-[60px] bg-white mt-60 rounded-full"
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
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80"
        >
          <h1 className="text-white">Voltar</h1>
        </button>
      </div>
    );
  }
  if (layout == 3) {
    return (
      <div className="bg-sky-500 h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80"
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
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80"
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
            setSearchName("");
            setLayout(0);
          }}
          className="absolute bg-black w-[100px] h-[50px] rounded-r-lg text-white mr-80 mt-5"
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
                <li key={contato.id} className="py-2 text-gray-900">
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
