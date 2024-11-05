const posts = [
    {
        "id": 1,
        "title": "The Secret to Bikini Bottom’s Best Burgers",
        "content": "Have you ever tasted something so good that it’s impossible to forget? That’s what happens every time someone takes a bite of a Krabby Patty! As a proud fry cook at the Krusty Krab, I make sure every patty is perfect. But the secret isn’t just in the formula—it’s in the love I put into making each one. Join me on a journey through the history of the Krusty Krab and learn what makes Bikini Bottom’s favorite burger so special!",
        "author_id": 1,
        "date": "2024-10-01T10:00:00Z",
        "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitRww8FlCpl27v10IFm74j1DRLTmmo-kkoY8Pck-Y_wJq9J2Dry2omp7LoVLYvOETjklWn5Ooset8SvPuYuzqouZ2qLqx4lmMTyeSs3yLA_a7zmZVbCoRTFlHGw8HnNA6_-b83nkSYdybEVtIMN6lZGtmMg1D8niprwi5LJ_VkAzTONKmCfQU8/w1200-h630-p-k-no-nu/krabby-patty-d3bpdiefjjgf5cxvvcnjomm45m.jpg",
        "comments": []
    },
    {
        "id": 2,
        "title": "Living Under a Rock: My Guide to Total Relaxation",
        "content": "Yo, it’s Patrick here, and if there’s one thing I know how to do, it’s how to relax. Living under a rock might sound boring to some, but for me, it’s paradise! Whether I’m taking a nap, eating a Krabby Patty, or hanging out with SpongeBob, I know how to make the most of life. In this post, I’ll share my top tips for doing absolutely nothing and why sometimes that’s all you really need!",
        "author_id": 2,
        "date": "2024-10-02T12:00:00Z",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3k5q9ffSHO2dtbcKRczQ1ETOeF5XK2-MeyA&s",
        "comments": []
    },
    {
        "id": 3,
        "title": "Why the Arts Are More Important Than You Think",
        "content": "Squidward Tentacles here, your resident artist and musical connoisseur. While my talents are often underappreciated in Bikini Bottom, I know the importance of fine arts. In this post, I’ll take you through my journey as a clarinet player and a sculptor, explaining why creativity is vital in this sea of mediocrity. Whether it's music or modern art, expressing yourself through art can make life bearable, even when you live next to SpongeBob.",
        "author_id": 3,
        "date": "2024-10-03T14:00:00Z",
        "imageUrl": "https://pbs.twimg.com/media/Eqgm8y7UYAARKaD.jpg",
        "comments": []
    },
    {
        "id": 4,
        "title": "Balancing Science and Karate: A Squirrel’s Secret",
        "content": "Howdy y’all! It’s Sandy Cheeks, and let me tell you, being a scientist and a karate master takes some serious dedication. But I wouldn’t have it any other way. In this post, I’ll show you how I balance my passion for karate with my love of science and invention. Whether I’m building a new contraption or practicing my kicks, I always give it 110%! Stick around, and I’ll share some tips on how to stay focused while juggling multiple interests.",
        "author_id": 4,
        "date": "2024-10-04T16:00:00Z",
        "imageUrl": "https://media.themoviedb.org/t/p/w500_and_h282_face/ltYy1M2FP469UTJz0H8WV00xhu7.jpg",
        "comments": []
    },
    {
        "id": 5,
        "title": "The Krusty Krab Formula for Business Success",
        "content": "Ahoy there, Eugene Krabs here! I may be best known for my love of money, but behind every dollar, there’s a well-run business. The Krusty Krab didn’t become the finest eatery in Bikini Bottom by accident. In this post, I’m going to share my top business tips that helped me build the Krusty Krab empire, from keeping overhead costs low to ensuring customer satisfaction (with a side of profit!). So if you’re looking to make your first million, this is the place to start.",
        "author_id": 5,
        "date": "2024-10-05T09:00:00Z",
        "imageUrl": "https://betches.s3.amazonaws.com/app/uploads/2024/08/30105821/krabbypatty_secretrecipe.jpg",
        "comments": []
    },
    {
        "id": 6,
        "title": "My Plan to Steal the Krabby Patty Formula: An Inside Look",
        "content": "Greetings, Bikini Bottom! It’s me, Sheldon J. Plankton, and today I’m giving you a rare glimpse into my brilliant mind. For years, I’ve been scheming to get my hands on the Krabby Patty secret formula, and though I haven’t succeeded yet, I’m closer than ever! In this post, I’ll share the genius strategies I’ve developed and why Mr. Krabs is no match for my intellect. One day soon, the Chum Bucket will reign supreme, and you’ll all be thanking me for it!",
        "author_id": 6,
        "date": "2024-10-06T11:00:00Z",
        "imageUrl": "https://i.redd.it/1a1149s7lm6d1.jpeg",
        "comments": []
    },
    {
        "id": 7,
        "title": "Jellyfishing with SpongeBob: My Best Tips for Beginners",
        "content": "Hiya! SpongeBob here to tell you all about my favorite hobby: jellyfishing! Jellyfishing isn’t just a sport, it’s a way of life! Whether you’re catching jellyfish for the first time or you’ve been doing it for years, there’s always something new to learn. In this post, I’ll walk you through the basics, from choosing the right net to knowing when and where to fish for the best jellies. Let’s head to Jellyfish Fields and have some fun!",
        "author_id": 1,
        "date": "2024-10-07T13:00:00Z",
        "imageUrl": "https://preview.redd.it/is-it-just-me-tripping-that-the-jellyfish-in-the-new-map-v0-zylpw7q7tina1.jpg?width=640&crop=smart&auto=webp&s=a91c373ce98075478f922f1c8b38068c336f4541",
        "comments": []
    },
    {
        "id": 8,
        "title": "The True Story Behind the Chum Bucket",
        "content": "It’s Plankton again, and today I’m here to set the record straight. The Chum Bucket isn’t just some second-rate fast food joint—it’s the future of dining! Sure, we’ve had some, uh, setbacks, but Karen and I are working on the perfect formula to win over the hearts (and stomachs) of Bikini Bottom. In this post, I’ll tell you why the Chum Bucket is a true underdog and how we plan to take over the restaurant industry once and for all.",
        "author_id": 6,
        "date": "2024-10-08T15:00:00Z",
        "imageUrl": "https://steamuserimages-a.akamaihd.net/ugc/842586571508607901/38EB52F10F9936E3C4E23C0E5FCF5D6338094245/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        "comments": []
    },
    {
        "id": 9,
        "title": "Krusty Krab vs. Chum Bucket: The Battle for Bikini Bottom",
        "content": "Ahoy! Mr. Krabs here, and today I’m going to tell ye all about the greatest rivalry in Bikini Bottom—the Krusty Krab versus the Chum Bucket. It’s no contest, really, but ol’ Plankton has been trying to compete with me for years. In this post, I’ll break down the differences between our restaurants, why the Krusty Krab will always come out on top, and what keeps my customers coming back for more Krabby Patties.",
        "author_id": 5,
        "date": "2024-10-09T17:00:00Z",
        "imageUrl": "https://cdn-0001.qstv.on.epicgames.com/uNhdoawRTYuhlbWoUQ/image/landscape_comp.jpeg",
        "comments": []
    },
    {
        "id": 10,
        "title": "Welcome to My Underwater Dome: A Glimpse into High-Tech Living",
        "content": "Howdy y’all, Sandy Cheeks here! Today, I’m inviting you into my underwater dome for an exclusive tour. As a scientist, I need the best equipment, and my dome is packed with gadgets that keep me safe and comfortable under the sea. From my oxygen system to my state-of-the-art lab, living underwater is a lot more than just a big ol’ fish tank. In this post, I’ll share the secrets behind my high-tech home and how I stay connected to my Texas roots.",
        "author_id": 4,
        "date": "2024-10-10T19:00:00Z",
        "imageUrl": "https://i.redd.it/sandy-cheeks-room-v0-s8facc0sfrqc1.jpg?width=500&format=pjpg&auto=webp&s=36a774be367cbc0069e08e63dff8f5244a1e4d07",
        "comments": []
    },
    {
        "id": 11,
        "title": "Texas vs. Bikini Bottom: A Scientist’s Perspective",
        "content": "Howdy again, y’all! Sandy Cheeks here, ready to dive into a comparison between my beloved Texas and our quirky underwater home of Bikini Bottom. While I love my scientific pursuits under the sea, nothing beats the wide-open spaces and fresh air of Texas. You might remember my song about missing home—it's a little ditty that always brings back sweet memories of my ranch! In this post, I’ll explore how the unique challenges of living underwater inspire my inventions and research, all while keeping my Texas roots close to my heart.",
        "author_id": 4,
        "date": "2024-10-17T19:00:00Z",
        "imageUrl": "https://i.ytimg.com/vi/Tt7_Qao0TCw/hqdefault.jpg",
        "comments": []
    }    
]

module.exports = posts
