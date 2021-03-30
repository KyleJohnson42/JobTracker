const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    link: String,
    notes: String,
    applied: Boolean,
    phone: Boolean,
    interview: Boolean,
    offer: Boolean
  });

  const Job = mongoose.model('Job', jobSchema);

});

module.exports = {
  db: db
}