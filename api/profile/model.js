const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const profileSchema = mongoose.Schema({
    profileId: { type: Number, unique: true },
    profileName: { type: String, trim: true },
    profileImageUrl: { type: String, default: 'https://picsum.photos/id/864/200/300' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})


autoIncrement.initialize(mongoose.connection);
profileSchema.plugin(autoIncrement.plugin, { model: 'Profile', field: 'profileId', startAt: 1, incrementBy: 1 });
const Profiles = mongoose.model('Profile', profileSchema);

module.exports = Profiles;