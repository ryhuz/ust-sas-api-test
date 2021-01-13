'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.createTable('Teachers', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },

        }, { transaction: t }),

        queryInterface.createTable('Students', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          }, email: {
            type: Sequelize.STRING,
            autoIncrement: true,
            unique: true,
          },

        }, { transaction: t }),

        queryInterface.createTable('Subjects', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          subjectCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          subjectName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        }, { transaction: t }),

        queryInterface.createTable('Classes', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          classCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          className: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        }, { transaction: t }),

        queryInterface.createTable('TeachersSubjectsClasses', {
          subject: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Subjects',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          class: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Classes',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          teachers: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Teachers',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
        }, { transaction: t }),

      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
