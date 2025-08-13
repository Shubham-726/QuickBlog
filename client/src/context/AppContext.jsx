import { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL; //base url to make api call
//“For every HTTP request you make with axios, automatically start the URL with whatever value is inside
//  VITE_BASE_URL from your environment variables.”

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null) //store token in browser local storage
    const [blogs, setBlogs] = useState([]) //here we store all blog data
    const [input, setInput] = useState("") //

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all'); //since we have already included base url we add only remaining url
            data.success ? setBlogs(data.blogs) : toast.error(data.message)  //if data fetch fail  error notification will come
            //react hot toast is userd for notification
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`; //this token is add to all api call whenever admin login
        }
    }, [])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }  //since we are passing these element to vaue and value is shared among all component we will abkle to access everything

    return (
        <AppContext.Provider value={value}>  {/* any data in value we can access it in any other component*/}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext) //to use context data we have to use useContext hook
};