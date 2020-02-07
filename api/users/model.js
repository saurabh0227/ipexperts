const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const userSchema = mongoose.Schema({
    userId: { type: Number, unique: true },
    name: { type: String },
    phone: { type: Number },
    role: { type: String, default: 'Admin' },
    password: { type: String, require: true },
    profileEntryStatus: { type: String }
})


autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId', startAt: 1, incrementBy: 1 });
const Users = mongoose.model('User', userSchema);

module.exports = Users;

