import { createContext,useState } from "react";


export const UserUpdation = createContext('')

function Updation({children})
{

 const [userDetails , SetuserDetails] = useState({})
    return(
        <UserUpdation.Provider value={{userDetails,SetuserDetails}}>
          {children}
        </UserUpdation.Provider>
    )
}

export default Updation;