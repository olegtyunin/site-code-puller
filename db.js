const mysql = require('mysql2/promise');

const table = 'list';

const STATUS = {
  NEW: 'new',
  PROCESSING: 'processing',
  DONE: 'done',
  ERROR: 'error',
};

class db {
  //async constructor
  constructor() {
    return (async () => {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1',
        database: 'requests',
      });
      return this;
    })();
  }

  getList() {
    return this.connection.query(`SELECT * FROM ${table}`);
  }

  markProcessing(id) {
    return this.connection.query(`UPDATE ${table} SET statuS='${STATUS.PROCESSING}' WHERE id=${id}`);
  }

  markDone(id, status) {
    return this.connection.query(`UPDATE ${table} SET http_status='${status}', statuS='${STATUS.DONE}' WHERE id=${id}`);
  }

  markError(id) {
    return this.connection.query(`UPDATE ${table} SET statuS='${STATUS.ERROR}' WHERE id=${id}`);
  }
}

module.exports = db;
