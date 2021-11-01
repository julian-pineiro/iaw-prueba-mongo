const { MongoClient } = require("mongodb");


let db_url = "mongodb://127.0.0.1:27017/"
const client = new MongoClient(db_url)

// Database Name
const dbName = 'peliculas'

async function main () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Conectado al server.')
  const db = client.db(dbName)
  const collection = db.collection('peliculas')

  await collection.remove();

//   -- Utilice insertMany para insertar al menos 5 peliculas diferentes. Las peliculas deben tener al menos un nombre, un actor y el año de estreno.
  console.log('Insertando pelis a coleccion...')
  await collection.insertMany([
      {
          "nombre" : "Fight Club",
          "actor" : "Brad Pitt",
          "year" : 1999,
      },
      {
        "nombre" : "Back to the Future",
        "actor" : "Michael J. Fox",
        "year" : 1985,
        
    },
    {
        "nombre" : "Monty Python and the Holy Grail",
        "actor" : "Monty Python",
        "year" : 1975,
    },
    {
        "nombre" : "Cruella",
        "actor" : "Emma Stone",
        "year" : 2021,
    },
    {
        "nombre" : "Raiders of the Lost Ark",
        "actor" : "Harrison Ford",
        "year" : 1981,
    },
  ])
//Utilice insertMany para insertar al menos 5 peliculas diferentes. Las peliculas deben tener al menos un nombre, un actor y el año de estreno.
  console.log("Creadas:")
  console.log(await collection.find({}).toArray())

  //Utilice updateMany para agregar un campo "boxoffice" en todas las películas, inicializado en 0.
  await collection.updateMany({}, { $set: { boxoffice: 0 } })
  console.log("Agregar Campo Box Office:")
  console.log(await collection.find({}).toArray())

  // Utilice replaceOne para reemplazar una película.
  console.log("Reemplazar Cruella por Borat")
  await collection.replaceOne({ nombre: 'Cruella' }, {
    nombre: 'Borat',
    year: 2006,
    actor: 'Sasha Baron Cohen',
    boxoffice: 0
  })
  console.log(await collection.find({}).toArray())
  // Recupere y liste todas las películas que se estrenaron antes de un año determinado.
  console.log("Pelis del S. XX")
  console.log(await collection.find({ year: { $lt: 2000 } }).toArray())

  
  // - Quitar el campo "boxoffice" de una sola de las películas.
  console.log("Quitar Boxoffice a F* Club")
  await collection.updateOne({ nombre: 'Fight Club' }, { $unset: { boxoffice: 0 } })
  console.log(await collection.find({}).toArray())
}

main()
