import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface productoType {
  _id: string;
  id: string;
  name: string;
  costo: string;
  precio: string;
  imagen: string;
}

const App = () => {
  const [productos, setProductos] = useState<productoType[]>([]);
  const [buscador, setBuscador] = useState<string>("");

  useEffect(() => {
    (async () => {
      await axios
        .get("https://buscador-copyart-api.vercel.app/api/v1/productos")
        .then((res) => setProductos(res.data.documentos));
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .get("https://buscador-copyart-api.vercel.app/api/v1/productos", {
        params: { search: buscador },
      })
      .then((res) => setProductos(res.data.documentos));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Buscar producto
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar"
              required
              onChange={(e) => setBuscador(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
      <div className="relative overflow-y-auto shadow-md sm:rounded-lg my-[5%]">
        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Imagen
              </th>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Costo
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 w-[250px] h-[250px]">
                    <img className="w-full h-full" src={producto.imagen} alt={producto.name} />
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    {producto.id}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{producto.name}</td>
                  <td className="px-6 py-4 text-gray-900">{producto.costo}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{producto.precio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
