async function main() {
  const { Worker } = require('worker_threads');
  const db = await new (require('./db'));

  function runWorker(workerData) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./worker.js', { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with ${code}`));
      })
    })
  }

  async function cyclicWorker(url) {
    const result = { code: null, location: null };
    try {
      const response = await runWorker(url);
      result.code = response.code;
      result.location = response.location;
    } catch {}
    if (result.code === 302 || result.code === 301) {
      return await cyclicWorker(result.location);
    }
    return result.code;
  }

  async function run() {
    const [rows] = await db.getList();
    rows.map(async row => {
      db.markProcessing(row.id);
      const statusCode  = await cyclicWorker(row.url);
      statusCode ? db.markDone(row.id, statusCode) : db.markError(row.id);
    });
  }
  run().catch(console.log);
}

main();
