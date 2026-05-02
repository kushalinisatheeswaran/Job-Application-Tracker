import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { redirect } from "next/dist/client/components/navigation";
import { initialize } from "next/dist/server/lib/render-server";
import { headers } from "next/headers";
import { initializeUserBoard } from "../init-user-board";

const client = new MongoClient(process.env.MONGODB_URI!, {
  tls: true,
});
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
// await client.connect(); 
const db =client.db("job-board");

export const auth = betterAuth({
    database: mongodbAdapter(db,{
        client,
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge:60 * 60,
        },
    },

    emailAndPassword:{
        enabled:true,
    },
    databseHooks:{
        user:{
            create:{
                after : async(user) =>{
                    if(user.id){
                    await initializeUserBoard(user.id);
                    }
                   
                }
            }
        }
    }
});

export async function getSession() {
    const result = await auth.api.getSession({
        headers:await headers()
    })
    return result;
}

export async function signOut() {
    const result = await auth.api.signOut({
        headers:await headers()
    })

    if(result.success){
        redirect("/sign-in");
    }
}