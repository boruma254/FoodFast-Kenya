import * as Location from "expo-location";

export const useLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Location permission denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error("Error getting location:", error);
    throw error;
  }
};

export const useReverseGeocoding = async (
  latitude: number,
  longitude: number,
) => {
  try {
    const result = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (result.length > 0) {
      const address = result[0];
      return `${address.street}, ${address.city}`;
    }
    return "Unknown location";
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "Unknown location";
  }
};
