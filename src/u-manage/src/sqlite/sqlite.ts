import { Sequelize, TEXT, INTEGER } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
});

export const Category = sequelize.define("category", {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  directory: { type: TEXT, allowNull: false, unique: true },
  name: { type: TEXT, allowNull: false },
}); // 分类表

export const Resource = sequelize.define("resource", {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: TEXT, allowNull: false, unique: true },
  describe: { type: TEXT },
  tags: { type: TEXT },
  categoryId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  },
  resources: { type: TEXT },
  readmes: { type: TEXT },
}); // 资源表

/**
 * @description: 创建sqlite3数据库
 */
export function createSqlite() {
  Category.sync();
  Resource.sync();
}
