"use client"
import { NextResponse } from "next/server";
import {useState} from "react";

export default function addBatter(){
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [age, setAge] = useState("");
    const [AB, setAB] = useState("");
    const [H, setH] = useState("");
    const [double, setDouble] = useState("");
    const [triple, setTriple] = useState("");
    const [HR, setHR] = useState("");
    const [RBI, setRBI] = useState("");
    const [K, setK] = useState("");
    const [BB, setBB] = useState("");
    const [SH, setSH] = useState("");
    const [SF, setSF] = useState("");
    const [SB, setSB] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const avg = Number(H) / Number(AB);
    const obp = (Number(H) + Number(BB)) / (Number(AB) + Number(BB) + Number(SF));
    const slg = (Number(H) + Number(double) + Number(triple) * 2 + Number(HR) * 3) / Number(AB);
    const ops = obp + slg;

    const batterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const res = await fetch("api/addBatter",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name,year,age,
                                       AB,H,double,triple,HR,RBI,
                                       K,BB,SH,SF,SB }),
            })

            if(!res.ok){
                if(res.status === 400){
                    setError("既に登録されています")
                    setMessage("")
                }else{
                    setError("登録できませんでした")
                    setMessage("")
                }
                return;
            }

            setMessage("登録に成功しました")
            setError("")

        }catch(error){
            setError("登録できませんでした")
            setMessage("")
        }
    }

    return(
        <div className="max-w-md mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">打者登録</h1>

            {message && <p className="text-green-500 text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={batterSubmit} className="space-y-4">
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">名前</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">年</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-12 font-medium text-right mr-2">年齢</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">打数</label>
                    <input
                        type="number"
                        value={AB}
                        onChange={(e) => setAB(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">安打</label>
                    <input
                        type="number"
                        value={H}
                        onChange={(e) => setH(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        max={AB}
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">二塁打</label>
                    <input
                        type="number"
                        value={double}
                        onChange={(e) => setDouble(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        max={Number(H)}
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">三塁打</label>
                    <input
                        type="number"
                        value={triple}
                        onChange={(e) => setTriple(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        max={Number(H) - Number(double)}
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">本塁打</label>
                    <input
                        type="number"
                        value={HR}
                        onChange={(e) => setHR(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        max={Number(H) - Number(double) - Number(triple)}
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">打点</label>
                    <input
                        type="number"
                        value={RBI}
                        onChange={(e) => setRBI(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        min={HR}
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">三振</label>
                    <input
                        type="number"
                        value={K}
                        onChange={(e) => setK(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        max={Number(AB) - Number(H)}
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">四死球</label>
                    <input
                        type="number"
                        value={BB}
                        onChange={(e) => setBB(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">犠打</label>
                    <input
                        type="number"
                        value={SH}
                        onChange={(e) => setSH(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">犠飛</label>
                    <input
                        type="number"
                        value={SF}
                        onChange={(e) => setSF(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-12 font-medium text-right mr-2">盗塁</label>
                    <input
                        type="number"
                        value={SB}
                        onChange={(e) => setSB(e.target.value)}
                        className="flex-1 px-2 border rounded"
                        min="0"
                        required
                    />
                </div>
                <div className="flex items-center mb-2">
                    <p className="w-12 font-medium text-right mr-2">打率</p>
                    <p>{isNaN(avg) || !isFinite(avg) ? "–" : avg.toFixed(3)}</p>
                </div>
                <div className="flex items-center mb-2">
                    <p className="w-12 font-medium text-right mr-2">出塁率</p>
                    <p>{isNaN(obp) || !isFinite(obp) ? "–" : obp.toFixed(3)}</p>
                </div>
                <div className="flex items-center mb-2">
                    <p className="w-12 font-medium text-right mr-2">長打率</p>
                    <p>{isNaN(slg) || !isFinite(slg) ? "–" : slg.toFixed(3)}</p>
                </div>
                <div className="flex items-center mb-2">
                    <p className="w-12 font-medium text-right mr-2">OPS</p>
                    <p>{isNaN(ops) || !isFinite(ops) ? "–" : ops.toFixed(3)}</p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    登録
                </button>
            </form>
        </div>
    )
}