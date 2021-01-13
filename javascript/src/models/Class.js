import { DataTypes } from 'sequelize';
import sequelize from '../config/database'

const classAttr = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const Class = sequelize.define('Class', classAttr, {
    tableName: "Classes",
    timestamps: false,
})

Class.associate = models => {
    Class.hasMany(models.Students);
}

Class.associate = models => {
    Class.belongsToMany(models.Subject, {
        through: "TeachersSubjectsClasses"
    });
}

module.exports = { Class };