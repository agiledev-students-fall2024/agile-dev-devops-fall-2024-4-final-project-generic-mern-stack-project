import requests
import time
import json
import os
import re
import requests
import time
import json
import os
import re
from math import radians, cos, sin, asin, sqrt

API_KEY = "AIzaSyDQJ6Gvbn8DrY3ORqzUYNrMGhUhCc8pCZs"
TYPE = "restaurant"

# Bounding box coordinates for Manhattan
MIN_LAT = 40.700292
MAX_LAT = 40.880446
MIN_LNG = -74.019202
MAX_LNG = -73.907000

neighborhoods = [
    {
        "objectId": "WyEelKqkZ4",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.726, "longitude": -73.979},
        "name": "Alphabet City",
        "borough": "Manhattan",
        "summary": "Alphabet City is a neighborhood located within the East Village in the New York City borough of Manhattan. Its name comes from Avenues A, B, C, and D, the only avenues in Manhattan to have single-letter names. It is bordered by Houston Street to the south and by 14th Street to the north, along the traditional northern border of the East Village and south of Stuyvesant Town and Peter Cooper Village. Some famous landmarks include Tompkins Square Park and the Nuyorican Poets Cafe.\nThe neighborhood has a long history, serving as a cultural center and ethnic enclave for Manhattan's German, Polish, Hispanic, and Jewish populations. However, there is much dispute over the borders of the Lower East Side, Alphabet City, and East Village. Historically, Manhattan's Lower East Side was 14th Street at the northern end, bound on the east by East River and on the west by First Avenue; today, that same area is Alphabet City. The area's German presence in the early 20th century, in decline, virtually ended after the General Slocum disaster in 1904.\nAlphabet City is part of Manhattan Community District 3 and its primary ZIP Code is 10009. It is patrolled by the 9th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:27:06.611Z",
        "updatedAt": "2020-05-26T17:27:06.611Z",
    },
    {
        "objectId": "pXwL3HLYi2",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.713, "longitude": -74.016},
        "name": "Battery Park City",
        "borough": "Manhattan",
        "summary": "Battery Park City is a mainly residential 92-acre (37 ha) planned community on the west side of the southern tip of the island of Manhattan in New York City. It is bounded by the Hudson River on the west, the Hudson River shoreline on the north and south, and the West Side Highway on the east. The neighborhood is named for Battery Park, located directly to the south.\nMore than one-third of the development is parkland. The land upon which it is built was created by land reclamation on the Hudson River using over 3 million cubic yards (2.3×10^6 m3) of soil and rock excavated during the construction of the World Trade Center, the New York City Water Tunnel, and certain other construction projects, as well as from sand dredged from New York Harbor off Staten Island. The neighborhood includes Brookfield Place (formerly the World Financial Center), along with numerous buildings designed for housing, commercial, and retail.\nBattery Park City is part of Manhattan Community District 1. It is patrolled by the 1st Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:27:20.952Z",
        "updatedAt": "2020-05-26T17:27:20.952Z",
    },
    {
        "objectId": "TW0k5WCFfc",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.784726,
            "longitude": -73.95607,
        },
        "name": "Carnegie Hill",
        "borough": "Manhattan",
        "summary": "Carnegie Hill is a neighborhood within the Upper East Side, in the borough of Manhattan in New York City. Its boundaries are 86th Street on the south, Fifth Avenue (Central Park) on the west, with a northern boundary at 98th Street that continues just past Park Avenue and turns south to 96th Street and proceeds east up to, but not including, Third Avenue. The neighborhood is part of Manhattan Community District 8. \nIn the 2000s, the perceived northern boundary on Park Avenue has edged over 96th Street into what was traditionally Spanish Harlem, leading to that area sometimes being called Upper Carnegie Hill, especially by real-estate brokers. According to the official Carnegie Hill Neighbors website, the Carnegie Hill neighborhood extends from 86th to 98th Streets, from Fifth Avenue up to, but not including, Third Avenue.",
        "createdAt": "2020-05-26T17:27:35.499Z",
        "updatedAt": "2020-05-26T17:27:35.499Z",
    },
    {
        "objectId": "dfW33IGkyp",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.746, "longitude": -74.001},
        "name": "Chelsea",
        "borough": "Manhattan",
        "summary": "Chelsea is a neighborhood on the West Side of the borough of Manhattan in New York City. The district's boundaries are roughly 14th Street to the south, the Hudson River and West Street to the west, and Sixth Avenue to the east, with its northern boundary variously described as near the upper 20s\nor 34th Street, the next major crosstown street to the north. To the northwest of Chelsea is the neighborhood of Hell's Kitchen, as well as Hudson Yards; to the northeast are the Garment District and the remainder of Midtown South; to the east are NoMad and the Flatiron District; to the southwest is the Meatpacking District; and to the south and southeast are the West Village and the remainder of Greenwich Village. Chelsea is named after the Royal Hospital Chelsea in London, England.\nChelsea contains the Chelsea Historic District and its extension, which were designated by the New York City Landmarks Preservation Commission in 1970 and 1981 respectively. The district was added to the National Register of Historic Places in 1977, and expanded in 1982 to include contiguous blocks containing particularly significant examples of period architecture.\nThe neighborhood is primarily residential, with a mix of tenements, apartment blocks, city housing projects, townhouses, and renovated rowhouses, but its many retail businesses reflect the ethnic and social diversity of the population. The area has a large LGBTQ population. Chelsea is also known as one of the centers of the city's art world, with over 200 galleries in the neighborhood. As of 2015, due to the area's gentrification, there is a widening income gap between the wealthy living in luxury buildings and the poor living in housing projects, who are, at times, across the street from each other.\nChelsea is part of Manhattan Community District 4 and its primary ZIP Codes are 10001 and 10011. It is patrolled by the 10th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:27:50.158Z",
        "updatedAt": "2020-05-26T17:27:50.158Z",
    },
    {
        "objectId": "e2IVObkjcC",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.715, "longitude": -73.997},
        "name": "Chinatown",
        "borough": "Manhattan",
        "summary": "Manhattan's Chinatown (simplified Chinese: 曼哈顿华埠; traditional Chinese: 曼哈頓華埠; pinyin: Mànhādùn huábù; Jyutping: Maan6haa1deon6 waa1bou6) is a neighborhood in Lower Manhattan, New York City, bordering the Lower East Side to its east, Little Italy to its north, Civic Center to its south, and Tribeca to its west. With an estimated population of 90,000 to 100,000 people, Chinatown is home to the highest concentration of Chinese people in the Western Hemisphere. Manhattan's Chinatown is also one of the oldest Chinese ethnic enclaves. The Manhattan Chinatown is one of nine Chinatown neighborhoods in New York City, as well as one of twelve in the New York metropolitan area, which contains the largest ethnic Chinese population outside of Asia, comprising an estimated 893,697 uniracial individuals as of 2017.Historically, Chinatown was primarily populated by Cantonese speakers. However, in the 1980s and 1990s, large numbers of Fuzhounese-speaking immigrants also arrived and formed a sub-neighborhood annexed to the eastern portion of Chinatown east of The Bowery, which has become known as Little Fuzhou (小福州) subdivided away from the primarily Cantonese populated original long time established Chinatown of Manhattan from the proximity of The Bowery going west, known as Little Hong Kong/Guangdong (小粵港). As many Fuzhounese and Cantonese speakers now speak Mandarin—the official language in China and Taiwan—in addition to their native languages, this has made it more important for Chinatown residents to learn and speak Mandarin. Although now overtaken in size by the rapidly growing Flushing Chinatown (法拉盛華埠), located in the New York City borough of Queens, the Manhattan Chinatown remains a dominant cultural force for the Chinese diaspora, as home to the Museum of Chinese in America and as the headquarters of numerous publications based both in the U.S. and China that are geared to overseas Chinese.\nChinatown is part of Manhattan Community District 3 and it is primary ZIP Codes are 10013 and 10002. It is patrolled by the 5th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:28:04.190Z",
        "updatedAt": "2020-05-26T17:28:04.190Z",
    },
    {
        "objectId": "6NqzWYJuKj",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.795, "longitude": -73.939},
        "name": "East Harlem",
        "borough": "Manhattan",
        "summary": 'East Harlem, also known as Spanish Harlem or El Barrio, is a neighborhood of Upper Manhattan, New York City, roughly encompassing the area north of the Upper East Side and bounded by 96th Street to the south, Fifth Avenue to the west, and the East and Harlem Rivers to the east and north. Despite its name, it is generally not considered to be a part of Harlem.The neighborhood is one of the largest predominantly Hispanic communities in New York City, mostly made up of Puerto Ricans, as well as sizeable numbers of Dominican, Cuban and Mexican immigrants. The community is notable for its contributions to Latin freestyle and salsa music. East Harlem also includes the area formerly known as Italian Harlem, in which the remnants of a once predominantly Italian community remain. The Chinese population has increased dramatically in East Harlem since 2000.East Harlem has historically suffered from many social issues, such as a high crime rate, the highest jobless rate in New York City, teenage pregnancy, AIDS, drug abuse, homelessness, and an asthma rate five times the national average. It has the second-highest concentration of public housing in the United States, behind Brownsville, Brooklyn. However, East Harlem is undergoing some gentrification. In February 2016, East Harlem was one of four neighborhoods featured in an article in The New York Times about "New Hot Neighborhoods", and the city was considering re-zoning the area.\nEast Harlem is part of Manhattan Community District 11 and its primary ZIP Codes are 10029 and 10035. It is patrolled by the 23rd and 25th Precincts of the New York City Police Department.',
        "createdAt": "2020-05-26T17:28:18.964Z",
        "updatedAt": "2020-05-26T17:28:18.964Z",
    },
    {
        "objectId": "FyYeWdAPq1",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.728, "longitude": -73.986},
        "name": "East Village",
        "borough": "Manhattan",
        "summary": "The East Village is a neighborhood on the East Side of Lower Manhattan in New York City, United States. It is roughly defined as the area east of the Bowery and Third Avenue, between 14th Street on the north and Houston Street on the south. The East Village contains three subsections: Alphabet City, in reference to the single-letter-named avenues that are located to the east of First Avenue; Little Ukraine, near Second Avenue and 6th and 7th Streets; and Bowery, located around the street of the same name.\nInitially, what is now the East Village was occupied by the Lenape Native Americans, and was then divided into plantations by Dutch settlers. During the early 19th century, the East Village contained many of the city's most opulent estates. By the middle of the century, it grew to include a large immigrant population—including what was once referred to as Manhattan's Little Germany—and was considered part of the nearby Lower East Side. By the late 1960s, many artists, musicians, students and hippies began to move into the area, and East Village was given its own identity. Since at least the 2000s, gentrification has changed the character of the neighborhood.East Village is part of Manhattan Community District 3 and its primary ZIP Codes are 10003 and 10009. It is patrolled by the 9th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:28:32.626Z",
        "updatedAt": "2020-05-26T17:28:32.626Z",
    },
    {
        "objectId": "U4ChtlabDA",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.708, "longitude": -74.011},
        "name": "Financial District",
        "borough": "Manhattan",
        "summary": "The Financial District of Lower Manhattan, also known as FiDi, is a neighborhood located on the southern tip of Manhattan island in New York City. It is bounded by the West Side Highway on the west, Chambers Street and City Hall Park on the north, Brooklyn Bridge on the northeast, the East River to the southeast, and The Battery on the south.\nThe City of New York was created in the Financial District in 1624, and the neighborhood roughly overlaps with the boundaries of the New Amsterdam settlement in the late 17th century. The district comprises the offices and headquarters of many of the city's major financial institutions, including the New York Stock Exchange and the Federal Reserve Bank of New York. Anchored on Wall Street in the Financial District, New York City has been called both the most financially powerful city and the leading financial center of the world, and the New York Stock Exchange is the world's largest stock exchange by total market capitalization. Several other major exchanges have or had headquarters in the Financial District, including the New York Mercantile Exchange, NASDAQ, the New York Board of Trade, and the former American Stock Exchange.\nThe Financial District is part of Manhattan Community District 1 and its primary ZIP Codes are 10004, 10005, 10006, and 10038. It is patrolled by the 1st Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:28:46.531Z",
        "updatedAt": "2020-05-26T17:28:46.531Z",
    },
    {
        "objectId": "VtVl5cDY0l",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.7408,
            "longitude": -73.9896,
        },
        "name": "Flatiron District",
        "borough": "Manhattan",
        "summary": "The Flatiron District is a neighborhood in the New York City borough of Manhattan, named after the Flatiron Building at 23rd Street, Broadway and Fifth Avenue.\nGenerally the Flatiron District is bounded by 14th Street, Union Square and Greenwich Village to the south; the Avenue of the Americas (Sixth Avenue) and Chelsea to the west; 23rd Street and Madison Square (or NoMad) to the north; and Park Avenue South and Gramercy Park to the east.Broadway cuts through the middle of the district, and Madison Avenue begins at 23rd Street and runs north. At the north (uptown) end of the district is Madison Square Park, which was completely renovated in 2001. The Flatiron District encompasses within its boundaries the Ladies' Mile Historic District and the birthplace of Theodore Roosevelt, a National Historic Site. The Flatiron District was also the birthplace of Silicon Alley, a metonym for New York's high technology sector, which has since spread beyond the area.The Flatiron District is part of Manhattan Community District 5. Residents are represented by the Flatiron Alliance neighborhood association and nearby businesses by the Flatiron/23rd Street Partnership business improvement district, though the two have different (partially overlapping) boundaries.",
        "createdAt": "2020-05-26T17:29:00.834Z",
        "updatedAt": "2020-05-26T17:29:00.834Z",
    },
    {
        "objectId": "DgSPV3F9r5",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.7378,
            "longitude": -73.9861,
        },
        "name": "Gramercy Park",
        "borough": "Manhattan",
        "summary": "Gramercy Park () is the name of both a small, fenced-in private park and the surrounding neighborhood that is referred to also as Gramercy, in the New York City borough of Manhattan in New York, United States.The approximately 2-acre (0.8 ha) park, located in the Gramercy Park Historic District, is one of two private parks in New York City – the other is Sunnyside Gardens Park in Queens – as well as one of only three in the state; only people residing around the park who pay an annual fee have a key, and the public is not generally allowed in – although the sidewalks of the streets around the park are a popular jogging, strolling, and dog-walking route.\nThe neighborhood is mostly located within Manhattan Community District 6, with a small portion in Community District 5. It is generally perceived to be a quiet and safe area.The neighborhood, associated historic district, and park have generally received positive reviews. Calling it \"a Victorian gentleman who has refused to die\", Charlotte Devree in The New York Times said that \"There is nothing else quite like Gramercy Park in the country.\" When the New York City Landmarks Preservation Commission created the Gramercy Park Historic District in 1966, they quoted from John B. Pine's 1921 book, The Story of Gramercy Park:\n\nThe laying out of Gramercy Park represents one of the earliest attempts in this country at 'City Planning'. ... As a park given to the prospective owners of the land surrounding it and held in trust for those who made their homes around it, Gramercy Park is unique in this City, and perhaps in this country, and represents the only neighborhood, with possibly one exception, which has remained comparatively unchanged for eighty years — the Park is one of the City's Landmarks.",
        "createdAt": "2020-05-26T17:29:17.178Z",
        "updatedAt": "2020-05-26T17:29:17.178Z",
    },
    {
        "objectId": "CXdhCAGrqV",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.734, "longitude": -74.002},
        "name": "Greenwich Village",
        "borough": "Manhattan",
        "summary": "Greenwich Village ( GREN-itch,  GRIN-,  -⁠ij), often referred to by locals as simply \"the Village\", is a neighborhood on the west side of Manhattan in New York City, within Lower Manhattan. Broadly, Greenwich Village is bounded by 14th Street to the north, Broadway to the east, Houston Street to the south, and the Hudson River to the west. Greenwich Village also contains several subsections, including the West Village west of Seventh Avenue and the Meatpacking District in the northwest corner of Greenwich Village.\nThe neighborhood's name comes from Groenwijck, one of the Dutch names for the village (meaning \"Green District\"), which was Anglicized to Greenwich. In the 20th century, Greenwich Village was known as an artists' haven, the Bohemian capital, the cradle of the modern LGBT movement, and the East Coast birthplace of both the Beat and '60s counterculture movements. Greenwich Village contains Washington Square Park, as well as two of New York's private colleges, New York University (NYU) and the New School.Greenwich Village is part of Manhattan Community District 2 and is patrolled by the 6th Precinct of the New York City Police Department. Greenwich Village has undergone extensive gentrification and commercialization; the four ZIP Codes that constitute the Village – 10011, 10012, 10003, and 10014 – were all ranked among the ten most expensive in the United States by median housing price in 2014, according to Forbes, with residential property sale prices in the West Village neighborhood typically exceeding US$2,100 per square foot ($23,000/m2) in 2017.",
        "createdAt": "2020-05-26T17:29:32.248Z",
        "updatedAt": "2020-05-26T17:29:32.248Z",
    },
    {
        "objectId": "utOGlwxtGe",
        "name": "Harlem",
        "borough": "Manhattan",
        "summary": "Harlem is a neighborhood in the northern section of the New York City borough of Manhattan. It is bounded roughly by Frederick Douglass Boulevard, St. Nicholas Avenue, and Morningside Park on the west; the Harlem River and 155th Street on the north; Fifth Avenue on the east; and Central Park North on the south. The greater Harlem area encompasses several other neighborhoods and extends west to the Hudson River, north to 155th Street, east to the East River, and south to Martin Luther King, Jr., Boulevard, Central Park, and East 96th Street.\nOriginally a Dutch village, formally organized in 1658, it is named after the city of Haarlem in the Netherlands. Harlem's history has been defined by a series of economic boom-and-bust cycles, with significant population shifts accompanying each cycle. Harlem was predominantly occupied by Jewish and Italian Americans in the 19th century, but African-American residents began to arrive in large numbers during the Great Migration in the 20th century. In the 1920s and 1930s, Central and West Harlem were the center of the Harlem Renaissance, a major African-American cultural movement. With job losses during the Great Depression of the 1930s and the deindustrialization of New York City after World War II, rates of crime and poverty increased significantly. In the 21st century, crime rates decreased significantly, and Harlem started to gentrify.\nCentral Harlem is part of Manhattan Community District 10. It is patrolled by the 28th and 32nd Precincts of the New York City Police Department. The greater Harlem area also includes Manhattan Community Districts 9 and 11, and several additional police precincts. Fire services are provided by four New York City Fire Department companies. Politically, Harlem is represented by the New York City Council's 7th, 8th, and 9th districts. The area is served by the New York City Subway and local bus routes. It contains several public elementary, middle, and high schools, and is close to several colleges including Columbia University and the City College of New York.",
        "createdAt": "2020-05-26T17:29:47.744Z",
        "updatedAt": "2020-05-26T17:29:47.744Z",
    },
    {
        "objectId": "IbR5HYEAO8",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.764, "longitude": -73.992},
        "name": "Hells Kitchen",
        "borough": "Manhattan",
        "summary": "Hell's Kitchen, sometimes known as Clinton, is a neighborhood on the West Side of Manhattan in New York City, west of Midtown Manhattan. It is traditionally considered to be bordered by 34th Street to the south, 59th Street to the north, Eighth Avenue to the east, and the Hudson River to the west.\nUntil the 1970s, Hell's Kitchen was a bastion of poor and working-class Irish Americans. Though its gritty reputation had long held real-estate prices below those of most other areas of Manhattan, by 1969, the City Planning Commission's Plan for New York City reported that development pressures related to its Midtown location were driving people of modest means from the area. Since the early 1990s, the area has been gentrifying, and rents have risen rapidly. Home of the Actors Studio training school, and adjacent to Broadway theatres, Hell's Kitchen has long been a home to fledgling and working actors.\nHell's Kitchen is part of Manhattan Community District 4. It is patrolled by the 10th and 18th Precincts of the New York City Police Department. The area provides transport, medical, and warehouse-infrastructure support to the business district of Manhattan. It is also known for its extensive selection of multiethnic, small, and relatively inexpensive restaurants, delicatessens, bodegas, bars, and associated nightlife.",
        "createdAt": "2020-05-26T17:30:02.587Z",
        "updatedAt": "2020-05-26T17:30:02.587Z",
    },
    {
        "objectId": "e9MhCmNPUQ",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.764, "longitude": -73.992},
        "name": "Clinton",
        "borough": "Manhattan",
        "summary": "Hell's Kitchen, sometimes known as Clinton, is a neighborhood on the West Side of Manhattan in New York City, west of Midtown Manhattan. It is traditionally considered to be bordered by 34th Street to the south, 59th Street to the north, Eighth Avenue to the east, and the Hudson River to the west.\nUntil the 1970s, Hell's Kitchen was a bastion of poor and working-class Irish Americans. Though its gritty reputation had long held real-estate prices below those of most other areas of Manhattan, by 1969, the City Planning Commission's Plan for New York City reported that development pressures related to its Midtown location were driving people of modest means from the area. Since the early 1990s, the area has been gentrifying, and rents have risen rapidly. Home of the Actors Studio training school, and adjacent to Broadway theatres, Hell's Kitchen has long been a home to fledgling and working actors.\nHell's Kitchen is part of Manhattan Community District 4. It is patrolled by the 10th and 18th Precincts of the New York City Police Department. The area provides transport, medical, and warehouse-infrastructure support to the business district of Manhattan. It is also known for its extensive selection of multiethnic, small, and relatively inexpensive restaurants, delicatessens, bodegas, bars, and associated nightlife.",
        "createdAt": "2020-05-26T17:30:17.464Z",
        "updatedAt": "2020-05-26T17:30:17.464Z",
    },
    {
        "objectId": "rpeCJxNgaR",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.867, "longitude": -73.922},
        "name": "Inwood",
        "borough": "Manhattan",
        "summary": "Inwood is a neighborhood in the New York City borough of Manhattan, at the northern tip of Manhattan Island, in the U.S. state of New York. It is bounded by the Hudson River to the west, Spuyten Duyvil Creek and Marble Hill to the north, the Harlem River to the east, and Washington Heights to the south.\nInwood is part of Manhattan Community District 12 and its primary ZIP Code is 10034. It is patrolled by the 34th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:30:31.796Z",
        "updatedAt": "2020-05-26T17:30:31.796Z",
    },
    {
        "objectId": "6DEL7dZvTV",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.741, "longitude": -73.978},
        "name": "Kips Bay",
        "borough": "Manhattan",
        "summary": "Kips Bay, or Kip's Bay, is a neighborhood on the east side of the New York City borough of Manhattan. It is roughly bounded by East 34th Street to the north, the East River to the east, East 27th and/or 23rd Streets to the south, and Third Avenue to the west.Kips Bay is part of Manhattan Community District 6 and its primary ZIP Codes are 10010 and 10016. It is patrolled by the 13th and 17th Precincts of the New York City Police Department.",
        "createdAt": "2020-05-26T17:30:45.449Z",
        "updatedAt": "2020-05-26T17:30:45.449Z",
    },
    {
        "objectId": "3ZRWpFnYFR",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.773828,
            "longitude": -73.9844722,
        },
        "name": "Lincoln Square",
        "borough": "Manhattan",
        "summary": "Lincoln Square is the name of both a square and the surrounding neighborhood within the Upper West Side of the New York City borough of Manhattan.  Lincoln Square is centered on the intersection of Broadway and Columbus Avenue, between West 65th and West 66th streets. The neighborhood is bounded by Columbus Avenue and Amsterdam Avenue to the east and west, and West 66th and 63rd Street to the north and south. However, the term can be extended to refer to the neighborhood between West 59th Street and West 72nd Street. It is bounded by Hell's Kitchen, Riverside South, Central Park, and the Upper West Side proper. The studios for WABC-TV is located here.\nThe area includes the 66th Street–Lincoln Center station, served by the New York City Subway's 1 and ​2 trains, and anchored by Lincoln Center, a performing-arts venue.\nLincoln Square is part of Manhattan Community District 7 and its primary ZIP Code is 10023. It is patrolled by the 20th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:30:59.245Z",
        "updatedAt": "2020-05-26T17:30:59.245Z",
    },
    {
        "objectId": "hCc2BYLH8R",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.715, "longitude": -73.985},
        "name": "Lower East Side",
        "borough": "Manhattan",
        "summary": "The Lower East Side, sometimes abbreviated as LES, is a neighborhood in the southeastern part of the New York City borough of Manhattan, roughly located between the Bowery and the East River from Canal to Houston streets. Traditionally an immigrant, working class neighborhood, it began rapid gentrification in the mid-2000s, prompting the National Trust for Historic Preservation to place the neighborhood on their list of America's Most Endangered Places.The Lower East Side is part of Manhattan Community District 3 and its primary ZIP Code is 10002. It is patrolled by the 7th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:31:14.537Z",
        "updatedAt": "2020-05-26T17:31:14.537Z",
    },
    {
        "objectId": "CeebN4ypYr",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.79935278,
            "longitude": -73.96291944,
        },
        "name": "Manhattan Valley",
        "borough": "Manhattan",
        "summary": "Manhattan Valley is a neighborhood in the northern part of Upper West Side in Manhattan, New York City. It is bounded by West 110th Street to the north, Central Park West to the east, West 96th Street to the south, and Broadway to the west. It was formerly known as the Bloomingdale District, a name still in occasional use.",
        "createdAt": "2020-05-26T17:31:29.263Z",
        "updatedAt": "2020-05-26T17:31:29.263Z",
    },
    {
        "objectId": "MnfLZlMkPi",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.747, "longitude": -73.986},
        "name": "Midtown East",
        "borough": "Manhattan",
        "summary": "Midtown Manhattan is the central portion of the New York City borough of Manhattan. Midtown is home to some of the city's most prominent buildings, including the Empire State Building, the Chrysler Building, the Hudson Yards Redevelopment Project, the headquarters of the United Nations, Grand Central Terminal, and Rockefeller Center, as well as tourist destinations such as Broadway and Times Square.\nMidtown Manhattan is the largest central business district in the world and ranks among the most expensive pieces of real estate; Fifth Avenue in Midtown Manhattan commands the world's highest retail rents, with average annual rents at US$3,000 per square foot ($32,000/m2) in 2017. However, due to the high price of retail spaces in Midtown, there are also many vacant storefronts in the neighborhood. Midtown is the country's largest commercial, entertainment, and media center, and also a growing financial center.\nThe majority of New York City's skyscrapers, including its tallest hotels and apartment towers, are in Midtown. The area hosts commuters and residents working in its offices, hotels, and retail establishments, tourists and students. Times Square, the brightly illuminated hub of the Broadway Theater District, is a major center of the world's entertainment industry. Sixth Avenue also has the headquarters of three of the four major U.S. television networks.\nMidtown is part of Manhattan Community District 5. It is patrolled by the 14th and 18th Precincts of the New York City Police Department.",
        "createdAt": "2020-05-26T17:31:44.958Z",
        "updatedAt": "2020-05-26T17:31:44.958Z",
    },
    {
        "objectId": "ncNyKirB6U",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.80972222,
            "longitude": -73.96027778,
        },
        "name": "Morningside Heights",
        "borough": "Manhattan",
        "summary": "Morningside Heights is a primarily residential neighborhood in the northern section of Manhattan in New York City. One of the three neighborhoods comprising West Harlem, Morningside Heights is bounded by Central Harlem and Morningside Park to the east, at Morningside Drive; Manhattanville to the north, at 125th Street; the Manhattan Valley section of the Upper West Side to the south, at 110th Street; and Riverside Park to the west, at Riverside Drive. The main thoroughfare is Broadway, which runs north–south through the neighborhood.\nMorningside Heights, located on a high plateau between Morningside and Riverside Parks, was hard to access until the late 19th century, and was sparsely developed except for the Bloomingdale and Leake and Watts asylums. Morningside Heights, along with the Upper West Side, was considered part of the Bloomingdale District until Morningside Park was finished in the late 19th century. Large-scale development started in the 1890s with the construction of academic and cultural institutions. By the 1900s, the construction of public transportation and the neighborhood's first subway line led to Morningside Heights being developed into a residential neighborhood. Morningside Heights was mostly developed by the 1930s. During the mid-20th century, as the institutions within Morningside Heights expanded, cultural tensions grew between the two groups. After a period of decline, the neighborhood started to gentrify in the 1980s and 1990s.\nMuch of Morningside Heights is part of the campus of Columbia University, a private Ivy League research university that also owns much of the neighborhood's off-campus real estate. Morningside Heights contains numerous other educational institutions such as Teachers College, Barnard College, the Manhattan School of Music, Bank Street College of Education, Union Theological Seminary, and the Jewish Theological Seminary of America. Additionally, Morningside Heights includes several religious institutions, including the Cathedral of St. John the Divine, Riverside Church, the Church of Notre Dame, Corpus Christi Church, and Interchurch Center. The neighborhood also contains other architectural landmarks, such as St. Luke's Hospital (now Mount Sinai Morningside) and Grant's Tomb.\nMorningside Heights is part of Manhattan Community District 9. It is patrolled by the 26th Precinct of the New York City Police Department. Fire services are provided by the New York City Fire Department's Engine Company 47 and Engine Company 37/Ladder Company 40. Politically it is represented by the New York City Council's 7th District.",
        "createdAt": "2020-05-26T17:31:59.561Z",
        "updatedAt": "2020-05-26T17:31:59.561Z",
    },
    {
        "objectId": "CVpEP8k2lY",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.748, "longitude": -73.978},
        "name": "Murray Hill",
        "borough": "Manhattan",
        "summary": "Murray Hill is a neighborhood on the east side of Manhattan in New York City. Murray Hill is bordered to the east by the East River, to the west by Midtown Manhattan, to the south by Kips Bay and Rose Hill, and to the north by Turtle Bay. Its exact boundaries are disputed and vary widely, but it is generally located between East 32nd Street and/or 34th Street to the south, East 40th Street and/or 42nd Street to the north, Madison Avenue or Fifth Avenue to the west, and the East River to the east.\nMurray Hill was named after Robert Murray, the head of the Murray family, a mercantile family that settled in the area in the 18th century. The Murray property was located on a steep glacial hill that peaked between Lexington Avenue and Broadway. Through the 19th century, Murray Hill was relatively isolated from the rest of New York City, which at the time was centered in lower Manhattan. Murray Hill became an upscale neighborhood during the 20th century. Today, it contains several cultural institutions, as well as missions and consulates to the nearby United Nations headquarters.\nMurray Hill is part of Manhattan Community District 6 and its primary ZIP Codes are 10016 and 10017. It is patrolled by the 17th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:32:13.334Z",
        "updatedAt": "2020-05-26T17:32:13.334Z",
    },
    {
        "objectId": "JSLkJEYnJF",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.719, "longitude": -73.997},
        "name": "Little Italy",
        "borough": "Manhattan",
        "summary": "Little Italy (Italian: Piccola Italia) is a neighborhood in Lower Manhattan in New York City, once known for its large population of Italian Americans and Italian immigrants. It is bounded on the west by Tribeca and Soho, on the south by Chinatown, on the east by the Bowery and Lower East Side, and on the north by Nolita.",
        "createdAt": "2020-05-26T17:32:27.777Z",
        "updatedAt": "2020-05-26T17:32:27.777Z",
    },
    {
        "objectId": "GZjEVbwaE5",
        "geoPosition": {
            "__type": "GeoPoint",
            "latitude": 40.76138889,
            "longitude": -73.95083333,
        },
        "name": "Roosevelt Island",
        "borough": "Manhattan",
        "summary": "Roosevelt Island is a narrow island in New York City's East River, within the borough of Manhattan. It lies between Manhattan Island to its west and the borough of Queens, on Long Island, to its east. Running from the equivalent of East 46th to 85th Streets on Manhattan Island, it is about 2 miles (3.2 km) long, with a maximum width of 800 feet (240 m), and a total area of 147 acres (0.59 km2). Together with Mill Rock, Roosevelt Island constitutes Manhattan's Census Tract 238, which has a land area of 0.279 sq mi (0.72 km2), and had a population of 9,520 as of the 2000 United States Census. It had a population of 11,661 as of the 2010 United States Census.The island was called Minnehanonck by the Lenape and Varkens Eylandt (Hog Island) by New Netherlanders, and during the colonial era and later as Blackwell's Island. It was known as Welfare Island when it was used principally for hospitals, from 1921 to 1973. It was renamed Roosevelt Island (after Franklin D. Roosevelt) in 1973.Roosevelt Island is owned by the city but was leased to the New York State Urban Development Corporation for 99 years in 1969. Most of the residential buildings on Roosevelt Island are rental buildings. There is also a cooperative named Rivercross and a condominium building named Riverwalk. One rental building (Eastwood) has left New York State's Mitchell-Lama Housing Program, though current residents are still protected. It is now called Roosevelt Landings. There are attempts to privatize three other buildings, including the cooperative. The FDNY also maintains its Special Operations Command facility at 750 Main St. on the island.",
        "createdAt": "2020-05-26T17:32:42.067Z",
        "updatedAt": "2020-05-26T17:32:42.067Z",
    },
    {
        "objectId": "rQMMKmyJb9",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.723, "longitude": -74},
        "name": "SoHo",
        "borough": "Manhattan",
        "summary": 'SoHo, sometimes written Soho, is a neighborhood in Lower Manhattan in New York City, which in recent history came to the public\'s attention for being the location of many artists\' lofts and art galleries, but is now better known for its variety of shops ranging from trendy upscale boutiques to national and international chain store outlets. The area\'s history is an archetypal example of inner-city regeneration and gentrification, encompassing socioeconomic, cultural, political, and architectural developments.The name "SoHo" refers to the area being "South of Houston Street", a name coined in 1962 by Chester Rapkin, an urban planner and author of The South Houston Industrial Area study, also known as the "Rapkin Report". The name also recalls Soho, an area in London\'s West End.Almost all of SoHo is included in the SoHo–Cast Iron Historic District, which was designated by the New York City Landmarks Preservation Commission in 1973, extended in 2010, and was listed on the National Register of Historic Places and declared a National Historic Landmark in \n1978. It consists of 26 blocks and approximately 500 buildings, many of them incorporating cast-iron architectural elements. Many side streets in the district are paved with Belgian blocks.SoHo is part of Manhattan Community District 2 and its primary ZIP Codes are 10012 and 10013. It is patrolled by the 1st Precinct of the New York City Police Department.',
        "createdAt": "2020-05-26T17:32:55.900Z",
        "updatedAt": "2020-05-26T17:32:55.900Z",
    },
    {
        "objectId": "cVShWq17Er",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.718, "longitude": -74.008},
        "name": "Tribeca",
        "borough": "Manhattan",
        "summary": 'Tribeca , originally written as TriBeCa, is a neighborhood in Lower Manhattan in New York City.  Its name is a syllabic abbreviation of "Triangle Below Canal Street". The "triangle", or more accurately, a trapezoid, is bounded by Canal Street, West Street, Broadway, and Chambers Street.  More recently, a common marketing tactic has been to extend Tribeca\'s southern boundary to either Vesey or Murray Streets to increase the appeal of property listings.The neighborhood began as farmland, became residential in the early 19th century, then transitioned into a mercantile one centered on produce, dry goods, and textiles, before being colonized by artists and then actors, models, entrepreneurs and other celebrities. The neighborhood is home to the Tribeca Film Festival, which was created in response to the September 11 attacks, to reinvigorate the neighborhood and downtown after the destruction caused by the terrorist attacks.Tribeca is part of Manhattan Community District 1 and its primary ZIP Codes are 10007 and 10013. It is patrolled by the 1st Precinct of the New York City Police Department.',
        "createdAt": "2020-05-26T17:33:10.495Z",
        "updatedAt": "2020-05-26T17:33:10.495Z",
    },
    {
        "objectId": "f8gVlcE8KD",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.769, "longitude": -73.966},
        "name": "Upper East Side",
        "borough": "Manhattan",
        "summary": "The Upper East Side, sometimes abbreviated UES, is a neighborhood in the borough of Manhattan in New York City, bounded by 96th Street to the north, the East River to the east, 59th Street to the south, and Central Park/Fifth Avenue to the west. The area incorporates several smaller neighborhoods, including Lenox Hill, Carnegie Hill, and Yorkville. Once known as the Silk Stocking District, it is now one of the most affluent neighborhoods in New York City.The Upper East Side is part of Manhattan Community District 8 and its primary ZIP Codes are 10021, 10028, 10065, 10075, and 10128. It is patrolled by the 19th Precinct of the New York City Police Department.",
        "createdAt": "2020-05-26T17:33:25.148Z",
        "updatedAt": "2020-05-26T17:33:25.148Z",
    },
    {
        "objectId": "8PBWe2nGj1",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.787, "longitude": -73.975},
        "name": "Upper West Side",
        "borough": "Manhattan",
        "summary": "The Upper West Side is a neighborhood in the borough of Manhattan in New York City. It is bounded by Central Park on the east, the Hudson River on the west, West 59th Street to the south, and West 110th Street to the north.Like the Upper East Side, the Upper West Side is an affluent, primarily residential area with many of its residents working in commercial areas of Midtown and Lower Manhattan. Similarly to the Museum Mile district on the Upper East Side, the Upper West Side is considered one of Manhattan's cultural and intellectual hubs, with Columbia University and Barnard College located just to the north of the neighborhood, and Lincoln Center for the Performing Arts and Fiorello H. LaGuardia High School located at the south end. The Upper West Side is among New York City's wealthiest neighborhoods.The Upper West Side is part of Manhattan Community District 7 and its primary ZIP Codes are 10023, 10024, 10025, and 10069. It is patrolled by the 20th and 24th Precincts of the New York City Police Department. It is sometimes abbreviated UWS.",
        "createdAt": "2020-05-26T17:33:39.791Z",
        "updatedAt": "2020-05-26T17:33:39.791Z",
    },
    {
        "objectId": "sZ6VVsNz4R",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.84, "longitude": -73.94},
        "name": "Washington Heights",
        "borough": "Manhattan",
        "summary": "Washington Heights is a neighborhood in the northern portion of the New York City borough of Manhattan. It is named for Fort Washington, a fortification constructed at the highest natural point on Manhattan island by Continental Army troops during the American Revolutionary War, to defend the area from the British forces. Washington Heights is bordered by Inwood to the north along Dyckman Street, Harlem to the south along 155th Street, the Harlem River and Coogan's Bluff to the east, and the Hudson River to the west. As of 2016, it has a population of 201,590.\nWashington Heights is part of Manhattan Community District 12 and its primary ZIP Codes are 10032, 10033, and 10040. It is patrolled by the 33rd and 34th Precincts of the New York City Police Department.\n\n",
        "createdAt": "2020-05-26T17:33:53.394Z",
        "updatedAt": "2020-05-26T17:33:53.394Z",
    },
    {
        "objectId": "CQJVRn6Yji",
        "geoPosition": {"__type": "GeoPoint", "latitude": 40.736, "longitude": -74.004},
        "name": "West Village",
        "borough": "Manhattan",
        "summary": "The West Village is a neighborhood in the western section of the larger Greenwich Village neighborhood of Lower Manhattan, New York City.The traditional boundaries of the West Village are the Hudson River to the west, West 14th Street to the north, Greenwich Avenue to the east, and Christopher Street to the south. Other popular definitions have extended the southern boundary as far south as Houston Street, and some use Seventh Avenue or Avenue of the Americas as the eastern boundary. The Far West Village extends from the Hudson River to Hudson Street, between Gansevoort Street and Leroy Street. Neighboring communities include Chelsea to the north, the South Village and Hudson Square to the south, and the Washington Square neighborhood of Greenwich Village to the east.The West Village is part of Manhattan Community District 2, and is patrolled by the 6th Precinct of the New York City Police Department. Residential property sale prices in West Village are among the most expensive in the United States, typically exceeding US$2,100 per square foot ($23,000/m2) in 2017.",
        "createdAt": "2020-05-26T17:34:07.567Z",
        "updatedAt": "2020-05-26T17:34:07.567Z",
    },
]


