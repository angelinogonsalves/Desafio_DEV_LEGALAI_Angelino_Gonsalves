import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ nome: "", area: "", local: "" });
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setCarregando(true);
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      setResultados(data.matches || []);
    } catch (err) {
      alert("Erro ao buscar conexões.");
      console.error(err);
    }
    setCarregando(false);
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
          disabled={carregando}
        >
          {carregando ? "Buscando..." : "Buscar Conexões"}
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
                <p className="text-sm text-gray-700">{pessoa.area} — {pessoa.local}</p>
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
