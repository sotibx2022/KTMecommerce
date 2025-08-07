import { createProductCollection } from '@/app/services/typesence/typesenceProductSchema';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
    try {
        await createProductCollection();
        return NextResponse.json({ message: 'Typesense collection created successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create collection' });
    }
}
