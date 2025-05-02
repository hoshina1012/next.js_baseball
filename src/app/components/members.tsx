"use client";
import { useEffect, useState } from 'react';

export default function SelectBatterTable({ rowCount }: { rowCount: number }) {
    const [names, setNames] = useState<string[][]>(Array(rowCount).fill([]));
    const [years, setYears] = useState<number[][]>(Array(rowCount).fill([]));
    const [selectedNames, setSelectedNames] = useState<string[]>(new Array(rowCount).fill(''));
    const [selectedYears, setSelectedYears] = useState<(number | '')[]>(new Array(rowCount).fill(''));
    const [batters, setBatters] = useState<(any | null)[]>(new Array(rowCount).fill(null));

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
        setNames(results.map(r => r.names));
        setYears(results.map(r => r.years));
        setBatters(results.map(r => r.batter));
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
        <div className="mx-auto p-4">
            <table className="border-collapse border border-gray-300 mx-auto">
                <thead>
                    <tr className="bg-gray-100">
                        {[
                            '名前', '年', '年齢', '打数', '安打', '二塁打', '三塁打', '本塁打', '打点', '三振',
                            '四死球', '犠打', '犠飛', '盗塁', '打率', '出塁率', '長打率', 'OPS'
                        ].map(header => (
                            <th key={header} className="border p-2">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCount)].map((_, index) => {
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
