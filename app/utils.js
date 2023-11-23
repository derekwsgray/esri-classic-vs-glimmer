export function generateRandomCoordinates() {
  const latRange = [-80, 80];
  const longRange = [-150, 150];
  const numPoints = Math.floor(Math.random() * 6) + 3; // Random number of points between 3 and 8

  let lastLat = Math.random() * (latRange[1] - latRange[0]) + latRange[0];
  let lastLong = Math.random() * (longRange[1] - longRange[0]) + longRange[0];

  const coordinates = [[lastLong, lastLat]];

  for (let i = 1; i < numPoints; i++) {
    const deltaLat = Math.random() * 10 - 1; // Small latitude change
    const deltaLong = Math.random() * 10 - 1; // Small longitude change

    // Calculate new coordinates, ensuring they stay within legal limits
    const newLat = Math.max(
      Math.min(lastLat + deltaLat, latRange[1]),
      latRange[0],
    );
    const newLong = Math.max(
      Math.min(lastLong + deltaLong, longRange[1]),
      longRange[0],
    );

    coordinates.push([newLong, newLat]);

    // Update last coordinates
    lastLat = newLat;
    lastLong = newLong;
  }

  return coordinates;
}
