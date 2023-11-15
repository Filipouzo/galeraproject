/* Import module */
const { Sequelize } = require('sequelize')


/* Connexion à la base de donnée Debian */
 let sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
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
//! Si ma base de donnée est stable et j'ai fini de connecté mes modèles je dois commenter la ligne suivante  */

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Synchronisation réussie.');
  }).catch((error) => {
    console.error('Erreur lors de la synchronisation :', error);
  });



module.exports = db




/* Connexion au cluster AWS via proxy AWS*/
/* let sequelize = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)
 */