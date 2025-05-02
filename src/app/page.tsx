"use client";
import Link from "next/link";
import SelectBatterTable from './components/members';

export default function selectBatter() {
    return (
        <div className="mx-auto mt-10 p-4">
            <div className="mb-6 mx-auto text-center">
                <Link href="/addBatter" className="text-blue-500 hover:underline">
                    打者を登録してみよう！
                </Link>
            </div>
            <div className="mb-6 mx-auto text-center">
                <Link href="/selectBatter" className="text-blue-500 hover:underline">
                    スタメンを組んでみよう！
                </Link>
            </div>

            <h1 className="text-2xl font-bold mt-4 text-center">登録した選手を見てみよう！</h1>
            <SelectBatterTable rowCount={1} />
        </div>
    );
}
