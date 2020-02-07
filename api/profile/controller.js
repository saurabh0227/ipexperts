const Profiles = require('./model');
const Users = require('../users/model');

exports.addProfile = async (req, res, next) => {
    try {
        const userName = await Users.findOne({ _id: req.body.user._id }).then(user => user.name)
        const profile = await Profiles.create({
            profileName: userName,
            profileImageUrl: 'https://picsum.photos/id/864/200/300',
            user: req.body.user
        })

        if (profile) {
            Users.updateOne({ _id: profile.user }, { $set: { profileEntryStatus: 'Success' } })
            res.status(201).json({ message: 'Profile created successfully with profile entry status success' })
        } else {
            Users.updateOne({ _id: req.body.user }, { $set: { profileEntryStatus: 'Failed' } })
            res.status(201).json({ message: 'Profile created successfully with profile entry status failed' })
        }

    } catch (err) {
        console.log(err)
    }
}

exports.getAllProfile = (req, res, next) => {
    Profiles.findAll()
        .then(profiles => {
            return res.status(200).json({ profiles: profiles })
        })
        .catch(err => {
            console.log(`Error in getting complete profiles ${err}`)
        })
}