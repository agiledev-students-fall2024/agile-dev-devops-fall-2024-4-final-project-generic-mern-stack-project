import requests

API_KEY = "AIzaSyDAHyMqP8wrpPg1sRE1kZraT-Z90UOfBK8"

LOCATION = '40.7685,73.9822' 
RADIUS = '15000'  # Search within 15km
TYPE = 'restaurant'

nearby_search_url = (
    f'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    f'?location={LOCATION}&radius={RADIUS}&type={TYPE}&key={API_KEY}'
)

response = requests.get(nearby_search_url)
results = response.json().get('results', [])

for place in results:
    place_id = place.get('place_id')
    name = place.get('name')
    address = place.get('vicinity')

    details_url = (
        f'https://maps.googleapis.com/maps/api/place/details/json'
        f'?place_id={place_id}&fields=name,website,photo,editorial_summary&key={API_KEY}'
    )
    details_response = requests.get(details_url)
    details_result = details_response.json().get('result', {})

    website = details_result.get('website')
    summary = details_result.get('editorial_summary')
    photos = details_result.get('photos', [])
    photo_urls = []
    for photo in photos:
        photo_reference = photo.get('photo_reference')
        if photo_reference:
            photo_url = (
                f'https://maps.googleapis.com/maps/api/place/photo'
                f'?maxwidth=400&photoreference={photo_reference}&key={API_KEY}'
            )
            photo_urls.append(photo_url)

    print(f"Name: {name}")
    print(f"Address: {address}")
    print(f"Website: {website}")
    print(f"Photos: {photo_urls}")
    print(f"Summary: {summary.get('overview')}")
    print('-' * 40)
