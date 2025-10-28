"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export const tokenProvider = async () => {
    const user = await currentUser();

    if(!user) throw new Error('User is not logged in');
    if(!apiKey) throw new Error('No API Key');
    if(!apiSecret) throw new Error('No API Secret');

    const client = new StreamClient(apiKey, apiSecret);

  //exp is optional by default it will be 1 hour
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000);
    const token = client.createToken(user.id, exp, issued);
    return token;

}
