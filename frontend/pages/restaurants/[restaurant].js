//This is an example for routing
import {useRouter} from "next/router"


export default function Restaurant() {
    const router = useRouter()    
   
    return (
        <div>
        <h1>Dynamic Restaurant Page {router.query.restaurant}</h1>
        </div>      
    )
}
