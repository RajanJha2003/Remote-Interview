import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";


const useMeetingActions=()=>{
    const router = useRouter();
    const client = useStreamVideoClient();

    const createInstantMeeting=async()=>{
        if(!client) return;
        try {
            const id=crypto.randomUUID();
            const call=client.call("default",id);

            await call.getOrCreate({
                data:{
                    starts_at:new Date().toISOString(),
                    custom:{
                        description:"Instant meeting"
                    }
                }
            })

            router.push(`/meeting/${call.id}`)
            toast.success("Meeting started")

        } catch (error) {
            console.error(error);
            toast.error("Failed to create meeting")
            
        }
    }

    const joinMeeting=(callId:string)=>{
        if(!client) return;
        router.push(`/meeting/${callId}`)

    }

    return {createInstantMeeting,joinMeeting}
}

export default useMeetingActions;