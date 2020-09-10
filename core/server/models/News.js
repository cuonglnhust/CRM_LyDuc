import {
  DataTypes, Op
} from 'sequelize';
import bcrypt from 'bcryptjs';
import randomize from 'randomatic';
import _ from 'lodash';

import {
  sequelize
} from '../connections';
import BaseModel from './BaseModel';
import Category from './Category'
import User from './User'

export default class News extends BaseModel {
  static association() {
    News.belongsTo(Category, { as: 'category', foreignKey: 'category_id' })
    News.belongsTo(User, { as: 'user', foreignKey: 'createdBy' })
  }
  static getNewsById(id) {
    return this.findOne({
      where: {
        del: 0,
        id
      },
      include: ['user']
    })
  }


  static createConditions(data) {
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
    if (parseInt(data.category_id)) {
      conditions.where.category_id == parseInt(data.category_id)
    }
    if (data.status && parseInt(data.status) != -1) {
      conditions.where.status = parseInt(data.status);
    }
    if (data.hot && parseInt(data.hot) != -1) {
      conditions.where.hot = parseInt(data.hot);
    }
    conditions.include = ["category", "user"];
    return conditions;
  }

  static getListNews(data) {
    let conditions = this.createConditions(data);
    if (data.limit) {
      conditions.offset = (data.page - 1) * data.limit;
      conditions.limit = data.limit;
    }
    return this.findAll(conditions);
  }

  static getListNewsContent(data) {
    let conditions = {
      where: {
        del: 0,
        category_id: data.category_id
      },

      order: [
        ['id', 'DESC']
      ]
    }
    conditions.include = ["category", "user"];
    if (data.limit) {
      conditions.offset = (data.page - 1) * data.limit;
      conditions.limit = data.limit;
    }
    return this.findAll(conditions);
  }

  static countListNewsContent(data) {
    let conditions = {
      where: {
        del: 0,
        category_id: { [Op.ne]: 5 }
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
    if (parseInt(data.category_id)) {
      conditions.where.category_id == parseInt(data.category_id)
    }
    if (data.status && parseInt(data.status) != -1) {
      conditions.where.status = parseInt(data.status);
    }
    if (data.hot && parseInt(data.hot) != -1) {
      conditions.where.hot = parseInt(data.hot);
    }
    conditions.include = ["category", "user"];
    if (data.limit) {
      conditions.offset = (data.page - 1) * data.limit;
      conditions.limit = data.limit;
    }
    return this.count(conditions);
  }

  static getNewsBySlug(slug) {
    return this.findOne({
      where: {
        del: 0,
        slug
      },
      include: ["category"]
    })
  }
  static getNewsByCategoryId(data) {
    let conditions = {
      where: {
        category_id: parseInt(data.category_id),
        del: 0
      },
      limit: 3,
      order: [
        ['id', 'DESC']
      ]
    }
    if (data.title) {
      conditions.where.title = {
        [Op.like]: `%${data.title}%`
      }
    }
    conditions.include = ["category", "user"]
    return this.findAll(conditions);
  }

  static getNewsHotLyDuc(data) {
    let conditions = {
      where: {
        category_id: 1,
        del: 0
      },
      limit: 3,
      order: [
        ['id', 'DESC']
      ]
    }
    conditions.include = ["category", "user"]
    return this.findAll(conditions);
  }

  static getNewsHotMarket(data) {
    let conditions = {
      where: {
        category_id: 3,
        del: 0
      },
      limit: 3,
      order: [
        ['id', 'DESC']
      ]
    }
    conditions.include = ["category", "user"]
    return this.findAll(conditions);
  }

  static getNewsHotRecruitment(data) {
    let conditions = {
      where: {
        category_id: 5,
        del: 0
      },
      limit: 3,
      order: [
        ['id', 'DESC']
      ]
    }
    conditions.include = ["category", "user"]
    return this.findAll(conditions);
  }

  static getNewsRecruitment(data) {
    let conditions = {
      where: {
        category_id: data.category_id,
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
    conditions.include = ["category", "user"]
    return this.findAll(conditions);
  }

  static getListNewsHot(category_id) {
    let conditions = {
      where: {
        category_id,
        del: 0
      },
      limit: 4,
      order: [
        ['id', 'DESC']
      ]
    }
    return this.findAll(conditions);
  }

  static getNewsCate(data) {
    let conditions = {
      where: {
        category_id: parseInt(data.category_id),
        del: 0
      },
      order: [
        ['id', 'DESC']
      ]
    }
    if (data.titleNews) {
      conditions.where.title = {
        [Op.like]: `%${data.titleNews}%`
      }
    }
    conditions.include = ["category", "user"]
    return this.findAll(conditions);
  }
  static getNewsBySlugCategory(data) {
    let conditionsCategory = {
      association: 'category',
      required: true,
      where: {},
    }
    if (data.slug) {
      conditionsCategory.where.slug = data.slug
    }

    let conditions = {
      where: {},
      order: [['createdAt', 'DESC']],
      include: [conditionsCategory]
    }
    if (data.title) {
      conditions.where.title = {
        [Op.like]: `%${data.title}%`
      }
    }
    return this.findAll(conditions)
  }

  static countListNews(data) {
    let conditions = this.createConditions(data);
    return this.count(conditions);
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
  createdBy: {
    type: DataTypes.INTEGER(10),
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
    allowNull: true,
    defaultValue: null
  },
  html_content: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  plain_text: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  hot: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  },
  category_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: null
  },
  del: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  },
  publish_date: {
    type: DataTypes.DATE,
    allowNull: true
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
  tableName: 'news'
};

/**
 * Init Model
 */
News.init(attributes, {
  ...options,
  sequelize
});