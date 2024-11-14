// routes/storesRoutes.js
import express from "express";

const router = express.Router(); 

const stores = [  
    {
      paymentOptions: {
        acceptsCashOnly: "false",
        acceptsCreditCards: "true",
        acceptsDebitCards: "true",
        acceptsNFC: "false",
      },
      _id: "ChIJ00Ji245ZwokRAOgx_6mR4ko",
      name: "UNIQLO Soho Store",
      address: "546 Broadway, New York, NY 10012, USA",
      reviews: [
        "5_More than a year ago I bought a pair of sports bras and to this day they are still in good condition, they have not even lost their elasticity. So I can say that the quality is worth it for its cost. This time I went again but they were already sold out , anyway I took a walk through anime clothes and Japanese products (Comics, Shirts, Toys, Figures, etc)_Rebecca Zhang",
        "2_Went to this Uniqlo to do custom embroidering for a bag.\nFirst, they were taking too long and the employees had no idea what they were doing.\nThe cat we chose was supposed to be further left but they first said they can put it as far as the machine template goes but then another employee came and said they are actually not supposed to do it on the pocket side and told us if we want to redo it or something.\nWe were frustrated because they weren't done with our embroidering for literally 5 hours.\nWe were frustrated and we just took the messed up one. They need better training and keep their word on what they can and can't do. I will never go back to this one to do anything custom. The cat one was not stretched out enough so it also came out all wrinkled too.\nAlso, the flower center is two different colors..._chelhyun moore",
        "5_Nice, big multi-floor location of the Japanese clothing brand. Plenty of selection and despite how busy it was, checkout was quick and easy. Staff by the door were quite friendly._A.L.",
        "5_Amazing huge store, self check out was a little in the future 😂 stacked on the kaws collection_Sam B",
        "5_Probably the best store on SoHo in terms of fashionable but affordable clothing. Especially if you want collaborations with local NY artists like Keith Haring and Basquiat. Their self checkout system is pretty futuristic too_David Low",
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
        "Clothing retailer producing a collection of casualwear & accessories for men & women.",
      photos: [
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DNqwt3qKACbFXmAL6Eb7SG79CLeYMuAXBah0atvLPfLcS4-WnrimgkPzQOUwm5qPiQFuKorUrRzfDH5I21navv6JJ6NZKaIv9MLGoCBO1AEI3qNVvC4n9ftYbHLpq2BmtbGDEngBNYNjrfb70vOVcJOj0fkEi_1HSKx/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DMFgqQQv8xklS3pXhNkouIt29_OiL4RGCs-SAdIXst6i6k94x_5QferyIOjoXlV9kA3u0_fyaeL-L28INDlhgkQFKz-mY74p4tHdxOoaLZcmL-TCUdSuatinnVs78KfZTpxoiN_WGS3pj09Ci7Aan6rLzqBCzNOk859/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DPB3PgAuEVREMZ5pSxQqby0KuqY03PK-MryDjLDCnV3uiSPFGH9UFGwmn7eSfkzNLf2jKBnzYBX9B0PGBDynIoA3A7l_eq5jH4MmMZLNhfWuFNqhQqTmYYUqixRoeieU9pDpC92dWI2mBEoWQPpmLavEokMlJrT97ma/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DPvOTEYW7zrodGUWAbyWs-SWJ8YZJJ8OioCKQghIgBDVyMgjDdAMvx5UhG747QG83P0sium4cZTQGStr-26sG1XGdSZfg5oz4eVUv2mWsnpjbQLYkGXNwfy1mR0ae_09L3l9mxuuTPaIZBaybtzjZ2BV8TvNwAF0bvL/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DMZBSCyIZlMjqYsKy7-3QLG3GJHwwO-opmj1RIRiStVMJzmka5nWdMrMQWL_fJv60w9tbzX-V2X6hzDlEUzcKZbwWP3JPQ6VslG6MqlYt3P3OWJlBEMSeRzuNW6h_YfmVW4DDqu3PpXtrbfZvj9tlx0H-lTgU88oe7j/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DOFYHv7eAeU-LhPmTwBrbIVBAFyEdNsaIPA0zx234SMUqzBpTNy9n-7BaIIuJTVDnIbFa5iC2oFq2pYCPtYQjuVz6ptszaifYMzv6LqcHJJpIprnDmUaHGRePJSMpKoSCQ_tJ-2s6vuvb_VDi03T4GC1LzH_KU4o0Uz/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DPlRXeE0L410iXYsU3vHjd2RU5EMUa0xf6koq1LdUqe8eZsttwJZZR9aEEj7PWn-BRdTbQVFNWGf_OL1wBwc22DKU6ChQIsOc2rXIlN-r8ZpGIB4s3gZd2PN9N-cK2fpNI8gsCTk_hmmfuV72LYhTeMLoofSJyeRadC/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DNb2yplNC5wjhS3dWAgRi2Jnf95esgNJa1aqqmyTc2ko0k4jxQ6u4vhvxZGTwAqtnBSvw3xI3Co8H_n0HRGt0XBNIT8w6F9yqygbO3V-7dbsCqttFqdwymueXCQ9lweIyqtLstHyiB_ojs8AY9GF-d2KulTnf-S-_M4/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DNuumV1z8yCnwXeV5yXhCDLoEj4eKQpEU-ra8rgqofdTzbuDhjKgV5uDjCWZmB8LM4jdS4VEPen5HWOm588GXlKJgQNWOt9EQrkh5zniDfTl8RnyFJOLfp2CYfjncut9q2gNRern0kxjjBMudbGqqZKXCIqQhCqi1jZ/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ00Ji245ZwokRAOgx_6mR4ko/photos/AdCG2DMrZwmnOOUryknt_oO2jwaWR5hAMj867NK_Ob_xh03e6JXMfVkeYTdBO-H4IfiQ_DJ23zNz-9Fep6eAtLgye3WsTAbeNzX7Q178v22Vxc9io32QXXp2bfRSkK-1uNgrrCRbGlihAMK7j8Hafw9fqfTpB_GitiGGkVw-/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
      ],
      brand: "some brand",
      rating: 4.4,
      googleMapsURI:
        "https://maps.google.com/?cid=5396035462860236800&hl=en-US&source=apiv3",
      phoneNumber: "(855) 486-4756",
      openingHours:
        "Monday: 11:00 AM – 8:00 PM\nTuesday: 11:00 AM – 8:00 PM\nWednesday: 11:00 AM – 8:00 PM\nThursday: 11:00 AM – 8:00 PM\nFriday: 11:00 AM – 8:00 PM\nSaturday: 11:00 AM – 8:00 PM\nSunday: 11:00 AM – 8:00 PM",
      ratingCount: 4824,
      websiteURI: "https://www.uniqlo.com/us/en/",
      lat: 40.72350233828196,
      lng: -73.99820387363434,
    },
    {
      paymentOptions: {
        acceptsCashOnly: "false",
        acceptsCreditCards: "true",
        acceptsDebitCards: "true",
        acceptsNFC: "false",
      },
      _id: "ChIJs6h83Y5ZwokRyRKAt5TlLd0",
      name: "SEPHORA",
      address: "557 Broadway, New York, NY 10012, USA",
      reviews: [
        "5_I got a custom makeover at this location this past weekend for my Masquerade themed birthday party. Bianca was amazing - I loved her care, energy, and spirit. Her colleague Melanie was great too. Thank you again for making me look amazing! I ended up having an amazing time at my party. You both were right :)_Support Women DJs",
        "2_Not my favorite location unfortunately. If you place an online order for quick pick up they make you stand in line with everyone else who hasn’t placed an online order.\nOther unfortunate thing is that your confirmation email says “your order will be ready in 120 hours.” Which means it will be ready in five days. Other locations your order is usually ready in an hour.\nI just ended up canceling my item_Sebastian Sandoval",
        "5_Everyone was great ! Went in on 10/25/2024 8 and guy at the door was great ! And Leslie the cashier was sooo sweet !! 🤍 came in my scrubs and she noticed I work in health care ! Good eye ! I will be back here to shop !_Daniella Salas",
        "3_Oh wow, be prepared for crowds and a wait in line (which luckily moved fast for me). Every time I visit this place, it is extremely crowded and I find the other customers are a bit clueless on making room for others to pass by (not to fault the store). It's not the most comfortable shopping experience, but the store is clean, well organized and stock, and plenty of educated staff to help with recos!_Connie Kwok",
        "1_I was not sure what kind of treatment was that towards me but when I came to the register and I’ve asked a question to a person by the counter, she laughed at me for no reason. I’ve asked the question about the payment and I was not sure if she laughed of my accent (since she’s asked me to repeat the question three times) or something else, but then she told this to the person nearby who was by the counter as well and they made fun of me together. I better off ordering online than dealing with this “humiliation” made of me, so I’m not coming back, even though it used to be my favorite  Sephora store._Anastasiia Karavaeva",
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
        "Retail chain with a selection of upmarket makeup, perfumes, beauty & skincare products.",
      photos: [
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DM-K7--VxUUEKU-Hg3FkSH1rxsIb28R0IO3rhEBoj954b0IjOy7BtJEopG-Gfz8PulXZkhVB2pWa9nvsI6QGHdKK1bjOWhj5lIU6e507qaOqeHHB8zQan22RoupNVn-_-Xa1tyEf991-0fjuXCXR7LkyOdw1vKCbH6H/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DNoECfPqsFHaMb0Fi0uz-yb2Xpds1sg1u8wuCN72vCBbIA5WDMP_x1SV1QdbX5cq_4zEIgTwbUq-ehe904xRkMX421KNDB7C-iBHKQt8hrQSyE9b3xw3VSJye6KdjOHKAguVk0OPYWAqRC8MskWNYDGmAntNaASSwvW/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DPas_OFs21zcthJOlXFZt89y3tbqPqyn2BLH8ZTMTxIQB9ZyjPNASelO51iX86bbOs93n2wg0Qc1JCBOi0SC9aYD6Khm6PYyF2-d3Zg3ubSqlmh7VJQ-2ePWkeXjkG6IZpeCiHeQZZ-bDImMn5s29W4b4EIXGi4GUUS/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DPYyuoyrCz_Rjx2-u-O0ISuXR6b4RTrVikrjzGVOsGEimmmNnhmcD2kTveNOGtHHn7xaOZwKQnz19v5XrK3kjqBbRJpqJg4Rk4fD_etw9mmiNMFaD1NL65sdFvAWhM4Yst1ge_iB1dC2y_bnneHDbLFj2MXrOZvFC2T/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DMmNsNYzb5t-6b9CGc4o_339CR-JGGnp7NQDM_fPSNUiz1PqAObrQIInSVfc4CgfPRXoNsiYGKZ3Ol4l3YIRA6uH9wvBCSfaZumT27Ax5Nfj1FCzos3Y_SvbRgFfrCn6cLYjiAiWBC2HrEUB-I2g6hdq5hVMXGsFgaa/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DNKz6VRtPLnDif4C0XWv5lbRsO9js9ew4lvyHEmTpnFevxXoJgNLie3V9s0hQfMfDtrOVbQTe0Gt8Z8Ntx9cDmnniV0fdL4uuJkhLBbL27NKEmpX9IcEx-eX3RZtWW0bOVIsD92rYCyXAIZHaflqFvo_bbZU-48AZVX/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DMMHqT3zfa0ya335saHjvu4zzqQU2HybdCEPmLcNxOq7Iv-ijjLwsMPqJhj5nA7oq6wn_mNAMH2QCopxwWoScFV35neQD5lR-SLuPACKKHuxZDWpXSn_V5L__1SYivYbCvturQ165y0jlsoqrZMJSToPDUtLoSShWWD/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DOeYqkPbPq1rdoM1BV5wl9xCPyIOUxdX8toRqX0va-jBd11mrvz6gP2koZN6n81OObfH3h_CRTtoQbGtWiPLEiRXMDKb_wP8tHDy54QEsi6txWzvKLYxNwCDNTiEBoHn1C9rfyHQtEPpk8oeLyZwlTrfLAcDY1HzKye/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DOsfh1oVW7Z-Uo2copc3sveQEK_BI9-1Sop0LR_2lWptsjZZemIv9Mq5DqvGbFUSNGE36NaYli1GvdDZkAAvB_-YCuHe5OT2_XO5zWguC5ZZW7tyn53_vC3MUcc6mhVgkaHv6AtCjD0LXSxu_UnJQWR8qM5dzilP-tk/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJs6h83Y5ZwokRyRKAt5TlLd0/photos/AdCG2DP7Hl92-fnKgR1OsScZDuvBvdfnhH9ew_tQiR6KNx_on24JGz9p7WYnUt3xhEY3sQ8QrhNpm1Z4TpI1ubbIH76ZGaFMJyXjKMmohQJnfX5Npi77d5S51jIzb2SFjp6WAnme_y7fBmpwa91pMUlwUxHHvAXi3nxQMvJf/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
      ],
      brand: "some brand",
      rating: 4.4,
      googleMapsURI:
        "https://maps.google.com/?cid=15937647083230597833&hl=en-US&source=apiv3",
      phoneNumber: "(212) 625-1309",
      openingHours:
        "Monday: 10:00 AM – 9:00 PM\nTuesday: 10:00 AM – 9:00 PM\nWednesday: 10:00 AM – 9:00 PM\nThursday: 10:00 AM – 9:00 PM\nFriday: 10:00 AM – 9:00 PM\nSaturday: 10:00 AM – 9:00 PM\nSunday: 11:00 AM – 7:00 PM",
      ratingCount: 812,
      websiteURI:
        "https://www.sephora.com/happening/stores/new-york-soho?utm_source=gmb&utm_medium=Yext",
      lat: 40.72393328139748,
      lng: -73.99832725524902,
    },
    {
      _id: "ChIJ91PrfvFZwokRbjO1KulODIQ",
      name: "Abercrombie & Fitch",
      address: "547 Broadway, New York, NY 10012, USA",
      reviews: [
        "5_Went today around 12pm. The girl near the door was really nice. The cashier was super kind too. Huge selection of clothes. Only thing I didn’t like was the amount of fitting room. There was only a couple available and I ended up waiting 10-15 min.      They have the popover hoodie available at the back but there’s only a few colors. Those are so comfy. Mainly large and XL size._lxy",
        "5_The staff is incredibly friendly and always ready to assist with any questions or needs. Their helpfulness and positive attitude make the shopping experience enjoyable! However, the location is quite popular and often crowded with New York shoppers. There can be a long wait for the fitting rooms, but overall, the experience remains pleasant and satisfying!_Angela Khan",
        "1_Not a pleasant shopping experience. Ive been in this store super busy and super empty and the staff are the same.\n\nSuper small inventory - but will disagree with other reviewers in terms of sizing available. All jeans below size 27 were seemingly out of stock but lots of piles of 30-34 sitting out.\n\nBut the staff are unhelpful—like 8 of them running around folding things but very few helping with finding in stock items. The associates there don’t even seem to know the product line well (i.e. not distinguishing between regular and curve love jeans, not knowing the inseam of the Short, Regular, Long lengths, etc). The fitting room line is abysmal. The main reason people still shop in person is to try on  things, but you’ll wait 30 minutes to get in one of the 4 fitting rooms they have.\n\nThe jeans I wanted werent in stock and though I insisted I could go home and order them online, they had me order them in store for free delivery and I get home only to find out they selected the wrong color for me :( And by then when I tried to fix it, it was “too late” and I’d have to pay a return shipping fee or go back in person to return the wrong colored item that was ordered for me. Suuuuch a headache honestly im okay with the death of brick and mortar retail after how absolutely inconvenient this shopping experience has become._Jasmin",
        "1_This company is a crook. 😔\nI’ve been a loyal customer for over a year. Spending thousands with the company. I mainly purchase from their online store, and had no issues with getting packages delivered, until recently.\n\nI had a package go missing. They use a weird tracking courier service called “OnTrac” which I have never heard of before. For a large corporation like Abercrombie’s, wouldn’t they use a reputable shipper like Fedex, UPS, USPS, etc??? Anyway…. I did my job which was to track the package and notify Abercrombie of a missing package in a timely manner. They are refusing to reimburse, or redeliver, and told me to take it up with OnTrac.\n\nOnTrac is also giving me the run around and telling me to take it up with Abercrombie. What AWFUL business practice. To a loyal client who has spent thousands and never complains?\n\nSo sad that I will have to stop shopping here because the company has unfairly stolen my money. I’ll be pulling out my stocks from this company too. I can’t support a huge retailer who takes advantage of their clients.😔\n\nEdit:\nBy the way, if anyone is wondering. I ship all my packages to my business address. The safest address I can think to send it to because I don’t have neighbors. Just a front desk that I PERSONALLY manage. So the package can, and only would have to be, delivered INSIDE my business when doors are open, directly to ME!\n\nI feel bad for the employees because they’ve been nothing but sweet to me in store. It never feels good to see bad reviews of your employer.\n\nAbercrombie has a rep for having been a huge corporate bully for years. Even after their re-brand, looks like they still are a huge bully.\n\nI recommend shoppers go to GAP, Banana Republic, Madwell. The clothes are cuter and the fabrics are better._Nicole P",
        "1_Really crummy feeling experience. I had to hunt for anything in a L or XL among 10+ each of sizes XS, S, M. The fitting room line is perpetually wrapped around the store. I asked to speak to the manager about the lack of sizes available. She didn’t offer any explanation, didn’t try to make any of it better or right, but instead told me I could fill out a survey online. I get some things aren’t within anyone’s control but at least be compassionate? Kind of… sucks._Rebecca Enis",
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
        "American fashion brand known for its trendy & collegiate-inspired casualwear & accessories.",
      photos: [
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DP_HjWgb814_8ZFqY6XvBiVXx7fCJp82SLiKgTDCjxV4kKD7FAycwjTqpNDntv9Nbrii6hC_dVk2OMrgV_EEDpise4_wxJgxG2rrs7cnK1jChuXn0SqrNSZuqRJtXRAIWIpNCn5v4pkwJ6IDtvEKLj45BEpPHZ5KB4p/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DPlMqFxkArYXc-zcsWl-yanCIzT4XPeFx1rHsHnUW6CTkR2Ak1vD4iWh_T-uy1AycmsStx5MsCC63m7QSahnPeDfU-MFZoeEQRNqWKypogho8t8Pf1IocZeDfrfj-NDEVQKVsjmXDnByMJMyYRwSkzWmUvgFad-0wF5/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DM4Qq6NtoUWbDcEjR4AIswtDwKr71nhkkI7VMROQgezZGi34pne30Zh6uAHAQ1pTWh7kI9Vqh6UaBl1VflNgxmsFEsN95bNYZu7xA59vmgrZJDa4q2DjUQYTBs-9HikkGR8yCu2lUd3qpwsCqi6a4o7e9FBNWPYYwZI/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DOob7pFgp8fEcD2h63-4j6wt7uUGGJtwKcuU9Dify8--tq3T6yanxPZqwj5qZBA6s62Cgr4ngLmOfwK0FqYJwF8R6KCFWcLRBOGpK72FF26xyx-ZPsZcLEgBX49yTgNEMl6CiXvi_o6Z6I3gBYsGAgEiGpihZ9nfvLV/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DM9JRiOD1JJIkGwSxs_R4lCIuAjB-vICl7MbYfowFT1uM8RHRSxjlYZJlvN44pMKrfOviOxpa7V7F4D0qNTnTNTAYGB_fruK8chL3TMYrft9Wof05c3LmPCiy5U7Akznd-pe6UbQQXOHmuMhL40ZUCY0Kk7RIpvUz00/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DNxg3i4mK6bGZag35z04nCHb5pCxDgGuN74IsRvdelNFCjUznczIl_XF2qXFVhRBhSIxNI3skLJOwoWGAkye_XSPZunOHFCkZuGCsQRWLERcXK9KjGJqk-0IF88rv7ebcO64h9GjDNlR305Y4b42lYSnt48XZ-iRjuJ/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ91PrfvFZwokRbjO1KulODIQ/photos/AdCG2DPF8c3hlBGl3hN3hTwVOUin1qSTF-Iw0c7HeSCxKDfK--gd69pPE5s4UzQWHA0rBCZdamNBBy86dImkO8b2PSXj57dYsPd02ncTi5tLBfIOmc-F57DSmW6c5ibnoPHAZTMOlDBKq4QjGYDy07eJVHYGJLxeSU6LURLF/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
      ],
      brand: "some brand",
      rating: 3.1,
      googleMapsURI:
        "https://maps.google.com/?cid=9515066876077880174&hl=en-US&source=apiv3",
      phoneNumber: "(212) 381-1387",
      paymentOptions: {
        acceptsCashOnly: "false",
        acceptsCreditCards: "true",
        acceptsDebitCards: "false",
        acceptsNFC: "false",
      },
      openingHours:
        "Monday: 10:00 AM – 8:00 PM\nTuesday: 10:00 AM – 8:00 PM\nWednesday: 10:00 AM – 8:00 PM\nThursday: 10:00 AM – 8:00 PM\nFriday: 10:00 AM – 8:00 PM\nSaturday: 10:00 AM – 8:00 PM\nSunday: 10:00 AM – 8:00 PM",
      ratingCount: 39,
      websiteURI:
        "https://www.abercrombie.com/shop/us/clothing-stores/US/NewYork/NY/11925",
      lat: 40.723819447638135,
      lng: -73.9988261461258,
    },
    {
      _id: "ChIJQTBJX45ZwokROu2XW-UK9bY",
      name: "Meermin Shoes - NYC SoHo",
      address: "123 Mercer St, New York, NY 10012, USA",
      reviews: [
        "2_I was in the market for a pair of black penny loafers and purchased a pair from meermin after visiting this store. The in store folks were very courteous and pleasant but ended up advising me very poorly to buy a pair that was too small for me and then the shoe itself and all subsequent interaction with online support was a disaster. (There is another review here posted by Gabriel A. one month before mine that reflects an identical experience being advised to purchase the wrong size loafer with the false promise that “they will stretch out over time”).\n\nRegarding the shoes: all meermin lasts fall on the narrow side in the toe box area, their loafers are no exception, it is not advisable to consider meermin shoes unless you have properly narrow feet as a man. The loafers I got, other than being small and narrow on my feet, are the most uncomfortable shoes I have owned. I own multiple goodyear welted shoes that are not half as stiff in the sole or in the leather, and that are not so painful to stand and walk in. $215 seems like a great deal on goodyear welted shoes, but it’s just money wasted if the shoes are so uncomfortable that you can’t stand wearing them. The shoe leather is stiff in all the wrong places and very badly cuts into the back of my heel tendon, caused welts on my pinky toe and heel, and the sole has no flex. The sole also shows significant wear on the toes despite my only having walked in them a sum total of 30 minutes. Finally, I applied soft and then hard wax polishes to the shoes and almost immediately the polish started shedding in spots all over, I think that’s something off with the leather tanning or painting because I have never had that with any other shoe. The Meermin website does not allow reviews on the shoes to be posted and I am guessing because the complaints of narrow lasts and uncomfortable shoes would surface.\n\nRegarding online customer service: They give you strictly 15 days for a refund and that is no coincidence. Any issues that require an exchange (the store staff sold me the wrong pair of shoes initially and I requested an exchange for the correct model) Meermin will charge you $25 shipping, even if they caused the mistake. After the correct pair was finally shipped out to me. I only wore my pair out for the first time more than 15 days after receiving the shoes and found out the shoes absolutely destroy my feet to the point of actually injuring them. Meermin would not help me with an exchange, a return, or even to help pay for a possible shoe stretching to make the shoes usable for me. They only offered generic non-solutions like “wait for the shoes to stretch out” and then blamed me for choosing a wrong size on my first pair of loafers, even though I chose the size based on the advice of their in store employees. They are not a super customer-oriented company, that’s why their return period is 15 days and why they don’t allow reviews to be posted on their website.\n\nThe shoes are narrow, tight, extremely stiff, uncomfortable, and they don’t even take a polish. I will give my pair away to a friend with smaller feet and lower standards most likely.\n\nI think any potential customers would be well advised to go elsewhere for shoes even at the same price point. Thursday boots and Beckett Simonon offer similar products at superior prices (and Beckett Simonon has amazing customer service in my experience with them). Otherwise grab Allen Edmonds on sale or any of the better reputed brands selling goodyear welted shoes._Martuni",
        "1_Unfortunately I have been experiencing the worst customer service experience ever from Meermin Shoes. I ordered a pair of loafers online from their website. The shoes arrived and were a half size too small. So I exchanged them for a half size up. I had to pay $15 dollars for shipping on the exchange. When my ‘new’ exchanged shoes arrived there were defects. I was requested to return this pair for another exchange. Ten days later I received an email from their shipping/billing department that in order for me to receive my exchange I would have to pay another $15 dollars for shipping fees. That would mean that in order to receive the correct size and undamaged I would have to pay $30 above the retail price as listed on their website!\n\nOn top of this, it’s been extremely difficult communicating with their shipping dept. At first they seemed to have a hard time understanding that I’d requested an exchange for my loafers, not a refund! To receive an acknowledgment of this took weeks!I have contacted their only retail location in the USA (Soho NYC) for assistance. All of the salesmen that I interacted with were understanding, courteous and professional. They too seemed bewildered as to what had transpired.\n\nSimply put, dealing with_briteppr62",
        "5_The staff at Meermin was amazing. I don't think I've ever had better in person customer service in my life. They were understanding, kind and really put in the effort to help me and get me the shoes before my deadline. Special thanks to Kyle and Spencer._William Kuckel",
        "5_Very helpful staff that gave recommendations to help me find the right shoes to fit my feet.  The in person sizing can be very different from what is guessed online.  I was helped by Zach and multiple other staff and they were all friendly and willing to answer whatever questions I had._Zach W",
        "5_Had an excellent shopping experience today. Needed to figure out sizing across their whole range of shoes and boots. The sales representative was extremely patient and helpful guided me through their whole collection ensuring I find a pair that fits._Marián Okál",
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
      description: "Retail chain selling a range of grocery items, meat & dairy.",
      photos: [
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DN1TnwS2TWV4s-oINN07ULI2g0Y3TdUnVr1vkSaWb1HQyI8sZY_oqYr0NDELq9Bz63oVPYlD3U8kumnSPjYhoz50RyKAIad1KrCJujLo0RG3jzCj_Ic_IbdeN145pm5TLriSA0x9o4hMgFvH7EG1p6pPq3rhy_h05Wl/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DP0wM57QVkc1aVvP2-pZ221U6KtZr6aOG6ZXrHPLJLGHmGOTo1DHb65UV8KWmd5cJGmKisCTu603hS-UCwjcZNp0q64oZGqyjUrWQ9o66-_iQe9RNn-DHdaLyyzTC7SivEvwxckK6AbWwXl35dI8QyDIacrLvw_aQVy/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DNlAeQs2VWezeC4-BmeGjwWXnY3nvD2F9FTPu-WO4yorUyIHR9Lg63U6p0tYEty6G_Lbe3s5Tup6XLXyzxq97tkZiLppCmdnIffkIPEfODBjPbDxpZb7PEzLZRJY5MrT5SyoV5gtxHGTTITie85gVSto3AZloUe_Xfm/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DNFSgFipNN-3Iqehjug2J3a9HYEWxJhqonsC5XROpC3jWCQg7qYZjC72Tht_ClYB1jteUJZP9mCwgfihM40S9gGwFnX45ddOhrOpHAujDnAU49fLjizhIa007WF7Y4jm-RaAMY4pyUuQEhV_2j8mhxjTaScGRFaKwA/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DMZZcD8VYDHuO2xCmK94fpfjMNKq9YgrmpEcvJi4bgPnIlboyOKtN1cAR0ohk7KfZfQN4aX08ug-0XOOai3XYbxSG8sS2SoqaSPxE8i8SAFcisRr2rKpHsKwJ9ieDxV3o9QHZ7RrGrFDZu-7emI_GUOYocKTlZYeeag/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DODqJIw1BDPnfYKxEy_K9efbyJS--ONoTpC0k9gg2l8FJY361j2nCqUQ4PQgYsBDbLCC0pZGmYoswDUR1Kh4nNl0GfhN9ylsRrpUasKZxWbCAI5YxhQG9SMoYJHtkaZ6E5z4QBZms5tn4b-Ep0ngHCab_L4BPY3wf6X/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DNw9xj7SRdvGN60TEgfAxZ7kuUjzdD4eZX8XMhxCerhPr5SiVrW70B8wk6bOpq_wsWogxLqC26IZZsSQHUHc4-GR3BRO0zBKlw4fP2StVI9p2t1BofnQxOTiypiMzNIV2hBSFS2oO52uGW6Pv0AlWrSK14xLscmCDcK/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DNmtmCJGK4yWvauBt6--A6tec05T_aNWDaCZvK1na63l-anwL0ywRbARtqDx94HGUuEZkVyd8ecrmFwiro4Yx3_2iKS-jz-FnNBvO512dcKqHMtS1eN01V6rtGkPbPiNmAWAKenDkjBqSMe_BQx6fp4ASbKVqQd9cke/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DMu3raCWuUXJASGb-iGZ_VdvwIETLKMwAXusLLSM6hP3AIOP0kGFBs3ijZnKSJMT1vVV0BG2BJVkRGHsV0HY-rwsKvC4qIR2ehB6N41bNgn5yStTamVKiMNWCH3w5JtpkI_1BgjRnTIEzXDCZcl4DAMabPATxkrQIo7/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJQTBJX45ZwokROu2XW-UK9bY/photos/AdCG2DN07T7hXutWlEA_bnSf2R9VsNES4AqJj-LXpu7DiIjjsnmwtZed7pSMpR3Qlyjxnx9bkZQN7-RPJZf_Q2AcXkeSqyP40JJYh-OklHqXpeu1kLpL_Qey59qD0dFoDuAmCrmQ6gaWGYYIqBojD_wIj1IVHPBER4-MCsd-/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
      ],
      brand: "some brand",
      rating: 4.4,
      googleMapsURI:
        "https://maps.google.com/?cid=13183455464397466938&hl=en-US&source=apiv3",
      phoneNumber: "(646) 781-9100",
      paymentOptions: {
        acceptsCashOnly: "false",
        acceptsCreditCards: "true",
        acceptsDebitCards: "true",
        acceptsNFC: "false",
      },
      openingHours:
        "Monday: 11:00 AM – 7:30 PM\nTuesday: 11:00 AM – 7:30 PM\nWednesday: 11:00 AM – 7:30 PM\nThursday: 11:00 AM – 7:30 PM\nFriday: 11:00 AM – 7:30 PM\nSaturday: 11:00 AM – 7:30 PM\nSunday: 12:00 – 6:30 PM",
      ratingCount: 471,
      websiteURI: "https://meermin.com/",
      lat: 40.72417924296265,
      lng: -73.99910777807236,
    },
    {
      paymentOptions: {
        acceptsCashOnly: "false",
        acceptsCreditCards: "true",
        acceptsDebitCards: "true",
        acceptsNFC: "false",
      },
      _id: "ChIJ27Q3yI5ZwokR05rAYR5cieM",
      name: "Nike Soho",
      address: "529 Broadway, New York, NY 10012, USA",
      reviews: [
        "4_The Nike store in SoHo is a fantastic destination for any sports and fitness enthusiast. The multi-level store offers an impressive selection of the latest Nike gear, from sneakers to athletic wear. The layout is sleek and modern, making it easy to navigate and find what you’re looking for. The staff is knowledgeable and helpful, always ready to assist with any questions or recommendations. The store often features cool displays and exclusive merchandise, adding to the shopping experience.\n\nThe only downside is that it can get quite crowded, especially on weekends, which can make the experience feel a bit rushed. However, the overall vibe and selection more than make up for it. If you’re a fan of Nike, this store is definitely worth a visit!_Fazzix Lock",
        "5_I got these customised graphic sweatshirts and looks very cool and i am so happy with the attention for details from Abimael and Diego. The result is absolutely stunning. Beautifully design. Definetly exceptional customer service!!! I wish i could give six stars for the whole experience at this nike store at Soho THE BEST!_Charles P Sidarta",
        "2_The process of ordering online was seamless, however when I got home the shirt I purchased had 2 small holes which seem to appears to have come from anti theft security tag they place onto there items._Right Shakur",
        "1_Went here as a family. Purchased two pairs of shoes. Two jackets. Four pairs of shorts. Nice customer service person at checkout, invited us for a coffee at the front of store. “Cool” we thought, that’s something new. At the coffee stand, we were asked for our receipt. Which we showed. And was initialed to make sure we didn’t abuse the sanctity of the customer coffee rules and return another time for an unearned, ill-gotten brew. Then we were told that one receipt only allows one coffee, even though it was clear that my partner and I had both made purchases and were holding many bags. I showed the guardians of the coffee what we had purchased and were told bluntly: “no, one receipt, one coffee”. Understandable really, because the sacred Nike exclusive brew is said to include some of Lebron James’ tears and stirred with a wooden spoon passed down 6 generations through Phil Knight’s family. After my partner received her small orange tankard of sacred elixir and we exited the store, she took a sip and immediately dunked on the nearest citizen, much like Jordan did to Ewing at Madison Square Garden in ‘91. I then understood why the Nike Coffee (c) was so closely guarded._Sam Ferris",
        "5_The Nike Soho store is a fantastic place to shop! The stylish and spacious setup makes it easy to browse through the latest and greatest in Nike gear. The store’s design is sleek and modern, creating a cool atmosphere that perfectly matches the brand. While the staff was a bit preoccupied either looking cool or chatting with each other, it didn’t take away from the overall experience. The impressive selection and vibe of the store more than make up for it. Definitely worth a visit if you’re in the area!_Da Dude",
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
        "Chain retailer selling a range of Nike athletic footwear, apparel & accessories.",
      photos: [
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DOctg4UMBfXa5tAXq1P2yKP2wU-IpvWM2nEjrz0xU7mQXxk67lSHC9ihtDgfUBaXZemNkz7KFoPTUQvNUbQKCoQTHagjjtCtzaudRBAEVMzvHmHfIRGN9DfwjV8oeFvvO4EUO7OXXGtsFJ56JC6zFnRrZ9rEkWE-ker/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DMt4Q6iM2D_8FpBOQRGj8P_5GGK0RnsWTcBX8oZTp1q7DPePJS-8Kzsg8st5C-h07r5gcvnWIdJXiyl4ASbPYsjhQQD00Gl3SwSe7Si0IDKOum98PMlkF-6w3baeLzu6iKLan03pRupsmLD9GnbmM5z2O24s8k6TzCU/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DOQXpyXR_X7xHf_ELbATzRIJbJHDGjGQXHyB7UpzpI0LGALMbN7tDNy_mfjfyn0N9a9dSbPLwLz_ctqNaMUGBM1gmlTZMK4xA5yZ6mclumttUPERyRT1ySlV0e_9uznqRJmSAEIN1LjnjdUtTYPxQp-hbOSCi30G9nF/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DMOEM77r_hEvik_ojGxTd2q-jpe7oKm5d_2MGP-MUhVv73W7KhW4dSI1o-bglCeEFvJiV0HJgQ_NyQlcOp4OpWRg3tGBOPQrClgjl-UDeeubU8HFttRXPi_o2yBiIIu1TkoxZwEPGSte6ZO33BulSYHOB3HG4du92mJ/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DMSGlk-0I98kfvguEWVhQGp1gDtmbzJXuazX7S-XitggfVZNyuhdASQDRqenX_8YrfJtTL6RWuYltaYvBTgD1js1afQYuvXvMHCck4OEJk0jZTDJQjYL25QPf7Iq-p5PanR6TJRPrTamz3SWTlJQCuYQt9Wnv4EJL_b/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DM_VVEUwzPfXcs8GoN6kQk-EzQVdAU1YxcUOEi71Cxx9BeKFqr28NzwDQ_KbOrDApQTDQKZCYIFNVUOyJF-UbjPKA7b6sIwnUn6pkthPRg9AhJ-4TzcrKRt1nuEXguJDYt0c_W75-FBIWa39fTApTk8ZyPQO7ilR-E5/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DOQ5S10pfFiFFiAuXo8Yk0gPb8aNAoILt9Q875ebY-sYCmURVlj-cE408_phxAggcEW7Bf4EkEHbpnlWQJraxCI3eNPyvTEBdfP0MAc4sAIPwHa8ZDgHpCzet6JVhllWUPDsvjEl6fsuUQY2y2DZI32CRcdhKcUGoPY/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DM7F9HNxahJ7DLX4iXvp9kzrIkwn4jf5_I34zRsF1PrVXo7Z8NVzwzQZivwKYqCdeu5kTGV1kerAHzClQ7WSDucRvUZH9iIouXkqdBDRWjDqfH_jrqoD8ZmBronNlqAATlCx752kiOj_05--9Iz8p9VO--7ZKcAubRg/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DNn22flQNVIjo3vF3fKQU19saQK1Sk1nWmijVeNicvM04saVsdLyJT8tL7tvMweeSfywZ06zQv18NAAZZZfcmk4KsFXESlp0Q2DaIVqXHXVs2Yk_-9VB21B3FA1Nnno5F-83kXlHpG04s0w9Fr1EBIAbKDlhxt4xTff/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
        "https://places.googleapis.com/v1/places/ChIJ27Q3yI5ZwokR05rAYR5cieM/photos/AdCG2DNuhG5f7mj4G5ssxCtQEQLMh3YxDMZujFCsoXrW_k0qVf3EqIpxEyCNbFw728Pp9yTslYWWggRmFmXRwvnLACK35iuVZM0RzcCc3B8XfXR2nFcIQtT6m1HxB3iwZy6I3nEOl0_rN8Y6Z-S97C5wM6DqBv0--nQKa_0Q/media?maxHeightPx=380&key=AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI",
      ],
      brand: "some brand",
      rating: 4.3,
      googleMapsURI:
        "https://maps.google.com/?cid=16395737203977788115&hl=en-US&source=apiv3",
      phoneNumber: "(646) 716-3740",
      openingHours:
        "Monday: 11:00 AM – 8:00 PM\nTuesday: 11:00 AM – 8:00 PM\nWednesday: 11:00 AM – 8:00 PM\nThursday: 11:00 AM – 8:00 PM\nFriday: 11:00 AM – 8:00 PM\nSaturday: 11:00 AM – 8:00 PM\nSunday: 11:00 AM – 7:00 PM",
      ratingCount: 4711,
      websiteURI:
        "https://www.nike.com/retail/s/nike-soho?cp=84620811901_seo_%3Fcp%3D84620811901_seo_&y_source=1_NTQzNzQ1MC03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
      lat: 40.72329906225895,
      lng: -73.99903535842896,
    },
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
    },
  ];


router.get("/", (req, res) => {
  res.json(stores);
});

export default router;

