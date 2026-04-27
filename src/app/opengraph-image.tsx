import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ProHotelClub - Exclusive B2B SaaS platform for travel agents';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f4eee6, #e8dfd3)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            width: '100%',
            height: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 800,
              color: '#1a3328', // evergreen-forest
              marginBottom: '20px',
              fontFamily: 'system-ui, sans-serif',
              textAlign: 'center',
            }}
          >
            ProHotelClub
          </h1>
          <p
            style={{
              fontSize: '40px',
              color: '#8b847c', // secondary-text
              textAlign: 'center',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Exclusive B2B SaaS platform for travel agents
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
