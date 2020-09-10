import { DataTypes, Op } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class AppDetail extends BaseModel {

    static createCondition(data) {
        let conditions = {
            where: {
                del: 0
            },
            order: [['id', 'DESC']]
        }
        return conditions
    }

    static getAllAppDetail(data) {
        let conditions = this.createCondition(data);
        if (data.page != 0) {
            conditions.offset = (data.page - 1) * data.limit
            conditions.limit = data.limit
        }
        return this.findAll(conditions)
    }

    static getAllAppDetailEmp(data) {
        return this.findOne({
            where: {
                type:1,
                del: 0
            }
        })
    }

    static getAllAppDetailCus(data) {
        return this.findOne({
            where: {
                type:0,
                del: 0
            }
        })
    }

    static countAllAppDetail(data) {
        let conditions = this.createCondition(data)
        return this.count(conditions)
    }

    static getAppDetailById(id) {
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
    html_content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    plain_text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    link_app_ios: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    link_app_android: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    type: {
        type: DataTypes.INTEGER(1),
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
    tableName: 'appdetail',
};
AppDetail.init(attributes, { ...options, sequelize });