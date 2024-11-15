import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const mockUser = {
  _id: "123456789",
  username: "test",
  saved_routes: [
    {
      _id: "route1",
      name: "Test Route",
      stores: [
        {
          _id: "store1",
          name: "Test Store",
          location: "Test Location",
        },
      ],
    },
  ],
};

const mockHashedPassword = "passwordhashed";

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No JWT provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired JWT" });
    }
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  });
};

// verify token route
router.get("/verify-token", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Return mock user data
      res.json(mockUser);
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error });
  }
});

// get all saved routes for a specific user
router.get("/saved-routes", verifyToken, async (req, res) => {
  try {
    console.log("your user id is ", req.userId);
    const userId = req.userId;
    // verify that the requesting user is accessing their own routes
    if (userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to access these routes" });
    }

    const mockData = [
      {
        _id: "67297694144054f225bc618f",
        name: "saved route 1",
        description: "a desc\n",
        stores: [
          {
            paymentOptions: {
              acceptsCashOnly: "false",
              acceptsCreditCards: "true",
              acceptsDebitCards: "true",
              acceptsNFC: "false",
            },
            _id: "ChIJV3Ws9I5ZwokRJX_PJBN3pYI",
            name: "Apple SoHo",
            address: "103 Prince St, New York, NY 10012, USA",
            reviews: [
              "5_I had a wonderful experience here with my in-store pickup of the Apple iPhone 16 pro in dessert gold. The lady that helped me did a great job in ensuring I understood everything that I needed to. She let me know I did not need to go to AT&T to activate my new iPhone, which saved me so much time. She helped me transfer it over from my iPhone 15 pro. I told her I didn’t like the color I selected for the new iPhone and she checked the inventory to see my other options. She even helped me cancel my mail trail-in so that I could trade it in right there and I did. Excellent experience, just one day later I already have the trade-in amount refunded back to my account and I just ordered it yesterday. Excellent experience, I get a new iPhone every year and I never knew my experience could be so seamless._Hak Bén",
              "1_DO NOT GO TO THIS STORE!\n\nWe already knew the items( not iPhone) we wanted that didn’t need any setup and it took an hour to get the items. No one wants to help and I noticed someone who walked in after me getting their item.\n\nGranted it is Launch day for the new iPhone they should hire more people to ensure everyone is served in a timely manner!_M O",
              "5_I was extremely impressed with the customer service at the Apple Store in Soho! Jonathan, Kevin, and Chris P. went above and beyond to make sure I left with a new laptop that was perfect for my needs, and they took the time to help me feel confident navigating the new product. I recommend this store! (I have redacted personal information from the screen in the picture.)_Melissa Hohl",
              "1_Hey, just a heads up, I wouldn't recommend going to this Apple Store for the genius bar or the Apple Store in New York City. Their customer service is not the greatest, to be honest. So, this is my second attempt to come here and get my battery replaced. It's currently at 79%, and the guy there tells me to come back in five days and they'll have the battery in stock. Can you believe it? I really needed it for this weekend, and now I have to wait. They couldn't do anything for me because I didn't know my Apple ID password, which they failed to mention last time. I had to make the whole journey here for nothing. So frustrating, right? And now he tells me to come back in five days and they'll have the battery. It's just a bit of a joke, considering I needed it urgently for the weekend._Jeremiah Stark",
              "5_Nice place to hangout and charge your phone. The staff are very friendly and helpful._Alpha Bah",
            ],
            categories: [
              "category A",
              "category B",
              "category C",
              "category D",
              "category E",
              "category F",
            ],
            priceRange: "Mid-Range",
            description:
              "Apple retail store selling iPhones, iPads & more in sleekly designed spaces.",
            photos: [
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DNCxVGGbxaQHY7Dfky8OwRXz3_mNzex0Nevkl7bWKt_iwsgf_iJmmIr32eBbB9MgzSB_lPYpAsCwx2ZcJ5kTz9IDY0_YFABScPMz22STTYszynGQl8Dk4r3RTvSCnmW87ceGmad0HJSyQQB-JwGavaSc_llFvykVxW_/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DNGd7s1hDLOaQCKEl8kJGl-UFuAbtlRsEcBz5uO2CYP9jyp-O7XIvuPkoRjvYJDIkYPHrx3fuwZMy90BV9Hm_AMqGMCkVZS6VVhOcC9tvdEkBPIzEPJjsN1zqVvX_zTINt1w6l7XGldXpYXGcMGEHW1SbPI7K_JyJNa/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DOoN49IoQWYY5x8RjixVsDF6CEpHkT9NPWyZVrWdTPWd9K6BKMwVSOw87pumkA4Evm6U7UkfXCy7tu4xQ_cvhLGxL-LCSEWsltpZpQUrA5-Soxapn5XMYl5qMJ5wjdI50mDMi5AhLlYY1_dwbF8HKeClmX5c_XnR55b/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DOp_U0LavyhoBFTRrdzJXu4K5EYYwzeEJMBrMmOpH-almO4LsC3cVc_MEzUX7A8oHXzYaoTuJV4jtOmMyT0_fgivR5eTe9De-UU-9FHgyqt-23V_BXSwemYVdn0bq3lRFEQ4ZUavyyeI8DmjSdjHzL3FGrqCE3-snMR/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DPdDNp9cQmgRsC0UOVNVauDtuwNfDEiw473fqfuvPjTGvw-fWEalf4eqEZDZKi4AEeiwUTuKJw9edSumOjJv5iBphQ2G5HOF1lZRpiKfUhYdg5fSuqy7xUrCNxCw9s8GdUjo0wvq0QsIhU1aYfJyfVT7qxGagVhdzSs/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DNnyV60bfU97FJOTs9fKgh2ekW8I39_GtJklnx69vUFefXSs4bPWQB6f2E0cRwfDZs-ejdMbA3BzpjG8eS94qqRJ_67MBYfYGzW9GeAJdmABjDEhjiHalkMh78p7FCYnpQtxijEkrjdk8jm0KQRO20rLdaczMSGh4Ga/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DMrFcEVJXjUQfoBoiKCYNyH8NWKl5EUoHq2z-B9tJoa8Vob79f0ScPgu8WVuCVuqZMmsBGCy-5bRePtQM-9ugAskiWm4GuyO-Ii50Mb6vo6gY3-0nh3G_ty4fuzI06xy1vwfZ56jyUZ1enqKUrI2xRrgbMufyA6sUda/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DM78ImTrY0QUO2838jmvT-9nz-fGhtMnjAcYXwycyjzeoZoL-Jxt-WDIP3pGxVk-aQ2-hdsXizHSeZK7nMb-Tv6taZyvrsxuDK1T_0HEbz2T-Dggu8bZu90Ewj6BtLc3ZlPnV3bzWq7zUZn_bXH1jWSJ30mNuDxYv7P/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DMTJ8NRXv6po_W9XnXPIj8YcPb_QaQjWFLjxrJWG-JsIo42VNAvMtd47GdCahYGR0Ab4COETg3tq3VYH7H5Fffev_B148bi84RLGhncPSHCFpvawsfP-TEoNaxHE5ie8IIDGm3ZI-41qsQaOzwxdbYG6rGw7wcgtoaz/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJV3Ws9I5ZwokRJX_PJBN3pYI/photos/AdCG2DOYoDkTarKvRx4uEZ5uo0qADG8eQG8jkRjVO0Y-OUiiH0eHnwosBQiRQ5O4rrBex5AwFD6ar_WS_3aqEU3gUeHnF6eBfmbB1lzd5gB417Ht5nCAR-6Un3LoQL9EpPK727N544lu04d7ztpdkXp8H8KhBi7MLvTKjqM/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
            ],
            brand: "some brand",
            rating: 4.2,
            googleMapsURI:
              "https://maps.google.com/?cid=9414061520193552165&hl=en-US&source=apiv3",
            phoneNumber: "(212) 226-3126",
            openingHours:
              "Monday: 9:00 AM – 9:00 PM\nTuesday: 9:00 AM – 9:00 PM\nWednesday: 9:00 AM – 9:00 PM\nThursday: 9:00 AM – 9:00 PM\nFriday: 9:00 AM – 9:00 PM\nSaturday: 9:00 AM – 9:00 PM\nSunday: 10:00 AM – 8:00 PM",
            ratingCount: 3802,
            websiteURI: "https://www.apple.com/retail/soho?cid=aos-us-seo-maps",
            lat: 40.72505941202632,
            lng: -73.99902999401093,
            __v: 0,
          },
        ],
        created_by: "test",
        __v: 0,
      },
      {
        _id: "672976f4144054f225bc6197",
        name: "saved route 2",
        description:
          "loren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ipsumloren ip",
        stores: [
          {
            paymentOptions: {
              acceptsCashOnly: "false",
              acceptsCreditCards: "true",
              acceptsDebitCards: "true",
              acceptsNFC: "false",
            },
            _id: "ChIJxzJcc4xZwokRCosButOyGl8",
            name: "Polo Ralph Lauren",
            address: "109 Prince St, New York, NY 10012, USA",
            reviews: [
              "5_The store at Broadway/spring street is gorgeous especially the Men's section in the basement.\nSuch a great vibe and Isaac helped me out with the sizing as well as honouring the price for a Gingham Oxford I found on an old ticket.\nWould definitely go back to the store for any Ralph Lauren merch I desire. I also appreciate the curbside pick up if you're running behind on gifts.\n\nI just wish, they offered some of that luscious Ralph's coffee in-store so one can spend more time in buying styles that associates recommend._G S",
              "2_I ordered a handbag for pickup and had an experience at this store very similar to what I experience picking up groceries from target. In a nearly empty store, I had to approach three different employees to get assistance picking up, they made me go downstairs for seemingly no reason, and when I finally received my order they handed me a shopping bag with my order details stapled to the bag with my name handwritten in sharpie. The bag itself seemed to be taken directly out of the back stock room and thrown into the shopping bag upon my arrival. This came as a surprise given the brand’s reputation- I was expecting more care taken with both the packaging and the service. I love the bag but my experience took away from the purchase._Kat Shumaker",
              "5_Ralph Lauren is one of my favorite brands and I always had a great experience in their boutiques. A few days ago and visited the store on Soho and it made my day.\nSales associate Broke, literally went above and beyond to help me with my request, which I really appreciate! Impeccable service beautiful store, great selection. What more can you wish!_Ksenia Dalko",
              "5_2024 10 21\n\nThe guy infront of the door was so kind. We tried to buy a bottle of water and he told us that they had water inside. unfortunately they didn't have the fit size for us so we couldn't buy it but the guy was so kind. He asked if we needed more water and he gave us 3 evians. He left a great impression on us. THANKS AGAIN!!👍👍_이상구",
              "3_It’s iconic hence you may visit once. Else very limited collection and no deals._Debasish Mishra",
            ],
            categories: [
              "category A",
              "category B",
              "category C",
              "category D",
              "category E",
              "category F",
            ],
            priceRange: "Mid-Range",
            description:
              "Retail chain selling a range of grocery items, meat & dairy.",
            photos: [
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DPGnklRoNPWG1R8GH461f2TUmpFehQ_1EDo9qkf079sK7XrgNbjAs8Ovw5QSLENFrl6MkNtW865nzDBzD2PZNtyVT8Ge-hAqlf1tSlgVUnr5fVJt3iHI4aukHtKHZrxQBXOmOYvpYzsRsNcjxZ8ItfYS2SfK0h4mkpS/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DP7D5dgmVaufU7bOF9TgmtQyvVlby11N_dR6lt1juvxVqrXisNVPBdoTLPJmmekS1ufqPJYz7MMzQkyJ93PEoKkYji5UlHKAnj3V8Sj8GzqCPztkuKBdjwBZBruIa1Z4po2EbVrBJmuNAXFPCsuLRnBOE27zazaXDc2/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DM-guvE-QRySXU_XJnRH9uDLktxPMqLUzC4XUDCf0r4zvMMGswCsaDNnt0Iuv6pOjvr2Sl1m3UuCFNs2uFINy626MUYo3iboTLnG5mJ8ab9hvHm4xxGPdaiADIZnUeIwDQWUFBjtgShVZKUjENX_iL6AbJErkrpHgCY/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DNsr5ty7CPP_Pct6AZCtuB8qew5oGPzqqM-LHPNeVLKvlpXP9nI6ENZrqOnsKvEoHQC_4syHd0XDbg8HYRAZoVs_2oPgANNI86AwXuiyBv1XS4TW91HLm7uZG9VO8v4m2Sb2eTde1BeIT-WuTqF7UksqekBH8GeGIuS/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DNpcg1G9IJ1J45Oc8GNgZyGCYdJMJNdNX0e1DN1tEexmSGpERXQtDCqvCvsehG73_lT8KU6M7YJ0uArD4JFb8CmgYARZYJTaXauXujBemIRakrmWuwgtKbi1u5HTlraBKtFwmTGx5ZB0Gl42hhxDT39lIAF9GBuEkvM/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DOoWv-TJYbQtMkk37FFxqGovZG4_mVQXtSELnc3KmwS7APocgQIhHmES0w-bR9Sl0_0NEhxu4rxtOGVrRDf0591aL1R3tQaqIq1mKFQhkha8HJBf3rrEGJVQbQEwNFOVNg_Mj2wfHxMnfRwFhhBjAWdFzrh1N9Hr58u/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DOECyYwIhpmyBWucwEe6COG8fLX2-n4K1DPNG_Yfy1gM8EkHT6wRR8NswVZsPyd6p0CaXiCEt2NQMSNWEPatx8WDyZufjiwZtN5bjKc58-dqp8BCM9agFpYs4awcR1sP_RAoeVvze___WZksKOSFy3miQXaU9lisB-T/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DMWWvhWr9IRlKiYdSVJHWWzcV952SZcGvMYHwulWNxIrT045xl9FSTdJMMuXCZDOPEmIzIhvJ6pFnFRLTKk4a8-k1Ccmis4FwJfpL07ekb3BSZuYXe7NymEyRbWRotvAzb0ietTZnteU0uM33FeMMnAgIS7a5tqJdAw/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DPIzTYKdZoeMpagXIq5lv9B6cnLug7oKiEHz_CBkJrUUrzlNKl1AkOfzimHgVjD4mDP_XdHkkdFCff7EJA73ssuGmoDHcnCGTR9d198Q7pblQf-UriFpogE_H-OkRZE_6Jxgim6uQ1GZXd-HVP4RFO97P31uO1VSXHr/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
              "https://places.googleapis.com/v1/places/ChIJxzJcc4xZwokRCosButOyGl8/photos/AdCG2DMhbYo8mIEXOnHbC2E7f5WoVIRvwEqlvY4DRpce98I5xhnN3L_tBDOfZWDqL9YsfHNhNB7q3G_E7UYPAAmS7Xa_OXf0kHM9WWFag36ab4JkYjWoHl0viO1_b8cgeMDgcG62-GLpT-jlK5tnrIkzDDMs--6RfFLMBxA9/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
            ],
            brand: "some brand",
            rating: 4.2,
            googleMapsURI:
              "https://maps.google.com/?cid=6852986405426137866&hl=en-US&source=apiv3",
            phoneNumber: "(212) 625-1660",
            openingHours:
              "Monday: 11:00 AM – 7:00 PM\nTuesday: 11:00 AM – 7:00 PM\nWednesday: 11:00 AM – 7:00 PM\nThursday: 11:00 AM – 7:00 PM\nFriday: 11:00 AM – 7:00 PM\nSaturday: 11:00 AM – 7:00 PM\nSunday: 11:00 AM – 6:00 PM",
            ratingCount: 433,
            websiteURI:
              "https://www.ralphlauren.com/Stores-Details?StoreID=8035&y_source=1_ODYwNDcxNS03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
            lat: 40.725148851187306,
            lng: -73.99937331676483,
            __v: 0,
          },
        ],
        created_by: "test",
        __v: 0,
      },
    ];

    return res.json(mockData);

    // const user = await User.findById(userId).populate({
    //   path: "saved_routes",
    //   populate: {
    //     path: "stores",
    //   },
    // });

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved routes", error });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // "username already exists" check
    if (username === "existinguser") {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create and sign JWT
    const token = jwt.sign(
      { userId: "new123", username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // only need to return username. Client will call verifyToken to get full user object
    res.status(201).json({ token, username });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mock authentication
    // if (username !== "testuser" || password !== "testpassword") {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // Create and sign JWT. Store only userId and username
    const token = jwt.sign(
      { userId: mockUser._id, username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // only need to return username. Client will call verifyToken to get full user object
    res.json({ token, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

export default router;
