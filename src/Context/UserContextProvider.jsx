import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import axios from "axios"
import { BASE_URL } from "../utils/constants"


const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState("")

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;