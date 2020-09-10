import { DataTypes, Op } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class ProcessService extends BaseModel {

    static createCondition(data) {
        let conditions = {
            where: {
                del: 0
            }
        }
        return conditions
    }

    static getAllProcessService(data) {
        let conditions = this.createCondition(data);
        if (data.page != 0) {
            conditions.offset = (data.page - 1) * data.limit
            conditions.limit = data.limit
        }
        return this.findAll(conditions)
    }

    static countAllProcessService(data) {
        let conditions = this.createCondition(data)
        return this.count(conditions)
    }

    static getProcessServiceById(id) {
        return this.findOne({
            where: {
                id,
                del: 0
            }
        })
    }
}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    step_number: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
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
    image: {
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
    tableName: 'processService',
};
ProcessService.init(attributes, { ...options, sequelize });