"use client";

import { useState, useEffect, useRef } from "react";

const AMENITY_TYPES = [
  { value: "restaurant", label: "🍽️ Restaurants", icon: "🍽️" },
  { value: "cafe", label: "☕ Cafes", icon: "☕" },
  { value: "park", label: "🌳 Parks", icon: "🌳" },
  { value: "bank", label: "🏦 Banks", icon: "🏦" },
  { value: "hospital", label: "🏥 Hospitals", icon: "🏥" },
  { value: "pharmacy", label: "💊 Pharmacies", icon: "💊" },
  { value: "hotel", label: "🏨 Hotels", icon: "🏨" },
  { value: "parking", label: "🅿️ Parking", icon: "🅿️" },
];

const OFFICE_LOCATION = { lat: 0.4397, lng: 33.2030 }; // Jinja, Uganda

export function AmenityMap() {
  const [selectedAmenity, setSelectedAmenity] = useState("restaurant");
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Load Google Maps
  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = () => {
      const google = (window as any).google;
      if (!google) return;

      const map = new google.maps.Map(mapRef.current!, {
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

      // Office marker
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
    };

    // Load Google Maps script if not already loaded
    if (!(window as any).google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  const searchPlaces = (google: any, map: any, type: string) => {
    if (!google || !map) return;

    setLoading(true);

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: OFFICE_LOCATION,
      radius: 2000,
      type: type,
    };

    service.nearbySearch(request, (results: any[], status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results.slice(0, 10));

        results.slice(0, 10).forEach((place: any) => {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
            icon: {
              url: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="%2300C2BA" stroke="%23FFFFFF" stroke-width="1.5"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`,
              scaledSize: new google.maps.Size(30, 30),
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="font-family:sans-serif;padding:4px;"><strong>${place.name}</strong><br/><small>${place.vicinity || ""}</small><br/>⭐ ${place.rating || "N/A"} (${place.user_ratings_total || 0})</div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
        });
      }
      setLoading(false);
    });
  };

  const handleAmenityChange = (type: string) => {
    setSelectedAmenity(type);
    if (googleMapRef.current && (window as any).google) {
      searchPlaces((window as any).google, googleMapRef.current, type);
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

        {/* Amenity Pills */}
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

        {/* Map + List */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden border border-gray-light shadow-sm" style={{ minHeight: "400px" }}>
            <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
          </div>

          {/* Places List */}
          <div className="bg-white rounded-xl border border-gray-light p-4 max-h-[400px] overflow-y-auto">
            <h4 className="text-h5 font-semibold text-navy mb-3">
              Nearby {AMENITY_TYPES.find((a) => a.value === selectedAmenity)?.label}
            </h4>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse flex gap-3">
                    <div className="w-8 h-8 bg-gray-light rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-light rounded w-3/4" />
                      <div className="h-3 bg-gray-light rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : places.length > 0 ? (
              <ul className="space-y-3">
                {places.map((place, i) => (
                  <li key={i} className="flex gap-3 pb-3 border-b border-gray-light last:border-0">
                    <span className="text-lg flex-shrink-0">
                      {AMENITY_TYPES.find((a) => a.value === selectedAmenity)?.icon}
                    </span>
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
            ) : (
              <p className="text-sm text-charcoal text-center py-8">No places found nearby.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}