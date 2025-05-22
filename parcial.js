//nombre: Ezequiel Cura
// legajo: 115400

use cafeteria;
db.cafes.drop();

db.cafes.insertMany([
    {
    tipo: "espresso",
    ingredientes: ["chocolate", "vainilla"],
    peso: 200,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 500 },
      { tipo: "tarjeta", precio: 550 }
    ],
    contiene_leche: false,
    tostador: { localidad: "San Telmo", nombre: "Tostado Sur", cuit: "3333" }
  },
  {
    tipo: "cold brew",
    ingredientes: ["vainilla", "canela"],
    peso: 240,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 600 },
      { tipo: "tarjeta", precio: 660 }
    ],
    contiene_leche: false,
    tostador: { localidad: "San Justo", nombre: "Café del Oeste", cuit: "444" }
  },
  {
    tipo: "filtrado",
    ingredientes: ["caramelo", "chocolate"],
    peso: 250,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 450 },
      { tipo: "tarjeta", precio: 500 }
    ],
    contiene_leche: true,
    tostador: { localidad: "Palermo", nombre: "Tostador Palermo", cuit: "111" }
  },
  {
    tipo: "descafeinado",
    ingredientes: ["vainilla"],
    peso: 220,
    intensidad: "baja",
    precio: [
      { tipo: "efectivo", precio: 400 },
      { tipo: "tarjeta", precio: 450 }
    ],
    contiene_leche: true,
    tostador: { localidad: "San Martín", nombre: "Del San", cuit: "222" }
  },
  {
    tipo: "espresso",
    ingredientes: ["canela"],
    peso: 180,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 470 },
      { tipo: "tarjeta", precio: 500 }
    ],
    contiene_leche: false,
    tostador: { localidad: "Córdoba", nombre: "Cordobés Café", cuit: "555" }
  },
  {
    tipo: "cold brew",
    ingredientes: ["chocolate"],
    peso: 260,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 650 },
      { tipo: "tarjeta", precio: 700 }
    ],
    contiene_leche: false,
    tostador: { localidad: "Santos Lugares", nombre: "Tostado Norte", cuit: "666" }
  },
  {
    tipo: "filtrado",
    ingredientes: ["vainilla", "canela"],
    peso: 230,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 520 },
      { tipo: "tarjeta", precio: 570 }
    ],
    contiene_leche: true,
    tostador: { localidad: "San Miguel", nombre: "San Coffee", cuit: "777" }
  },
  {
    tipo: "espresso",
    ingredientes: ["caramelo"],
    peso: 210,
    intensidad: "baja",
    precio: [
      { tipo: "efectivo", precio: 480 },
      { tipo: "tarjeta", precio: 530 }
    ],
    contiene_leche: true,
    tostador: { localidad: "Villa Urquiza", nombre: "Urquiza Café", cuit: "888" }
  },
  {
    tipo: "cold brew",
    ingredientes: ["vainilla", "chocolate"],
    peso: 270,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 680 },
      { tipo: "tarjeta", precio: 720 }
    ],
    contiene_leche: false,
    tostador: { localidad: "San Fernando", nombre: "Tostador Delta", cuit: "999" }
  },
  {
    tipo: "descafeinado",
    ingredientes: ["canela", "caramelo"],
    peso: 195,
    intensidad: "baja",
    precio: [
      { tipo: "efectivo", precio: 430 },
      { tipo: "tarjeta", precio: 460 }
    ],
    contiene_leche: false,
    tostador: { localidad: "Morón", nombre: "Café Oeste", cuit: "000" }
  }
]);

// load()

// 2) Buscar cuántos cafés contienen chocolate entre sus ingredientes.------------------------------------------------------------------------

db.cafes.find({ingredientes: "chocolate"}).count();

// 3) Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.-------------------------------------------

db.cafes.find({ tipo: "cold brew", ingredientes: "vainilla"}).count();

// 4) Listar tipo y peso de los cafés que tienen una intensidad “media”.---------------------------------------------------------------------

db.cafes.find({intensidad: "media"},{tipo: 1, peso: 1,_id: 0})

db.cafes.aggregate([{ $match: { intensidad: "media"}}, {$project: { _id: 0, tipo: 1, peso: 1}}])

// 5) Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.----------------------------------------

db.cafes.aggregate([{ $match: { peso: { $gte: 200, $lte: 260}}}, { $project: {_id: 0, tipo: 1, peso: 1, intensidad: 1}}])


// 6) Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san”--------------------------------
//    y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera
//    descendente.

db.cafes.aggregate( [{ $match: { "tostador.localidad" : /san/i}}, { $sort: { peso: -1}}])

// 7) Mostrar la sumar del peso de cada tipo de Café.--------------------------------------------------------------------------------------

db.cafes.aggregate([{ $group: { _id: "$tipo", totalPeso: { $sum: "$peso"}}}])

// 8) Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.-------------------------------------------------------------

db.cafes.updateMany({intensidad: "alta" }, {$push: { ingredientes: "whisky" } })

//use esta consulta para revisar si todo se modifico correctamente
// db.cafes.aggregate([{$match: { intensidad: "alta"}},{$project: {_id:0, ingredientes: 1, intensidad: 1}}])

// 9) Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.----------------------------------------------------

db.cafes.updateMany( {peso: {$gte: 200, $lte: 260 } }, { $inc: { peso: 10 } })

// use esta consulta para revisar
// db.cafes.aggregate([ {$match: { peso: { $gte:200, $lte:260}}}, { $project: {_id:1, peso: 1}}])


// 10) Eliminar los cafés cuyo peso sea menor o igual a 210.--------------------------------------------------------------------------------

db.cafes.deleteMany( { peso : { $lte: 210}})

// use esta consulta para revisar
// db.cafes.find({ peso: { $lte: 210}}, {id: 1, peso: 1})




