const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: [280, 'Reached max character length']
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: format_date,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: [1, 'Thought text required'],
            maxLength: [280, 'Reached max character length']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: format_date,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

function format_date(date) {
    // Format date as MM/DD/YYYY
    return date.toLocaleString();
}

// Create a virtual property `reactionCount` that gets the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount ')
    .get(function () {
        return this.reactions.length;
    })

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