# Load neighborhoods data from a JSON file
def load_neighborhoods():
    # Convert to a list of dictionaries with 'name' and 'latitude', 'longitude'
    neighborhood_list = []
    for item in neighborhoods:
        name = item["name"]
        geo = item.get("geoPosition", {})
        latitude = geo.get("latitude")
        longitude = geo.get("longitude")
        if latitude is not None and longitude is not None:
            neighborhood_list.append(
                {"name": name, "latitude": latitude, "longitude": longitude}
            )
    return neighborhood_list


# Function to generate grid points over Manhattan
def generate_grid(min_lat, max_lat, min_lng, max_lng, lat_step, lng_step):
    lat_points = []
    lng_points = []
    lat = min_lat
    while lat <= max_lat:
        lat_points.append(lat)
        lat += lat_step
    lng = min_lng
    while lng <= max_lng:
        lng_points.append(lng)
        lng += lng_step
    grid_points = [(lat, lng) for lat in lat_points for lng in lng_points]
    return grid_points


# Fetch nearby restaurants
def get_nearby_restaurants(location, radius, type_):
    results = []
    next_page_token = None
    iterations = 0

    while iterations < 20:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type={type_}&key={API_KEY}"
        if next_page_token:
            url += f"&pagetoken={next_page_token}"

        response = requests.get(url)
        data = response.json()

        if data["status"] not in ["OK", "ZERO_RESULTS"]:
            print(f"Error fetching nearby restaurants at {location}: {data['status']}")
            break

        results.extend(data.get("results", []))
        next_page_token = data.get("next_page_token")
        iterations += 1

        if next_page_token:
            time.sleep(2)  # Wait for next_page_token to become valid
        else:
            break

    return results


