/** Import module */
const { DataTypes } = require('sequelize')


/** Formation */

module.exports = (sequelize) => {
    const Formation = sequelize.define('Formation', {
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
        start:{
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
        end:{
            type: DataTypes.INTEGER(10),
            defaultValue: 0,
            allowNull: false
        },
    })

    return Formation
}