import { prisma } from './prisma';

export const GeoService = {
  /**
   * Finds lawyers based on specialty, coordinates and distance.
   * Priority: Elite > Professional > Rating > Proximity
   */
  async findLawyers(params: {
    specialty?: string;
    lat?: number;
    lng?: number;
    radiusKm?: number;
  }) {
    const { specialty, lat, lng, radiusKm = 50 } = params;

    const lawyers = await prisma.lawyerProfile.findMany({
      where: {
        Subscription_Status: 'active',
        ...(specialty && { Specialties: { has: specialty } }),
      },
    });

    // Haversine formula for distance filtering
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Earth radius in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const filteredLawyers = lawyers.map(l => {
        let distance = Infinity;
        if (lat && lng && l.Lat && l.Long) {
            distance = calculateDistance(lat, lng, l.Lat, l.Long);
        }
        return { ...l, distance };
    }).filter(l => l.distance <= radiusKm);

    // Sorting Logic
    return filteredLawyers.sort((a, b) => {
        // 1. Plan Priority
        const planWeight: any = { Elite: 3, Professional: 2, Essential: 1 };
        if (planWeight[b.Plan_Level] !== planWeight[a.Plan_Level]) {
            return planWeight[b.Plan_Level] - planWeight[a.Plan_Level];
        }
        // 2. Rating
        if (b.Rating !== a.Rating) {
            return b.Rating - a.Rating;
        }
        // 3. Proximity
        return a.distance - b.distance;
    });
  }
};
