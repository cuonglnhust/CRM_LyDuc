import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Role extends BaseModel {

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
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
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
    tableName: 'role'
};

/**
 * Init Model
 */
Role.init(attributes, { ...options, sequelize });