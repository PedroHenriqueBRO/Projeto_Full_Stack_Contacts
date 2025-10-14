import { useCallback, useState } from "react";
import type { Contact, PostContact } from "./ContactsInterfaces.tsx";
export default function useHookAPI() {
  const [contatos, setContatos] = useState<Contact[]>([]);
  const [layout, setLayout] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchContacts = useCallback(
    async (
      name: string,
      page: number,
      pagesize: number,
      sort: string,
      order: string
    ) => {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/contacts?q=${name}&page=${page}&pageSize=${pagesize}&sort=${sort}&order=${order}`;
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Falha ao buscar contatos na API.");
        }
        const data = await response.json();
        setContatos(data.data as Contact[]);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setContatos]
  );
  const postContacts = useCallback(
    async (contato: PostContact) => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/contacts`;
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
          let message = "Falha ao tentar criar contato na API.";
          try {
            const body = await response.json();
            if (typeof body?.error === "string") {
              message = body.error;
            }
          } catch {}
          throw new Error(message);
        }
      } catch (error) {
        console.error("Erro na criação:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );
  const putContacts = useCallback(
    async (contato: Contact, id: number) => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/contacts/${id}`;
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
          let message = "Falha ao tentar atualizar contato na API.";
          try {
            const body = await response.json();
            if (typeof body?.error === "string") {
              message = body.error;
            }
          } catch {}
          throw new Error(message);
        }
      } catch (error) {
        console.error("Erro na atualização:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );
  const deleteContacts = useCallback(
    async (id: number) => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/contacts/${id}`;
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Falha ao tentar deletar contato na API.");
        }
      } catch (error) {
        console.error("Erro na deleção:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );
  return {
    fetchContacts,
    postContacts,
    putContacts,
    deleteContacts,
    contatos,
    layout,
    setLayout,
    loading,
  };
}
