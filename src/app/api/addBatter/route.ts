import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request){
    try{
        const {name,year,age,
            AB,H,double,triple,HR,RBI,
            K,BB,SH,SF,SB} = await req.json();

        const check = await prisma.batters.FindFirst({
            where :{name,year,age}
        })

        if(check){
            return NextResponse.json({message:"既に登録されています"},{status:400})
        }

        const findUserId = await prisma.batters.FindFirst({
            orderBy :{id:"desc"}
        })

        const newId = findUserId + 1;

        const newBatter = await prisma.batters.create({
            data:{id:newId,
                name,year,age,
                AB,H,double,triple,HR,RBI,
                K,BB,SH,SF,SB}
        })

        return NextResponse.json({message:"登録成功"},{status:200})
    } catch(error){
        return NextResponse.json({message:"サーバーエラー"},{status:500})
    }
}