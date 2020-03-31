const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){


    // Criar a tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );
`)
    /*Inserir dados na tabela 
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
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Cursos de Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat, cum veniam necessitatibus quas magni. Labore quidem quia a nulla aliquid ullam laborum aut dolorum! Facere aspernatur corporis nostrum quae?",
        "https://rocketseat.com.br"
    ]

   db.run(query, values, function(err){
        if (err) return console.log(err)
        
        console.log(this)
    }) */

     // Deletar dados na tabela

   /*  for(let c = 2; c <= 8; c++) {
      db.run(`DELETE FROM ideas WHERE id = ?`, [c], function(err){
         if (err) return console.log(err)

         console.log("DELETEI", this)
     }) 
    } 

    // Consultar dados na tabela 

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    }) */
    
   
})

module.exports = db // Exportando o banco de dados