import { NextResponse } from 'next/server';
import addresses from '~/utils/data/address.json';
import { City } from '~/utils/types';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const distance = parseFloat(url.searchParams.get('distance') || '0');
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || authHeader !== 'Bearer dGhlc2VjcmV0dG9rZW4=') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!from || isNaN(distance)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  const originCity = addresses.cities.find((city: City) => city.guid === from);

  if (!originCity) {
    return NextResponse.json({ error: 'Origin city not found' }, { status: 404 });
  }

  const resultId = '2152f96f-50c7-4d76-9e18-f7033bd14428';
  return NextResponse.json(
    { resultsUrl: `http://127.0.0.1:8080/api/city/area-result/${resultId}` },
    { status: 202 }
  );
}
