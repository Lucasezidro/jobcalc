// const { update } = require("../controllers/JobController")
const Database = require('../db/config')

module.exports = {
    async get(){
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => ({
                id: job.id,
                name: job.name,
                daily_hours: job.daily_hours,
                total_hours: job.total_hours,
                created_at: job.created_at
        }))
    },
    async update(newJob){
        const db = await Database()

        db.run(`UPDATE jobs SET
            name = "${newJob.name}",
            daily_hours = ${newJob.daily_hours},
            total_hours = ${newJob.total_hours},
            created_at = ${newJob.created_at}
            WHERE id = ${jobId}
        `)

        await db.close()
    },
    async delete(id){
        const db = await Database()

        db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    
    
    },
    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob.daily_hours},
            ${newJob.total_hours},
            ${newJob.created_at}
        )
        
    `)

        await db.close()
    }
}