import addresses from '~/utils/data/address.json';

export async function GET() {
  return new Response(JSON.stringify(addresses.cities), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