# Fetch detailed information for a place
def get_place_details(place_id):
    # Include types and address_components
    fields = "name,website,photos,editorial_summary,vicinity,types,address_components,geometry"
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields={fields}&key={API_KEY}"

    response = requests.get(url)
    data = response.json()

    if data["status"] != "OK":
        raise Exception(f"Error fetching place details: {data['status']}")

    return data["result"]


# Generate photo URLs from photo references
def get_photo_urls(photos):
    photo_urls = []
    for photo in photos:
        photo_reference = photo.get("photo_reference")
        if photo_reference:
            url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={API_KEY}"
            photo_urls.append(url)
    return photo_urls


# Extract cuisine from types and description
def extract_cuisine(place_details):
    # List of common cuisines
    cuisines = [
        "American",
        "Chinese",
        "Italian",
        "Mexican",
        "Japanese",
        "French",
        "Thai",
        "Indian",
        "Mediterranean",
        "Greek",
        "Spanish",
        "Korean",
        "Vietnamese",
        "Middle Eastern",
        "Lebanese",
        "Turkish",
        "Caribbean",
        "Latin American",
        "African",
        "Vegetarian",
        "Vegan",
        "Seafood",
        "Steakhouse",
        "Pizza",
        "Burgers",
        "Sushi",
        "Barbecue",
        "Tapas",
        "Bakery",
        "Cafe",
        "Diner",
        "Dessert",
        "Breakfast",
        "Brunch",
        "Cocktails",
        "Wine Bar",
    ]

    # Check types field
    types = place_details.get("types", [])
    for type_ in types:
        # Convert type to a readable format
        type_readable = type_.replace("_", " ").title()
        if type_readable in cuisines:
            return type_readable

    # Check name and editorial_summary
    text_to_search = (
        place_details.get("name", "")
        + " "
        + place_details.get("editorial_summary", {}).get("overview", "")
    )
    for cuisine in cuisines:
        if re.search(r"\b" + re.escape(cuisine) + r"\b", text_to_search, re.IGNORECASE):
            return cuisine

    return None  # No cuisine found


