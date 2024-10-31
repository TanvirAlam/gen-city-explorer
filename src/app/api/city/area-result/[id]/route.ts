import { NextResponse } from 'next/server';
import addresses from '~/utils/data/address.json';
import { haversine } from '~/utils/mixins';
import { City } from '~/utils/types';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (id !== '2152f96f-50c7-4d76-9e18-f7033bd14428') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 404 });
  }

  // Assuming the origin city GUID and distance for demonstration purposes
  const originCityGuid = 'ed354fef-31d3-44a9-b92f-4a3bd7eb0408';
  const maxDistance = 250; // in kilometers

  const originCity = addresses.cities.find((city: City) => city.guid === originCityGuid);
  if (!originCity) {
    return NextResponse.json({ error: 'Origin city not found' }, { status: 404 });
  }

  // Find all cities within the specified distance
  const nearbyCities = addresses.cities.filter((city: City) => {
    const distance = haversine(originCity.latitude, originCity.longitude, city.latitude, city.longitude);
    return distance <= maxDistance && city.guid !== originCity.guid;
  });

  // Return the filtered cities
  return NextResponse.json(
    { cities: nearbyCities },
    { status: 200 }
  );
}
