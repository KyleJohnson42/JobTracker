const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const jobSchema = new mongoose.Schema({
    username: String,
    title: String,
    company: String,
    link: String,
    notes: String,
    applied: Boolean,
    phone: Boolean,
    interview: Boolean,
    offer: Boolean,
    active: Boolean
  });

  const Job = mongoose.model('Job', jobSchema);

  db.getAllJobs = (username, callback) => {
    Job.find({username: username})
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
  }

  db.addJob = (job, callback) => {
    const newJob = new Job(job);
    newJob.save()
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
  }

  db.updateJob = (id, job, callback) => {
    Job.updateOne({ _id: id }, job)
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
  }

  db.deleteJob = (id, callback) => {
    Job.deleteOne({ _id: id })
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
  }

  db.deleteAllJobs = (username, callback) => {
    Job.deleteMany({ username: username })
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
  }
});

module.exports = db;