/* Import module */
const { DataTypes } = require('sequelize')

/* Note */

module.exports = (sequelize) => {
    const Note = sequelize.define('Note', {
        id_formateur: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        id_eleve: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER(2),
            validate: {
              min: 0,
              max: 20
            },
            defaultValue: 0,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(250),
            defaultValue: '',
            allowNull: false
        },
        id_module: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        }
    })

    return Note
}