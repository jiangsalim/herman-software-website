useEffect(() => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!apiKey || !mapRef.current) return;

  const loader = new Loader({
    apiKey,
    version: "weekly",
    libraries: ["places"],
  });

  loader
    .importLibrary("maps")
    .then(({ Map }) => {
      if (!mapRef.current) return;

      const map = new Map(mapRef.current, {
        center: OFFICE_LOCATION,
        zoom: 15,
        mapId: "HERMAN_MAP",
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
      const { AdvancedMarkerElement } = (window as any).google.maps.marker || {};
      if (AdvancedMarkerElement) {
        new AdvancedMarkerElement({
          position: OFFICE_LOCATION,
          map,
          title: "HERMAN Software Solutions",
        });
      } else {
        new (window as any).google.maps.Marker({
          position: OFFICE_LOCATION,
          map,
          title: "HERMAN Software Solutions",
        });
      }

      googleMapRef.current = map;
      searchPlaces(map);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Google Maps failed to load:", err);
      setMapError(true);
      setLoading(false);
    });
}, []);