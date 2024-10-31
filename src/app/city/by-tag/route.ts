import { NextResponse } from 'next/server';
import addresses from '../../../utils/data/address.json';

export async function GET(req: Request) {
  console.log('API route /api/city/by-tag hit');
  const url = new URL(req.url);
  const tag = url.searchParams.get('tag');
  const isActive = url.searchParams.get('isActive') === 'true';

  if (!req.headers.get('Authorization') || req.headers.get('Authorization') !== 'Bearer dGhlc2VjcmV0dG9rZW4=') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const city = addresses.cities.find(c => c.tag === tag && c.isActive === isActive);

  if (city) {
    return NextResponse.json({ cities: [city] }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'City not found' }, { status: 404 });
  }
}
