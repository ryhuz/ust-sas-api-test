import { DataTypes } from 'sequelize';
import sequelize from '../config/database'

const subjectAttr = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subjectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const Subject = sequelize.define('Subject', subjectAttr, {
    timestamps: false,
})

Subject.associate = models => {
    Subject.belongsToMany(models.Class, {
        through: "TeachersSubjectsClasses"
    });
}

module.exports = { Subject };