// Importa o driver oficial do MongoDB
import { MongoClient } from 'mongodb';

// Lê a URI do banco de dados do .env.local
const uri = process.env.MONGODB_URI;

// Cria uma instância do cliente Mongo
const client = new MongoClient(uri);

// Define grupos de áreas relacionadas para afinidade parcial
const gruposRelacionados = {
  tecnologia: ["programação", "dados", "segurança da informação", "machine learning", "criptografia", "robótica"],
  artes: ["música", "teatro", "pintura", "fotografia", "cinema", "dança", "desenho digital"],
  esportes: ["corrida", "futebol", "basquete"],
  criativo: ["games", "jogos", "ux design", "design gráfico"],
  humanas: ["psicologia", "arquitetura", "ecologia", "marketing digital"]
};

// Verifica se duas áreas pertencem ao mesmo grupo
function saoRelacionadas(area1, area2) {
  area1 = area1.toLowerCase();
  area2 = area2.toLowerCase();

  return Object.values(gruposRelacionados).some((grupo) =>
    grupo.includes(area1) && grupo.includes(area2)
  );
}

// Função que calcula a afinidade com base nas regras definidas
function calcularAfinidade(usuario, outro) {
  let score = 0;

  if (usuario.local.toLowerCase() === outro.local.toLowerCase()) {
    score += 50; // mesma cidade
  }

  if (usuario.area.toLowerCase() === outro.area.toLowerCase()) {
    score += 30; // mesma área
  } else if (saoRelacionadas(usuario.area, outro.area)) {
    score += 15; // áreas próximas
  }

  return score;
}

// Função principal da rota API: chamada em POST para /api/match
export default async function handler(req, res) {
  // Permite apenas requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Extrai os dados enviados pelo frontend
  const { nome, area, local } = req.body;

  // Valida os campos obrigatórios
  if (!nome || !area || !local) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  try {
    // Garante que a conexão com o MongoDB esteja ativa
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }    

    // Acessa o banco e a coleção de usuários
    const db = client.db("legalai");
    const usuarios = db.collection("usuarios");

    // Verifica se o usuário já existe no banco (mesmo nome, área e cidade)
    const jaExiste = await usuarios.findOne({ nome, area, local });

    // Se não existir, insere como novo perfil
    if (!jaExiste) {
      await usuarios.insertOne({ nome, area, local });
    }

    // Busca todos os demais usuários (excluindo o próprio)
    const todos = await usuarios.find({ nome: { $ne: nome } }).toArray();

    // Calcula afinidade com cada usuário da base
    const comPontuacao = todos.map((user) => ({
      ...user,
      afinidade: calcularAfinidade({ nome, area, local }, user),
    }));

    // Ordena por afinidade (maior primeiro) e pega os 3 melhores
    const top3 = comPontuacao
      .sort((a, b) => b.afinidade - a.afinidade)
      .slice(0, 3);

    // Retorna os top 3 matches pro frontend
    return res.status(200).json({ matches: top3 });
  } catch (err) {
    console.error('Erro na API /match:', err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}
