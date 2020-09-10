import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Services_Category_Content extends BaseModel {

}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    services_category_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
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

/**
 * Options model
 */
const options = {
    tableName: 'services_category_content',
};

/**
 * Init Model
 */
Services_Category_Content.init(attributes, { ...options, sequelize });