# 🎬 Hall of Shame API

Uma API RESTful desenvolvida em Node.js com Express e SQLite, que fornece informações sobre os vencedores da categoria **Pior Filme** do Golden Raspberry Awards (também conhecido como Razzies).

A API calcula, a partir dos dados de entrada, os **produtores que venceram mais de uma vez** e retorna o **intervalo mínimo e máximo** entre essas vitórias.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [csv-parser](https://www.npmjs.com/package/csv-parser)
- [Jest](https://jestjs.io/) (testes)
- [Supertest](https://github.com/visionmedia/supertest) (testes de integração)

---

## 📦 Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/FCappellari/hall-of-shame-api.git
cd hall-of-shame-api
```

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🧪 Executando os testes de integração

A API contém testes que garantem a precisão da lógica de negócio independentemente do conjunto de dados de entrada.

Para executar os testes:

```bash
npm test
```

---

## 📂 Estrutura da API

### `GET /producers/winners-intervals`

Retorna os produtores com o **menor** e **maior** intervalo de tempo entre duas vitórias como produtores de filmes vencedores do prêmio de Pior Filme.

#### Exemplo de resposta:

```json
{
  "min": [
    {
      "producer": "Bo Derek",
      "interval": 5,
      "previousWin": 1990,
      "followingWin": 1995
    }
  ],
  "max": [
    {
      "producer": "Joel Silver",
      "interval": 13,
      "previousWin": 1985,
      "followingWin": 1998
    }
  ]
}
```
---

## 📬 Contato

Desenvolvido por [@FCappellari](https://github.com/FCappellari)
