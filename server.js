//Usei o express para criar e configurar o meu servidor
const express = require('express')
const server = express()
const db = require('./db')

/*const ideas = [
   {
      img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
      title: "Cursos de Programação",
      category: "Estudo",
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat, cum veniam necessitatibus quas magni. Labore quidem quia a nulla aliquid ullam laborum aut dolorum! Facere aspernatur corporis nostrum quae?",
      url: "https://rocketseat.com.br"
   },

   {
      img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
      title: "Cursos de Programação",
      category: "Estudo",
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat, cum veniam necessitatibus quas magni. Labore quidem quia a nulla aliquid ullam laborum aut dolorum! Facere aspernatur corporis nostrum quae?",
      url: "https://rocketseat.com.br"
   },

   {
      img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
      title: "Cursos de Programação",
      category: "Estudo",
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat, cum veniam necessitatibus quas magni. Labore quidem quia a nulla aliquid ullam laborum aut dolorum! Facere aspernatur corporis nostrum quae?",
      url: "https://rocketseat.com.br"
   },

   {
      img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
      title: "Cursos de Programação",
      category: "Estudo",
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat, cum veniam necessitatibus quas magni. Labore quidem quia a nulla aliquid ullam laborum aut dolorum! Facere aspernatur corporis nostrum quae?",
      url: "https://rocketseat.com.br"
   },
]
*/



//configurar arquivos estáticos (css, scripts, imgs)
server.use(express.static("public")) // Procure colocar barras antes do style.css, script.js, imagens e etc

// Habilitando o req.body
server.use(express.urlencoded({ extended: true }))



//configuração do nunjcks
const nunjucks = require('nunjucks')
nunjucks.configure("Views", {
   express: server, 
   noCache: true, // vai guardar algumas coisas que ele julga importante
})

// Crieiuma rota /
// e capturo o pedido do cliente para responder
server.get('/', function(req, res) { // Dois paramêtros, requisição e resposta
   // console.log('Chegueii')

      db.all(`SELECT * FROM ideas`, function(err, rows){
         if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados")
         }

         const reverseideas = [...rows].reverse()

         let lastIdeas = []
         for (let idea of reverseideas) {
            if(lastIdeas.length < 2) {
               lastIdeas.push(idea)
            }
         }
         return res.render('index.html', { ideas: lastIdeas }) // Dirname

       //  console.log(rows)
   })

 
})



server.get('/ideas', function(req, res) { // Dois paramêtros, requisição e resposta
    // console.log('Chegueii')

    db.all(`SELECT * FROM ideas`, function(err, rows){
      if (err) {
         console.log(err)
         return res.send("Erro no Banco de Dados")
      }

      const reverseideas = [...rows].reverse()

      return res.render('ideias.html', {ideas: reverseideas}) // Dirname

    })
 })

 server.post("/", function(req, res){
         const query = `
         INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
         ) VALUES (?,?,?,?,?);   
         `

         const values = [
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link,
         ]

         db.run(query, values, function(err){
            if (err) {
               console.log(err)
               return res.send("Erro no Banco de Dados")
            }
            
            return res.redirect("/ideas")
         }) 
      })

// Liguei meu servidor na porta 3000
server.listen(3000)


