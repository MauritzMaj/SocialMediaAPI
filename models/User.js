const { Schema, model } = require('mongoose');


// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //use RegEx to validate email format
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'friends'
    }],

  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },

      id: false,
    },
);

//create virtual for Friend count
userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });


const Users = model('Users', userSchema);

module.exports = Users;
