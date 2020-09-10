import { DataTypes ,Op} from 'sequelize';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Category extends BaseModel {
    static getCategoryById(id) {
        return this.findOne({
            where: {
                del: 0,
                id
            }
        })
    }

    static getListCategory() {
        return this.findAll({
            where: {
                del: 0,
                isRecruitment:0
            }
        })
    }

    static getCategoryRecruitment() {
        return this.findOne({
            where: {
                del: 0,
                isRecruitment:1
            }
        })
    }

    static getCategoryBySlug(slug) {
        return this.findOne({
            where: {
                del: 0,
                slug
            }
        })
    }
    static getListCategoryPageDetail(data) {
        return this.findAll({
            where: {
                del: 0,
                id:{[Op.ne]: data.category_id}
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
    slug: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    isRecruitment: {
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
    tableName: 'new_category',
};

/**
 * Init Model
 */
Category.init(attributes, { ...options, sequelize });