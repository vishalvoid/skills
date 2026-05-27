import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS skills_visits (
      id   TEXT PRIMARY KEY DEFAULT 'total',
      count BIGINT NOT NULL DEFAULT 0
    )
  `;
  await sql`
    INSERT INTO skills_visits (id, count)
    VALUES ('total', 0)
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function POST() {
  try {
    await ensureTable();
    const rows = await sql`
      UPDATE skills_visits
      SET count = count + 1
      WHERE id = 'total'
      RETURNING count
    `;
    return NextResponse.json({ count: Number(rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await sql`SELECT count FROM skills_visits WHERE id = 'total'`;
    return NextResponse.json({ count: Number(rows[0]?.count ?? 0) });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
