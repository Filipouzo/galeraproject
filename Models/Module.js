/* Import module */
const { DataTypes } = require('sequelize')

/* Module */

module.exports = (sequelize) => {
    const Module = sequelize.define('Module', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        id_formation:{
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        id_formateur:{
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
    })

    return Module
}