import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    let name = searchParams.get('name');
    let year = searchParams.get('year');

    const whereName = year ? { year: Number(year) } : undefined;
    const whereYear = name ? { name: name } : undefined;

    try {
        const nameResults = await prisma.batters.findMany({
            where: whereName,
            distinct: ['name'],
            orderBy: { name: 'asc' },
        });

        const yearResults = await prisma.batters.findMany({
            where: whereYear,
            distinct: ['year'],
            orderBy: { year: 'asc' },
        });

        let batter = null;
        if (name && year) {
            batter = await prisma.batters.findFirst({
                where: {
                    name,
                    year: Number(year),
                },
                select: {
                    age: true,
                    AB: true,
                    H: true,
                    double: true,
                    triple: true,
                    HR: true,
                    RBI: true,
                    K: true,
                    BB: true,
                    SH: true,
                    SF: true,
                    SB: true,
                },
            });
        }

        return NextResponse.json({
            names: nameResults.map((r) => r.name),
            years: yearResults.map((r) => r.year),
            batter,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
    }
}
