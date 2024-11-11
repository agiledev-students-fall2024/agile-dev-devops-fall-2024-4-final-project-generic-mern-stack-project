// import and instantiate express
import express from 'express'
const router = express.Router();

// route for the profile page
router.get('/api/profile', async (req, res) => {
    // get the data for the user
    try {
        // user obj
        const user = {
            id: 1,
            username: 'monalisa',
            display_name: 'Mona Lisa',
            profile_pic: 'https://picsum.photos/200',
            about: 'My name is Mona Lisa!',
            email: 'monalisa@gmail.com',
            followers: [2, 3, 4, 5, 6, 7, 8, 9, 10],
            following: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            signedIn: true,
            communities: [],
            posts: [
                {
                    id: 1,
                    user: {
                        id: 1,
                        username: 'monalisa',
                        display_name: 'Mona Lisa',
                        profile_pic: 'https://picsum.photos/200',
                        about: 'My name is Mona Lisa!',
                    },
                    liked_by: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                    images: [],
                    content: 'I just visited this crazy painting of me at the Louvre... definitely check it out, guys!',
                    replies: [
                        {
                            id: 2,
                            user: {
                                id: 2,
                                username: 'user2',
                                display_name: 'User Two',
                                profile_pic: 'https://picsum.photos/200',
                                about: 'A fellow art enthusiast!'
                            },
                            liked_by: [1, 3, 4],
                            images: [],
                            content: 'Wow, that sounds amazing! I’ve been wanting to see it myself!',
                            replies: [
                                {
                                    id: 3,
                                    user: {
                                        id: 3,
                                        username: 'user3',
                                        display_name: 'User Three',
                                        profile_pic: 'https://picsum.photos/200',
                                        about: 'I love traveling!'
                                    },
                                    liked_by: [1, 2],
                                    images: [],
                                    content: 'I went there last year! It’s such an incredible experience.',
                                    replies: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 7,
                    user: {
                        id: 1,
                        username: 'monalisa',
                        display_name: 'Mona Lisa',
                        profile_pic: 'https://picsum.photos/200',
                        about: 'My name is Mona Lisa!',
                    },
                    liked_by: [2, 3, 5, 6],
                    images: [],
                    content: 'Just finished my first marathon! Such a surreal experience!',
                    replies: [
                        {
                            id: 8,
                            user: {
                                id: 8,
                                username: 'user8',
                                display_name: 'User Eight',
                                profile_pic: 'https://picsum.photos/200',
                                about: 'A marathon runner too!'
                            },
                            liked_by: [1, 9, 10],
                            images: [],
                            content: 'Congrats! How long did it take you?',
                            replies: []
                        }
                    ]
                }
            ]
        };

        res.json(user)
    } catch(error) {
        console.error("Error in getting profile information", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router