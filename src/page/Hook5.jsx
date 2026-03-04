import { useEffect, useState } from "react"


const Hook5 = () => {
    //code body
    const [text, setText] = useState('')
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('task')
            return saved ? JSON.parse(saved) : []
        } catch (error) {
            return []
        }
    })

    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(tasks))
    }, [tasks])

    const [isDark, setIsDark] = useState(false)

    const handleAdd = (e) => {

        e.preventDefault()

        if (!text.trim()) return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
        }

        setTasks(prev => [...prev, newTask])

        setText('')
    }

    const handleDelete = (id) => {
        setTasks(prev => prev.filter(item => item.id !== id))
    }

    const handleEdit = (item) => {
        setEditId(item.id)
        setEditText(item.text)
    }

    const handleSaveEdit = () => {
        setTasks(prev => prev.map(item => item.id === editId ? { ...item, text: editText } : item))
        setEditId(null)
        setEditText('')
    }

    const handleCancel = () => {
        setEditId(null)
        setEditText('')
    }
    return (
        <div className={`${isDark ? "bg-gray-900 text-white" : "bg-amber-100"} min-h-screen transition-all `}>

            <div className={`p-4 flex justify-center font-semibold mb-10 max-w-lg m-auto border-b border-gray-400`}>

                <h1 className="flex flex-1 text-2xl justify-center font-bold">Todo App</h1>

                <button onClick={() => setIsDark(prev => !prev)} className={`${isDark ? "bg-white text-black" : "bg-gray-900 text-white"} rounded-lg py-1 px-3 text-[10px] cursor-pointer `}>Dark Mode</button>
            </div>

            <form onSubmit={handleAdd}>
                <div className="flex justify-center gap-3">
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder="add task..." className="outline-none shadow-sm py-2 w-70 p-4 rounded-lg bg-white text-black" />
                    <button className="shadow-sm py-1 px-5 rounded-lg bg-white text-black font-semibold">Add</button>
                </div>
            </form>

            <ul className="max-w-lg m-auto flex flex-col gap-2 mt-10 px-4">
                {tasks.length === 0 && <p className="text-center text-gray-500">No Task !</p>}
                {
                    tasks.map((item) => (
                        <li key={item.id} className="flex gap-2 items-center text-black">
                            {
                                editId === item.id ? (
                                    <div className="flex w-full gap-2">

                                        <input value={editText} onChange={(e) => setEditText(e.target.value)} className={`${editId ? "border border-amber-500" : ""} flex flex-1 shadow-sm w-70 p-4 rounded-lg bg-white text-black outline-none`} />

                                        <div className="flex gap-2">
                                            <button onClick={handleSaveEdit} className="bg-green-500 px-3 rounded-md">save</button>
                                            <button onClick={handleCancel} className="bg-red-500 px-3 rounded-md">canel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex w-full gap-2">

                                        <span className="flex flex-1 shadow-sm  p-4 rounded-lg bg-white text-black">{item.text}</span>

                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(item)} className="bg-orange-400 px-3 rounded-md">edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 px-3 rounded-md">delete</button>
                                        </div>
                                    </div>

                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default Hook5