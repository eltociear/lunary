import postgres from "postgres"

const sql = postgres(process.env.DATABASE_URL!, {
  idle_timeout: 20,
  max_lifetime: 60 * 5,
  transform: {
    ...postgres.camel,
    undefined: null,
  },
  connection: {
    application_name: `postgres.js-${process.env.NODE_ENV === "production" ? "production" : "development"}`,
  },
})

export async function checkDbConnection() {
  try {
    await sql`select 1`
    console.log("✅ Connected to database")
  } catch (error) {
    console.error("❌ Could not connect to database")
    process.exit(1)
  }
}

export default sql
