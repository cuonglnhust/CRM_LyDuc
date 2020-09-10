import { DataTypes, Op } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Introductions extends BaseModel {

    static createCondition(data) {
        let conditions = {
            where: {
                del: 0
            },
            order: [['id', 'DESC']]
        }
        if (data.title) {
            conditions.where.title = {
                [Op.like]: `%${data.title}%`
            }
        }
        return conditions
    }

    static getAllIntroductions(data) {
        let conditions = this.createCondition(data);
        if (data.page != 0) {
            conditions.offset = (data.page - 1) * data.limit
            conditions.limit = data.limit
        }
        return this.findAll(conditions)
    }

    static countAllIntroductions(data) {
        let conditions = this.createCondition(data)
        return this.count(conditions)
    }

    static getIntroductionsById(id) {
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    html_content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    plain_text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 1
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
    tableName: 'introductions',
};
Introductions.init(attributes, { ...options, sequelize });