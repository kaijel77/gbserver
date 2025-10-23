const cron = require('node-cron');
class Scheduler {
    constructor() {
        this.jobs = new Map();
    }
  
    addJob(name, interval, task) {
        if (this.jobs.has(name)) {
            console.error(`Job with name '${name}' already exists.`);
            return;
        }
  
        const job = cron.schedule(interval, task, {
            scheduled: false,
            timezone: 'UTC',
        });
    
        this.jobs.set(name, job);
    }
    
    startJob(name) {
        const job = this.jobs.get(name);
    
        if (!job) {
            console.error(`Job with name '${name}' not found.`);
            return;
        }
    
        job.start();
    }
    
    stopJob(name) {
        const job = this.jobs.get(name);
    
        if (!job) {
            console.error(`Job with name '${name}' not found.`);
            return;
        }
    
        job.stop();
    }
    
    deleteJob(name) {
        const job = this.jobs.get(name);
    
        if (!job) {
            console.error(`Job with name '${name}' not found.`);
            return;
        }
    
        job.destroy();
        this.jobs.delete(name);
    }
}
  
module.exports = Scheduler;