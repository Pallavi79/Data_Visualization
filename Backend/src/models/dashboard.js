const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    end_year: mongoose.Schema.Types.Mixed,
    intensity: mongoose.Schema.Types.Mixed,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: mongoose.Schema.Types.Mixed,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: mongoose.Schema.Types.Mixed,
    pestle: String,
    source: String,
    title: String,
    likelihood: mongoose.Schema.Types.Mixed
});

const Dashboard = mongoose.model('dashboard', DashboardSchema);

module.exports = Dashboard;