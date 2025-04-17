# Desafio LEGAL.AI – Desenvolvedor(a) Full Stack

## 👋 Sobre o projeto

Este projeto foi desenvolvido como parte do processo seletivo da LEGAL.AI, com o objetivo de criar um MVP funcional de um sistema de matchmaking com lógica de afinidade entre usuários.

A proposta foi expandida com o uso de **banco de dados em nuvem (MongoDB Atlas)**, lógica real de pontuação entre perfis, inserção dinâmica e API backend.

---

## 🧪 Link do projeto em produção

🔗 [Acessar aplicação no Vercel](https://desafio-dev-legalai-angelino-gonsalves.vercel.app/)

---

## 🛠️ Tecnologias utilizadas

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel](https://vercel.com/) (deploy e serverless backend)

---

## 🚀 Como rodar localmente

```bash
# Clone o projeto
git clone https://github.com/angelinogonsalves/Desafio_DEV_LEGALAI_Angelino_Gonsalves.git

# Acesse a pasta
cd Desafio_DEV_LEGALAI_Angelino_Gonsalves

# Instale as dependências
npm install

# Instale o driver do MongoDB
npm install mongodb

5. Crie o arquivo de ambiente .env.local com a seguinte variável:
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/legalai

6. Rode a aplicação
npm run dev

```


**✨ Funcionalidades**

  - Formulário com nome, área de interesse e localização
  - Integração com banco de dados MongoDB Atlas
  - Inserção de novo perfil se não existir
  - Cálculo de afinidade com os demais usuários
  - Exibição dos 3 perfis mais compatíveis


**🧠 Lógica de afinidade**

  Critério               | Pontuação
  ---------------------- | ----------
  Mesma cidade           | +50
  Mesma área de interesse| +30
  Áreas relacionadas     | +15
  Nome                   | 0


**🧩 Exemplo de áreas relacionadas**

  - tecnologia: programação, dados, IA, robótica
  - artes: teatro, cinema, música, pintura
  - esportes: futebol, corrida, basquete
  - criativo: games, design gráfico, UX
  - humanas: psicologia, marketing, arquitetura


**🔧 O que faria diferente com mais tempo**

  - Criaria sistema de histórico e favoritos por usuário
  - Implementaria autenticação (login com e-mail, redes sociais ou wallet)
  - Criaria um painel administrativo para gestão dos perfis
  - Adicionaria ranking de usuários mais conectados
  - Integração com IA real para sugerir áreas próximas automaticamente


## 👨‍💻 Autor
  Angelino Gonsalves
  📧 [email](angelino.gonsalves@gmail.com)
  🔗 [LinkedIn](https://www.linkedin.com/in/angelino-gonsalves/)
  