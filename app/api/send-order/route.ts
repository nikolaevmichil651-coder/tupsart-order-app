import { NextRequest, NextResponse } from 'next/server';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req: Request) {
  if (!TOKEN || !CHAT_ID) {
    return new Response('Missing Telegram configuration', { status: 500 });
  }
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const service = formData.get('service') as string | null;
    const files = formData.getAll('files') as File[];

    // Validate total file size
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_BYTES) {
      return new Response('Total file size exceeds 15MB', { status: 400 });
    }

    // Compose text message in Russian
    const text = `\u041d\u043e\u0432\u044b\u0439 \u0437\u0430\u043a\u0430\u0437:\n\u0418\u043c\u044f: ${name ?? ''}\n\u0422\u0435\u043b\u0435\u0444\u043e\u043d: ${phone ?? ''}\n\u0423\u0441\u043b\u0443\u0433\u0430: ${service ?? ''}`;
    // Use sendMessage with GET query to handle encoding
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;
    await fetch(url);

    // Send each file as document preserving quality
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });
      const fd = new FormData();
      fd.append('chat_id', CHAT_ID!);
      fd.append('document', blob, file.name);
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendDocument`, {
        method: 'POST',
        body: fd,
      });
    }

    return new Response('ok');
  } catch (err: any) {
    console.error(err);
    return new Response('Error processing request', { status: 500 });
  }
}
