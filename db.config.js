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

db.Formation.hasMany(db.Eleve, {foreignKey: 'id_formation', onDelete: 'SET NULL'})
db.Eleve.belongsTo(db.Formation, {foreignKey: 'id_formation'})

db.Formation.hasMany(db.Module, {foreignKey: 'id_formation', onDelete: 'SET NULL'})
db.Module.belongsTo(db.Formation, {foreignKey: 'id_formation'})

db.Eleve.hasMany(db.Note, {foreignKey: 'id_eleve', onDelete: 'SET NULL'})
db.Note.belongsTo(db.Eleve, {foreignKey: 'id_eleve'})

db.Formateur.hasMany(db.Note, {foreignKey: 'id_formateur', onDelete: 'CASCADE'})
db.Note.belongsTo(db.Formateur, {foreignKey: 'id_formateur'})

db.Formateur.hasMany(db.Module, {foreignKey: 'id_formateur', onDelete: 'SET NULL'})
db.Module.belongsTo(db.Formateur, {foreignKey: 'id_formateur'})

db.Module.hasMany(db.Note, {foreignKey: 'id_module', onDelete: 'CASCADE'})
db.Note.belongsTo(db.Module, {foreignKey: 'id_module'})


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