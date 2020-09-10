import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import { User, Role } from './'

export default class User_Role extends BaseModel {
    static association() {
        User_Role.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
        User_Role.belongsTo(Role, { as: 'role', foreignKey: 'role_id' });
    }

    static getUserById(id) {
        return this.findOne({
            where: {
                del: 0,
                user_id: id,
            },
            include: ['user', 'role']
        })
    }



    static getUser() {
        return this.findAll({
            where: {
                del: 0
            },
            include: ['user', 'role']
        })
    }

}

/**
 * Attributes model
 */
const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: null
    },
    role_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: null
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    }
};

/**
 * Options model
 */
const options = {
    tableName: 'user_role'
};

/**
 * Init Model
 */
User_Role.init(attributes, { ...options, sequelize });