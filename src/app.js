const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  var likes = 0;

  const projeto = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  };
  repositories.push(projeto);
  return response.json(projeto);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const projectIndex = repositories.findIndex(projeto=> projeto.id === id);

  if(projectIndex < 0){
    return response.status(400).json({ erro: 'Repositório não encontrado.' })
  }
  const projeto = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[projectIndex] = projeto;
  return response.json(projeto);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(projeto=>projeto.id === id);

  if(projectIndex < 0){
    return response.status(400).json({ erro: 'Não foi possivel deletar o repositorio' })
  }
  repositories.splice(projectIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(projeto=>projeto.id === id);
  var projeto = repositories[projectIndex];
  
  if(projectIndex < 0){
    return response.status(400).json({ erro: 'Não foi possivel curtir o repositorio' })
  }
  var likes = projeto.likes+=1;
  projeto['likes'] = likes;  

  repositories
  return response.json(projeto);
});

module.exports = app;