# Calculate distance between two lat/lng points using the Haversine formula
def haversine_distance(lat1, lon1, lat2, lon2):
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers
    return c * r


# Assign neighborhood based on proximity to center points
def assign_neighborhood(lat, lon, neighborhood_list):
    min_distance = float("inf")
    closest_neighborhood = None
    for neighborhood in neighborhood_list:
        n_lat = neighborhood["latitude"]
        n_lon = neighborhood["longitude"]
        distance = haversine_distance(lat, lon, n_lat, n_lon)
        if distance < min_distance:
            min_distance = distance
            closest_neighborhood = neighborhood["name"]
    return closest_neighborhood


def main():
    # Load neighborhoods data
    neighborhood_list = load_neighborhoods()

    # Generate grid points over Manhattan
    grid_points = generate_grid(
        MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG, lat_step=0.005, lng_step=0.005
    )

    detailed_results = []
    place_ids_seen = set()
    for index, (lat, lng) in enumerate(grid_points[:100]):
        location = f"{lat},{lng}"
        radius = 500  # Adjust radius as needed

        try:
            nearby_restaurants = get_nearby_restaurants(location, radius, TYPE)
        except Exception as e:
            print(f"Error fetching nearby restaurants at {location}: {e}")
            continue

        # Filter out duplicates
        new_places = [
            place
            for place in nearby_restaurants
            if place["place_id"] not in place_ids_seen
        ]

        # Update the set of seen place IDs
        for place in new_places:
            place_ids_seen.add(place["place_id"])

        # Process new places
        concurrency_limit = 5
        chunks = [
            new_places[i : i + concurrency_limit]
            for i in range(0, len(new_places), concurrency_limit)
        ]

        for chunk in chunks:
            results = []
            for place in chunk:
                place_id = place["place_id"]
                try:
                    place_details = get_place_details(place_id)
                    summary = place_details.get("editorial_summary", {}).get("overview")
                    if not summary:
                        continue
                except Exception as e:
                    print(f"Error fetching place details for {place_id}: {e}")
                    continue

                name = place_details.get("name")
                address = place_details.get("vicinity")
                website = place_details.get("website")

                photos = place_details.get("photos", [])
                geometry = place_details.get("geometry", {})
                location = geometry.get("location", {})
                lat_restaurant = location.get("lat")
                lng_restaurant = location.get("lng")

                photo_urls = get_photo_urls(photos)

                # Extract cuisine and neighborhood
                cuisine = extract_cuisine(place_details)
                neighborhood = None

                if lat_restaurant and lng_restaurant:
                    neighborhood = assign_neighborhood(
                        lat_restaurant, lng_restaurant, neighborhood_list
                    )
                else:
                    # Fallback to existing method if coordinates are missing
                    neighborhood = "NONE"

                result = {
                    "id": place_id,
                    "name": name,
                    "location": address,
                    "neighborhood": neighborhood,
                    "link": website,
                    "description": summary,
                    "cuisine": cuisine,
                    "images": photo_urls,
                }

                results.append(result)

            detailed_results.extend(results)

            # Respect rate limits
            time.sleep(1)
        print(detailed_results)
        print(
            f"Processed grid point {index + 1}/{len(grid_points)}, total entries collected: {len(detailed_results)}"
        )

        # Optionally, stop after collecting a certain number of entries
        # if len(detailed_results) >= DESIRED_NUMBER_OF_ENTRIES:
        #     break

    # Write to JSON file
    with open("manhattan_restaurants.json", "w") as f:
        json.dump(detailed_results, f, indent=2)

    print(f"Collected {len(detailed_results)} restaurant entries.")


if __name__ == "__main__":
    main()
