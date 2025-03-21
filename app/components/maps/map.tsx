import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import {
  MdChevronLeft,
  MdChevronRight,
  MdLocationOn,
} from "react-icons/md";
import Image from "next/image";
import { Data, formProgress } from "@/lib/globals";
import "@/app/components/design/form.css";
import styles from "../design/styles";

interface Props {
  setState: Dispatch<SetStateAction<formProgress>>;
  setData: Dispatch<SetStateAction<Data>>;
}

export type Library =
  | "core"
  | "maps"
  | "places"
  | "geocoding"
  | "routes"
  | "marker"
  | "geometry"
  | "elevation"
  | "streetView"
  | "journeySharing"
  | "drawing"
  | "visualization";

const libraries: Library[] = ["places"];

export default function MapPickerForm({ setState, setData }: Props) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 48.1221, // Petržalka's latitude
    lng: 17.105, // Petržalka's longitude
  });

  const [error, setError] = useState<string | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "300px",
    borderRadius: "10px",
    gridRowStart: 1,
    gridColumnStart: 1,
    zIndex: 20,
  };

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleIdle = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        setCoordinates({ lat: center.lat(), lng: center.lng() });
      }
    }
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        if (mapRef.current) {
          mapRef.current.panTo({ lat: latitude, lng: longitude });
          mapRef.current.setZoom(14);
        }
      },
      (err) => {
        setError(err.message || "Unable to retrieve your location.");
      }
    );
  };

  const handleSearch = () => {
    const searchBox = searchBoxRef.current;
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const { geometry } = places[0];
        if (geometry && geometry.location) {
          const newCenter = {
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
          };
          setCoordinates(newCenter);
          if (mapRef.current) {
            mapRef.current.panTo(newCenter);
            mapRef.current.setZoom(14);
          }
        }
      }
    }
  };

  const handleConfirm = () => {
    if (coordinates) {
      setData((data) => ({
        ...data,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }));
      setState("ai tag selection");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  const [isFocused, setIsFocused] = React.useState(false);


  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className={styles.locationContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className="relative z-10">
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Lokácia</h2>
          <p className={styles.subtitle}>Vyber lokáciu pre svoj podnet</p>
        </div>

        <div className="space-y-4">
          <div className={styles.locationBox}>
            <MdLocationOn className={styles.locationIcon} />
            <div className={styles.locationInfo}>
              <h3 className={styles.locationTitle}>Presná lokácia</h3>
              <p className={styles.locationDescription}>Pomôž nám presne identifikovať miesto tvojho podnetu.</p>
            </div>
          </div>

          <div className={`${styles.searchContainer} rounded-lg transition-all ${isFocused ? "bg-white border " : "bg-gray-200"}`}>
    <StandaloneSearchBox
      onLoad={(ref) => (searchBoxRef.current = ref)}
      onPlacesChanged={handleSearch}
    >
      <input
        id="location-search"
        type="text"
        placeholder="Vyhľadať miesto"
        className={`${styles.searchInput} outline-none bg-transparent rounded-lg px-4 py-2`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </StandaloneSearchBox>
  </div>

          <div className={styles.mapContainer}>
            <div className={styles.mapOverlay}></div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={coordinates}
              onLoad={onMapLoad}
              onIdle={handleIdle}
            >
              <div className={styles.mapMarker}>
                <Image src="/marker.png" alt="Pointer" width={40} height={40} />
              </div>
            </GoogleMap>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button onClick={() => {getUserLocation(); handleConfirm()}} className={styles.fullWidthButton}>
            Použiť moju aktuálnu polohu
          </button>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.backButton} onClick={() => setState("image upload")}>
            <MdChevronLeft className="text-2xl" /> Späť
          </button>
          <button className={styles.nextButton} onClick={handleConfirm}>
            Ďalej <MdChevronRight className="text-2xl ml-1" />
          </button>
        </div>

        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}></div>
        </div>
      </div>
    </div>
  );
}
