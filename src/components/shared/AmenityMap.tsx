"use client";

import { useState, useEffect, useRef } from "react";

const AMENITY_TYPES = [
  { value: "restaurant", label: "Restaurants", icon: "🍽️" },
  { value: "cafe", label: "Cafes", icon: "☕" },
  { value: "park", label: "Parks", icon: "🌳" },
  { value: "bank", label: "Banks", icon: "🏦" },
  { value: "hospital", label: "Hospitals", icon: "🏥" },
  { value: "pharmacy", label: "Pharmacies", icon: "💊" },
  { value: "hotel", label: "Hotels", icon: "🏨" },
  { value: "parking", label: "Parking", icon: "🅿️" },
];

const OFFICE_LOCATION = { lat: 0.4397, lng: 33.2030 };

export function AmenityMap() {
  const [selectedAmenity, setSelectedAmenity] = useState("restaurant");
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey || !mapRef.current) return;

    if ((window as any).google?.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.onload = () => initMap();
    script.onerror = () => {
      setMapError(true);
      setLoading(false);
    };
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const google = (window as any).google;
    if (!google?.maps || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: OFFICE_LOCATION,
      zoom: 15,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
      ],
    });

    new google.maps.Marker({
      position: OFFICE_LOCATION,
      map,
      title: "HERMAN Software Solutions",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#0A1F3F",
        fillOpacity: 1,
        strokeColor: "#00C2BA",
        strokeWeight: 3,
      },
    });

    googleMapRef.current = map;
    searchPlaces(google, map, selectedAmenity);
    setLoading(false);
  };

  const searchPlaces = (google: any, map: any, type: string) => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const request = { location: OFFICE_LOCATION, radius: 2000, type };
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results: any[], status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results.slice(0, 10));
        results.slice(0, 10).forEach((place: any) => {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
          });
          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="font-family:sans-serif;padding:4px;"><strong>${place.name}</strong><br/><small>${place.vicinity || ""}</small><br/>⭐ ${place.rating || "N/A"}</div>`,
          });
          marker.addListener("click", () => infoWindow.open(map, marker));
          markersRef.current.push(marker);
        });
      }
    });
  };

  const handleAmenityChange = (type: string) => {
    setSelectedAmenity(type);
    const google = (window as any).google;
    if (googleMapRef.current && google?.maps) {
      searchPlaces(google, googleMapRef.current, type);
    }
  };

  return (
    <section className="section-padding bg-gray-light">
      <div className="container-site">
        <div className="text-center mb-8">
          <h2 className="text-h3 text-navy mb-2">Explore Around Our Office</h2>
          <p className="text-body text-charcoal max-w-xl mx-auto">
            Discover nearby restaurants, cafes, parks, and more around our Jinja office.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {AMENITY_TYPES.map((amenity) => (
            <button
              key={amenity.value}
              onClick={() => handleAmenityChange(amenity.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedAmenity === amenity.value
                  ? "bg-teal text-white shadow-md"
                  : "bg-white text-charcoal border border-gray-light hover:border-teal hover:text-teal"
              }`}
            >
              {amenity.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map — always visible */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden border border-gray-light shadow-sm relative" style={{ minHeight: "400px" }}>
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 rounded-xl">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-charcoal">Loading map...</p>
                </div>
              </div>
            )}
            {/* Map container — ALWAYS rendered at full height */}
            <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
          </div>

          {/* Places List */}
          <div className="bg-white rounded-xl border border-gray-light p-4 max-h-[400px] overflow-y-auto">
            <h4 className="text-h5 font-semibold text-navy mb-3">
              Nearby {AMENITY_TYPES.find((a) => a.value === selectedAmenity)?.label}
            </h4>
            {places.length > 0 ? (
              <ul className="space-y-3">
                {places.map((place, i) => (
                  <li key={i} className="flex gap-3 pb-3 border-b border-gray-light last:border-0">
                    <span className="text-lg flex-shrink-0">{AMENITY_TYPES.find((a) => a.value === selectedAmenity)?.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy truncate">{place.name}</p>
                      <p className="text-xs text-charcoal truncate">{place.vicinity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-yellow-600">⭐ {place.rating || "N/A"}</span>
                        <span className="text-xs text-gray-medium">({place.user_ratings_total || 0} reviews)</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : !loading && (
              <p className="text-sm text-charcoal text-center py-8">No places found nearby.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}