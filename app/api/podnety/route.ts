import { NextRequest, NextResponse } from 'next/server';
import { getResponse } from '@/lib/completion';

export async function POST(req: NextRequest) {
    try {
        const stream = await req.json();
        const data = stream.images;

        if (data === undefined) {
            return NextResponse.json({ message: "Failed to read image A" }, { status: 500 });
        }

        const response = await getResponse(data);
        return NextResponse.json({ message: response }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to read image" }, { status: 500 });
    }
}