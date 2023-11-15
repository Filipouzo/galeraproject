/* Import module */
const { Sequelize } = require('sequelize')


/* Connexion à la base de donnée */

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)


/* Mise en place des modèles et relation */
const db = {}

db.sequelize = sequelize

db.Formation = require('./Models/Formation')(sequelize)
db.Formateur = require('./Models/Formateur')(sequelize)
db.Eleve = require('./Models/Eleve')(sequelize)
db.Module = require('./Models/Module')(sequelize)
db.Note = require('./Models/Note')(sequelize)

db.Formation.hasMany(db.Eleve, {foreignKey: 'id_formation'})
db.Eleve.belongsTo(db.Formation, {foreignKey: 'id_formation'})


/* Synchronisation des modèles */
/* Ma base de donnée est stable et j'ai fini de connecté mes modèles je peux commenter la ligne suivante  */
/* db.sequelize.sync({alter: true}) */

module.exports = db