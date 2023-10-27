const sqlite3 = require("sqlite3").verbose();
const sqliteDbPath = "./database/Manage.db"; // 数据库地址
const db = new sqlite3.Database(sqliteDbPath);

db.serialize(() => {
  // 分类表
  db.run(
    `CREATE TABLE IF NOT EXISTS types
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      directory TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL
    );`
  );
  // 资源表
  db.run(
    `CREATE TABLE IF NOT EXISTS resource
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      describe TEXT,
      types_id INTEGER NOT NULL,
      FOREIGN KEY (types_id) REFERENCES types(id)
    );`
  );
  db.run("PRAGMA foreign_keys = ON;"); // 打开外键约束
});

module.exports = db;
