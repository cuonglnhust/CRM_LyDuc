import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Seo extends BaseModel {

    static getAllSeo (){
        return this.findAll({
            where: {
              del:0
            }
          })
    }

}

const parseArr = (value) => {
    try {
        if (!value) return '';
        return JSON.parse(value);
    } catch (err) {
        return ''
    }
}

const setArr = (value) => {
    try {
        if (!value) return '';
        return JSON.stringify(value);
    } catch (err) {
        return ''
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
    content: {
        type: DataTypes.TEXT,
        get: function () {
            return parseArr(this.getDataValue('content'))
        },
        set: function (val) {
            this.setDataValue('content', setArr(val));
        }
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
    tableName: 'seo',
};
Seo.init(attributes, { ...options, sequelize });