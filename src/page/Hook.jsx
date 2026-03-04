import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'

const Hook = () => {

    const initialState = {
        username: "",
        email: "",
        password: "",
        role: "user"
    }

    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setState((prev) => {
            return {
                ...prev, [name]: value
            }
        }
        )
    }
    console.log(state)

    const handleSubmit = (e) => {

        e.preventDefault()

        if (!state.username || !state.email || !state.password || !state.role) return toast.error('please fill all empty field')

        if (state.role !== 'user') return toast.error('invalid role')

        toast.success('login success')

        console.log(state)

        setState(initialState)
    }
    return (
        <div className="h-screen flex items-center justify-center bg-amber-400">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-6 rounded-tr-[100px] rounded-bl-[100px] w-120 py-10 shadow-md bg-amber-100">
                    <h1 className="text-2xl font-semibold">Sign in</h1>
                    <input name="username" value={state.username} onChange={handleChange} type="text" placeholder="name" className="p-2 shadow shadow-amber-500 w-100 rounded-lg outline-none" />
                    <input name="email" value={state.email} onChange={handleChange} type="text" placeholder="email" className="p-2 shadow shadow-amber-500 w-100 rounded-lg outline-none" />
                    <input name="password" value={state.password} onChange={handleChange} type="text" placeholder="password" className="p-2 shadow shadow-amber-500 w-100 rounded-lg outline-none" />
                    <select name="role" value={state.role} onChange={handleChange} type="text" placeholder="role" className="p-2 shadow shadow-amber-500 w-100 rounded-lg outline-none">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="bg-amber-300 py-1 px-3 rounded-lg cursor-pointer hover:text-white hover:bg-amber-600 duration-500 " type="submit">submit</button>
                </div>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    )
}
export default Hook