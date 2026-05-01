import { createPool, Pool } from "mariadb";

// Membuat connection pool ke MariaDB (XAMPP)
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

export const pool =
  globalForDb.pool ??
  createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "jurnal_kali",
    connectionLimit: 5,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;
