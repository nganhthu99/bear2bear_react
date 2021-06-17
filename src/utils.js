const getDistanceFromLatLonInKm = (position, destination) => {
    const { lat: lat1, lng: lng1 } = position;
    const { lat: lat2, lng: lng2 } = destination;
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLng = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = (R * c).toFixed(0);
    return d;
};

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export { getDistanceFromLatLonInKm };
