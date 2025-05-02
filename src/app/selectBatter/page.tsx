import SelectBatterTable from '../components/members';
import Link from "next/link";

export default function SelectBatter() {
    return(
        <div>
            <h1 className="text-2xl font-bold mt-4 text-center">スタメン選択</h1>
            <SelectBatterTable rowCount={9} />
            
            <div className="mb-6 mx-auto text-center">
                <Link href="/" className="text-blue-500 hover:underline">
                    トップページ
                </Link>
            </div>
        </div>
    );
}
