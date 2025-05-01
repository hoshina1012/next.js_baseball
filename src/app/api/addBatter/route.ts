import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request){
    try{
        const {name,year,age,
            AB,H,double,triple,HR,RBI,
            K,BB,SH,SF,SB} = await req.json();

        const check = await prisma.batters.findFirst({
            where: {
                name,
                year: parseInt(year),
                age: parseInt(age),
            }
        })

        if(check){
            return NextResponse.json({message:"既に登録されています"},{status:400})
        }

        const findUserId = await prisma.batters.findFirst({
            orderBy :{id:"desc"}
        })

        const newId = (findUserId?.id ?? 0) + 1;

        const newBatter = await prisma.batters.create({
            data:{id:newId,
                name,
                year: parseInt(year),
                age: parseInt(age),
                AB: parseInt(AB),
                H: parseInt(H),
                double: parseInt(double),
                triple: parseInt(triple),
                HR: parseInt(HR),
                RBI: parseInt(RBI),
                K: parseInt(K),
                BB: parseInt(BB),
                SH: parseInt(SH),
                SF: parseInt(SF),
                SB: parseInt(SB)
            }
        })

        return NextResponse.json({message:"登録成功"},{status:200})
    } catch(error){
        console.log("error:" + error)
        return NextResponse.json({message:"サーバーエラー"},{status:500})
    }
}