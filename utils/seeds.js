const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    await connection.dropDatabase();
    console.log("Database Dropped");

    const userSeeds = [
        {
            username: "batman",
            email: "detective@gothammail.com",
            thoughts: [],
            friends: [],
        },
        {
            username: "robin",
            email: "robin@gothammail.com",
            thoughts: [],
            friends: [],
        },
    ];
    const thoughtSeeds = [
        {
            thoughtText: "Test Thought 1",
            username: "batman",
            reactions: [],
        },
        {
            thoughtText: "Test Thought 2",
            username: "robin",
            reactions: [],
        },
    ];
    const reactionSeeds = [
        {
            reactionBody: "Villian 1",
            username: "batman",
        },
        {
            reactionBody: "Villian 2",
            username: "robin",
        },
    ];

    const users = await User.insertMany(userSeeds);

    const thoughts = [];
    for (let i = 0; i < thoughtSeeds.length; i++) {
        const thought = await Thought.create(thoughtSeeds[i]);
        thoughts.push(thought);

        const userId = users[i]._id;
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
    }

    for (let i = 0; i < reactionSeeds.length; i++) {
        const thoughtId = thoughts[i]._id;
        const reaction = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: reactionSeeds[i] } },
            { new: true }
        );
    }

    console.info("Seeding Succesful!");
    process.exit(0);
});
