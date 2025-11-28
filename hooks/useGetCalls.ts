import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;

            setIsLoading(true);

            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ]
                    }
                });

                console.log("Fetched calls:", calls);
                setCalls(calls);
            } catch (error) {
                console.error("Error fetching calls:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadCalls();
    }, [client, user?.id]);

    const now = new Date();

    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now) || !!endedAt
    })

    const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
        // Log the date comparison for upcoming calls
        // console.log(`Call starts at: ${startsAt}, Now: ${now}, Is upcoming? ${startsAt && new Date(startsAt) > now}`);
        return startsAt && new Date(startsAt) > now
    })
    
    console.log("Calls summary:", { 
        total: calls.length, 
        upcoming: upcomingCalls.length, 
        ended: endedCalls.length 
    });

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}
