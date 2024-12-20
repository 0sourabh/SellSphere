const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing

// User schema definition
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String }, // Add address field for pickup address
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

const Users = mongoose.model('Users', UserSchema);

// Message schema definition (for chat feature)
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Messages = mongoose.model('Messages', MessageSchema);

// Like a product
module.exports.likeProducts = (req, res) => {
    const { productId, userId } = req.body;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => res.send({ message: 'Product liked successfully.' }))
        .catch(err => res.status(500).send({ message: 'Server error', error: err.message }));
}

// User signup
module.exports.signup = (req, res) => {
    const { username, password, email, mobile, address } = req.body;

    // Hash the password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({ message: 'Error hashing password.' });
        }
        const user = new Users({ username, password: hashedPassword, email, mobile, address });
        user.save()
            .then(() => res.send({ message: 'User saved successfully.' }))
            .catch(err => res.status(500).send({ message: 'Server error', error: err.message }));
    });
}

// Get user profile by ID
module.exports.myProfileById = (req, res) => {
    const uid = req.params.userId;

    Users.findOne({ _id: uid })
        .then(result => {
            if (!result) {
                return res.status(404).send({ message: 'User not found.' });
            }
            res.send({
                message: 'Profile retrieved successfully.',
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username,
                    address: result.address // Include address
                }
            });
        })
        .catch(err => res.status(500).send({ message: 'Server error', error: err.message }));
}

// Get user by ID
module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;

    Users.findOne({ _id: _userId })
        .then(result => {
            if (!result) {
                return res.status(404).send({ message: 'User not found.' });
            }
            res.send({
                message: 'User retrieved successfully.',
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username,
                    address: result.address // Include address
                }
            });
        })
        .catch(err => res.status(500).send({ message: 'Server error', error: err.message }));
}

// User login
module.exports.login = (req, res) => {
    const { username, password } = req.body;

    Users.findOne({ username })
        .then(result => {
            if (!result) {
                return res.status(404).send({ message: 'User not found.' });
            }
            // Compare hashed password
            bcrypt.compare(password, result.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send({ message: 'Server error.' });
                }
                if (!isMatch) {
                    return res.status(401).send({ message: 'Password is incorrect.' });
                }
                // Generate token
                const token = jwt.sign({ userId: result._id, username: result.username }, 'MYKEY', { expiresIn: '1h' });
                res.send({ message: 'Login successful.', token, userId: result._id });
            });
        })
        .catch(err => res.status(500).send({ message: 'Server error', error: err.message }));
}

// Get liked products
module.exports.likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then(result => {
            if (!result) {
                return res.status(404).send({ message: 'User not found.' });
            }
            res.send({ message: 'Liked products retrieved successfully.', products: result.likedProducts });
        })
        .catch(err => res.status(500).send({ message: 'Server error', error: err.message }));
}

// Get all messages between two users (chat feature)
module.exports.getMessages = (req, res) => {
    const { userId, otherUserId } = req.query;

    Messages.find({
        $or: [
            { sender: userId, recipient: otherUserId },
            { sender: otherUserId, recipient: userId }
        ]
    })
    .sort({ createdAt: 1 }) // Sort messages by creation date
    .then(messages => res.json(messages))
    .catch(err => res.status(500).send({ message: 'Error retrieving messages.', error: err.message }));
}

// Send a new message (chat feature)
module.exports.sendMessage = (req, res) => {
    const { sender, recipient, text } = req.body;

    const newMessage = new Messages({ sender, recipient, text });

    newMessage.save()
        .then(message => res.status(201).json(message))
        .catch(err => res.status(500).send({ message: 'Error sending message.', error: err.message }));
}
