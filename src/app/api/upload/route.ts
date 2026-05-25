import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.YANDEX_S3_REGION || 'ru-central1',
  endpoint: process.env.YANDEX_S3_ENDPOINT || 'https://storage.yandexcloud.net',
  credentials: {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.YANDEX_S3_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // sanitize filename
    const filename = `uploads/${uniqueSuffix}-${originalName}`;

    const bucketName = process.env.YANDEX_S3_BUCKET_NAME || 'arina-reels-storage';

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
      // For public access:
      ACL: 'public-read',
    });

    await s3Client.send(command);

    const publicUrl = `${process.env.YANDEX_S3_ENDPOINT}/${bucketName}/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
