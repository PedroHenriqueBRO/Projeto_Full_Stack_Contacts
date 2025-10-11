import { useCallback, useState } from "react";
import Header from "./Header.tsx";
import BarraDeNavegacao from "./BarraDeNavegacao.tsx";
import TelaDeCrud from "./TelaDeCrud.tsx";
interface Contact {
  nome: string;
  email: string;
  phone: string;
}
function GerenciaOperacoes() {
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
        setId(0);
      }
    },
    [id]
  );
  const deleteContacts = useCallback(async () => {
    const url = `http://localhost:8082/contacts/${id}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao tentar atualizar contato na API.");
      }
      setLayout(0);
    } catch (error) {
      console.error("Erro na criação:", error);
    } finally {
      setLoading(false);
      setId(0);
    }
  }, [id]);
    return(<div className="h-screen flex flex-col">
        <Header></Header>
        <div className="grid grid-cols-8 flex-grow">
            <BarraDeNavegacao setLayout={setLayout} layout={layout}></BarraDeNavegacao>
            <div className=" col-span-5 md:col-span-7 bg-white flex flex-grow">
                <TelaDeCrud setLayout={setLayout} layout={layout}></TelaDeCrud>
            </div>
        </div>
    </div>)

}
export default GerenciaOperacoes;
