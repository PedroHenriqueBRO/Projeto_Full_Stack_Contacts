import { useState } from "react";

function Caixadeform() {
  const lista: string[] = [
    "Buscar Contatos",
    "Criar Contato",
    "Atualizar Contato",
    "Deletar Contato",
  ];
  const [layout, setLayout] = useState<number>(0);
  if (layout == 0) {
    return (
      <div className="bg-white h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
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
      <div className="bg-white h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80 text-center"
        >
          <h1 className="text-white">Voltar</h1>
        </button>

        <form className="h-[400px] w-full flex flexcol justify-center">
          <h1 className="absolute font-bold text-[25px] mt-15">
            Digite o Nome de Busca
          </h1>
          <input
            type="text"
            className=" absolute w-[300px] h-[50px] mt-30 bg-slate-400 border-2 text-center"
          ></input>
          <button className="w-[300px] h-[60px] bg-slate-400 mt-60 rounded-full">
            Buscar
          </button>
        </form>
      </div>
    );
  }
  if (layout == 2) {
    return (
      <div className="bg-white h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
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
      <div className="bg-white h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
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
      <div className="bg-white h-[500px] w-[400px] rounded-md mr-300 mt-50 flex-col flex items-center gap-6">
        <button
          onClick={() => setLayout(0)}
          className="rounded-r-lg bg-black w-[100px] h-[60px] mt-4 mr-80"
        >
          <h1 className="text-white">Voltar</h1>
        </button>
      </div>
    );
  }
}
export default Caixadeform;
