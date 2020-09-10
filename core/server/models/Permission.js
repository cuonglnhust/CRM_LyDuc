import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Permission extends BaseModel {

    static createConditions(data) {
        let conditions = {
            where: {
                del: 0
            }
        }
        if (data.status) {
            conditions.where.status = parseInt(data.status)
        }
        return conditions
    }

    static getAllPermission(data) {
        let conditions = this.createConditions(data)
        if (data.page != 0) {
            conditions.offset = (data.page - 1) * data.limit
            conditions.limit = data.limit
        }
        return this.findAll(conditions)
    }

    static countAllPermission(data) {
        let conditions = this.createConditions(data)
        return this.count(conditions)
    }

}

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
    action: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null
    },
    object: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const options = {
    tableName: 'permission',
};
Permission.init(attributes, { ...options, sequelize });