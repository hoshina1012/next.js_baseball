"use client";
import { useEffect, useState } from 'react';

export default function selectBatter() {
    // 各行に対応する選択肢を格納する状態
    const [names, setNames] = useState<string[][]>(Array(9).fill([])); // 行ごとの名前
    const [years, setYears] = useState<number[][]>(Array(9).fill([])); // 行ごとの年
    const [selectedNames, setSelectedNames] = useState<string[]>(new Array(9).fill(''));
    const [selectedYears, setSelectedYears] = useState<(number | '')[]>(new Array(9).fill(''));
    const [batters, setBatters] = useState<(any | null)[]>(new Array(9).fill(null));


    useEffect(() => {
        fetchData();
    }, [selectedNames, selectedYears]);

    async function fetchData() {
        const promises = selectedNames.map(async (name, index) => {
            const year = selectedYears[index];
            const res = await fetch(`/api/selectBatter?name=${name}&year=${year}`);
            const data = await res.json();
            return data;
        });
    
        const results = await Promise.all(promises);
    
        const newNames = results.map(r => r.names);
        const newYears = results.map(r => r.years);
        const newBatters = results.map(r => r.batter);
    
        setNames(newNames);
        setYears(newYears);
        setBatters(newBatters);
    }

    const handleNameChange = (index: number, value: string) => {
        const newSelectedNames = [...selectedNames];
        newSelectedNames[index] = value;
        setSelectedNames(newSelectedNames);
    };

    const handleYearChange = (index: number, value: number | '') => {
        const newSelectedYears = [...selectedYears];
        newSelectedYears[index] = value;
        setSelectedYears(newSelectedYears);
    };

    return (
        <div className="mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">スタメン選択</h1>
            <table className="border-collapse border border-gray-300 mx-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">名前</th>
                        <th className="border p-2">年</th>
                        <th className="border p-2">年齢</th>
                        <th className="border p-2">打数</th>
                        <th className="border p-2">安打</th>
                        <th className="border p-2">二塁打</th>
                        <th className="border p-2">三塁打</th>
                        <th className="border p-2">本塁打</th>
                        <th className="border p-2">打点</th>
                        <th className="border p-2">三振</th>
                        <th className="border p-2">四死球</th>
                        <th className="border p-2">犠打</th>
                        <th className="border p-2">犠飛</th>
                        <th className="border p-2">盗塁</th>
                        <th className="border p-2">打率</th>
                        <th className="border p-2">出塁率</th>
                        <th className="border p-2">長打率</th>
                        <th className="border p-2">OPS</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(9)].map((_, index) => {
                        const batter = batters[index];
                        return (
                            <tr key={index} className="border">
                                <td className="border p-2">
                                    <select
                                        className="border p-2 mr-2"
                                        value={selectedNames[index]}
                                        onChange={(e) => handleNameChange(index, e.target.value)}
                                    >
                                        <option value="">名前を選択</option>
                                        {names[index].map((name) => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <select
                                        className="border p-2"
                                        value={selectedYears[index]}
                                        onChange={(e) => handleYearChange(index, e.target.value ? Number(e.target.value) : '')}
                                    >
                                        <option value="">年を選択</option>
                                        {years[index].map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2 text-right">{batter ? batter.age : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.AB : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.H : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.double : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.triple : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.HR : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.RBI : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.K : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.BB : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.SH : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.SF : '-'}</td>
                                <td className="border p-2 text-right">{batter ? batter.SB : '-'}</td>
                                <td className="border p-2 text-right">{batter ? (batter.H / batter.AB).toFixed(3) : '-'}</td>
                                <td className="border p-2 text-right">{batter ? ((batter.H + batter.BB) / (batter.AB + batter.BB + batter.SF)).toFixed(3) : '-'}</td>
                                <td className="border p-2 text-right">{batter ? ((batter.H + batter.double + batter.triple * 2 + batter.HR * 3) / batter.AB).toFixed(3) : '-'}</td>
                                <td className="border p-2 text-right">{batter ? (((batter.H + batter.BB) / (batter.AB + batter.BB + batter.SF)) + ((batter.H + batter.double + batter.triple * 2 + batter.HR * 3) / batter.AB)).toFixed(3) : '-'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
