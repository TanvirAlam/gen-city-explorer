import { NextResponse } from 'next/server';
import addresses from '~/utils/data/address.json';

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || authHeader !== 'Bearer dGhlc2VjcmV0dG9rZW4=') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!from || !to) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const fromCity = addresses.cities.find(c => c.guid === from);
  const toCity = addresses.cities.find(c => c.guid === to);

  if (fromCity && toCity) {
    const distance = haversine(fromCity.latitude, fromCity.longitude, toCity.latitude, toCity.longitude);
    return NextResponse.json({
      from: { guid: fromCity.guid },
      to: { guid: toCity.guid },
      unit: 'km',
      distance: distance.toFixed(2),
    }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'City not found' }, { status: 404 });
  }
}
