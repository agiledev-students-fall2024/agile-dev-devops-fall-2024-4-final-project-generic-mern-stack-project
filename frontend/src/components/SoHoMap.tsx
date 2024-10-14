type Poi = { key: string; location: google.maps.LatLngLiteral };
import { useEffect, useState, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import sampleStores from "@/stores";

const locations: Poi[] = sampleStores.map((store) => ({
  key: store._id,
  location: {
    lat: store.lat,
    lng: store.lng,
  },
}));

export default function SoHoMap() {
  return (
    <APIProvider
      apiKey={"AIzaSyBX6VqkGXWxsNGmZ45gHz4CGWHiRSgyhzI"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={16}
        defaultCenter={{ lat: 40.723115351278075, lng: -73.99867417832154 }}
        mapId="b9b9aae2738373ca"
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom,
          )
        }
      >
        <PoiMarkers pois={locations} />
      </Map>
    </APIProvider>
  );
}

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick = (ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("marker clicked:", ev.latLng.toString());
    map.panTo(ev.latLng);
  };

  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
          clickable={true}
          onClick={handleClick}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};
