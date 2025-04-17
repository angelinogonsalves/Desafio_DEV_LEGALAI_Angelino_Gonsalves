import { useState } from "react";

const mockResults = [
  {
    nome: "Carlos Silva",
    descricao: "Advogado entusiasta de IA e inovação jurídica.",
    afinidade: 82,
  },
  {
    nome: "Fernanda Rocha",
    descricao: "Desenvolvedora focada em justiça digital.",
    afinidade: 76,
  },
  {
    nome: "João Pedro",
    descricao: "Estudante de direito com paixão por tecnologia.",
    afinidade: 89,
  },
];

export default function App() {
  const [form, setForm] = useState({ nome: "", area: "", local: "" });
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setResultados(mockResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Match Inteligente 💡
        </h1>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="area"
            placeholder="Área de Interesse"
            value={form.area}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="local"
            placeholder="Localização"
            value={form.local}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Buscar Conexões
        </button>

        {resultados.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Resultados encontrados:
            </h2>
            {resultados.map((pessoa, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-blue-700">
                  {pessoa.nome}
                </h3>
                <p className="text-sm text-gray-700">{pessoa.descricao}</p>
                <p className="mt-2 font-medium text-green-600">
                  Afinidade: {pessoa.afinidade}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
