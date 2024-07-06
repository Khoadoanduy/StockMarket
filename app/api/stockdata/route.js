
import yahooFinance from 'yahoo-finance2';
import { NextResponse } from "next/server";

export async function POST(req) {
    const request = await req.json();
    const { symbol, startDate, endDate } = request;

    if (!symbol) {
        return NextResponse.json(
            { message: "Symbol missing" },
            { status: 400 }
        );
    }

    try {
        const quote = await yahooFinance.quote(symbol);
        const searchResults = await yahooFinance.search(symbol);

        let historical;
        if (startDate && endDate) {
            historical = await yahooFinance.historical(symbol, {
                period1: startDate,
                period2: endDate,
            });
        }

        return NextResponse.json({
            quote,
            historical: historical || 'Historical data not requested',
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error fetching quote" },
            { status: 500 }
        );
    }
}
