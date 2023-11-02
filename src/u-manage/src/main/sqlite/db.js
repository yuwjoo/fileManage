const sqlite3 = require("sqlite3").verbose();
const sqliteDbPath = "./Manage.db"; // 数据库地址
const db = new sqlite3.Database(sqliteDbPath);

db.serialize(() => {
  // 分类表
  db.run(
    `CREATE TABLE IF NOT EXISTS category
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      directory TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL
    );`
  );
  // 资源表
  db.run(
    `CREATE TABLE IF NOT EXISTS resource
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      describe TEXT,
      tags TEXT,
      category_id INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES category(id)
    );`
  );
  db.run("PRAGMA foreign_keys = ON;"); // 打开外键约束
});

module.exports = db;
