const express = require('express')
// fake database

let livros = []
//APP
const app = express()

app.use(express.json())

//middleares

//adicionando um livro
app.post('/add-livro', (req, res) => {
    const { id, titulo, autor } = req.body
    const livro = { id, titulo, autor }
    livros.push(livro)
    return res.status(201).json(livro)
})


//puxando todos os livros
app.get('/todos-livros', (req, res) => {
    const todosLivros = livros
    return res.status(200).json(todosLivros)
})

//puxhando um livro pelo id
app.get('/livro/:id_livro', (req, res) => {
    const { id_livro } = req.params
    const livro = livros.find((livro) => livro.id === id_livro)
    if(!livro) res.status(404).json('sem funcionamento')
    return res.status(200).json(livro)
})

//deletando um livro
app.delete('/delete/:id_livro', (req, res) => {
    const { id_livro } = req.params
    const livrosFiltrados = livros.filter(livro => livro.id !== id_livro)
    livros = livrosFiltrados
    return res.status(204).json('deletado')
})

//atualizando livro
app.put('/update-info/:id_livro', (req, res) => {
    const { autor, titulo } = req.body
    const { id_livro } = req.params
    const livro = livros.find((livro) => livro.id === id_livro)
    livro.id = livro.id
    livro.autor = autor ? autor : livro.autor
    livro.titulo = titulo ? titulo : livro.titulo
    return res.status(200).json(livro)
})


//mandar servidor rodar

app.listen(9000, () => console.log("aplicação rodando"))