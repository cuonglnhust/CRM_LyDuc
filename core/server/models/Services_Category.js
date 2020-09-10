import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Services_Category extends BaseModel {

    static getServicesCategoryById(id) {
        return this.findOne({
            where: {
                del: 0,
                id
            }
        })
    }

    static getServicesCategoryBySlug(slug) {
        return this.findOne({
            where: {
                del: 0,
                slug
            }
        })
    }

    static getServicesCategory(data) {
        let conditions = {
            where: {
                del: 0
            },

            order: [
                ['id', 'DESC']
            ]
        }
        if (data.title) {
            conditions.where.title = {
                [Op.like]: `%${data.title}%`
            }
        }
        if (data.limit) {
            conditions.offset = (data.page - 1) * parseInt(data.limit);
            conditions.limit = parseInt(data.limit);
        }
        return this.findAll(conditions);
    }

    static countListServicesCategory(data) {
        let conditions = {
            where: {
                del: 0
            },

            order: [
                ['id', 'DESC']
            ]
        }
        return this.count(conditions);
    }

    static getServicesCategoryHot() {
        return this.findAll({
            where: {
                del: 0,
                hot: 1
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING(5000),
        allowNull: true,
        defaultValue: null
    },
    hot: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    services_sub: {
        type: DataTypes.TEXT,
        get: function () {
            return parseArr(this.getDataValue('services_sub'))
        },
        set: function (val) {
            this.setDataValue('services_sub', setArr(val));
        }
    },
    services_other: {
        type: DataTypes.TEXT,
        get: function () {
            return parseArr(this.getDataValue('services_other'))
        },
        set: function (val) {
            this.setDataValue('services_other', setArr(val));
        }
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
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

/**
 * Options model
 */
const options = {
    tableName: 'services_category',
};

/**
 * Init Model
 */
Services_Category.init(attributes, { ...options, sequelize });