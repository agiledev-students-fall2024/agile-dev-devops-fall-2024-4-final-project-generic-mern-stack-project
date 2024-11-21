// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({});

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;

//schema exlains what the format of the data will be 

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String,
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

//take the schema and create a model from it