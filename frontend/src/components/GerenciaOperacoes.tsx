import Header from "./Header.tsx";
import BarraDeNavegacao from "./BarraDeNavegacao.tsx";
import TelaDeCrud from "./TelaDeCrud.tsx";
import useHookApi from "./useHookAPI.ts";
function GerenciaOperacoes() {
  const {
    fetchContacts,
    postContacts,
    putContacts,
    deleteContacts,
    contatos,
    layout,
    setLayout,
    loading,
  } = useHookApi();

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header></Header>
      <div className="grid grid-cols-8 flex-grow w-full overflow-x-hidden overflow-y-hidden ">
        <BarraDeNavegacao
          setLayout={setLayout}
          layout={layout}
          getContacts={fetchContacts}
        ></BarraDeNavegacao>
        <div className=" col-span-5 md:col-span-7 bg-white flex-grow w-full border border-t-black">
          <TelaDeCrud
            putContact={putContacts}
            setLayout={setLayout}
            layout={layout}
            contacts={contatos}
            loading={loading}
            delete={deleteContacts}
            getContacts={fetchContacts}
            postContact={postContacts}
          ></TelaDeCrud>
        </div>
      </div>
    </div>
  );
}
export default GerenciaOperacoes;
