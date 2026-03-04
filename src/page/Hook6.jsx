import { useEffect, useState } from "react"


const Hook6 = () => {

    const [isDark, setIsDark] = useState(false)

    const [text, setText] = useState('')
    const [task, setTask] = useState(() => {
        try {
            const saved = localStorage.getItem('task')
            return saved ? JSON.parse(saved) : []
        } catch (error) {
            return []
        }
    })

    const [editText, setEditText] = useState('')
    const [editId, setEditId] = useState(null)

    const [filters, setFilters] = useState('all')

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(task))
    }, [task])


    const handleAdd = (e) => {
        e.preventDefault()

        if (!text.trim()) return

        const newValue = {
            id: Date.now(),
            text: text,
            completed: false,
        }

        setTask(prev => [...prev, newValue])

        setText('')
    }

    const handleDelete = (id) => {
        setTask(prev => prev.filter(item => item.id !== id))
    }

    const handleEdit = (item) => {
        if (item.completed) return
        setEditText(item.text)
        setEditId(item.id)
    }
    const handleSaveEdit = () => {
        if (!editText.trim()) return
        setTask(prev => prev.map(item => item.id === editId ? { ...item, text: editText } : item))
        setEditId(null)
        setEditText('')
    }
    const handleCancel = () => {
        setEditId(null)
        setEditText('')
    }

    const FilterTasks = task.filter(item => {
        if (filters === 'active') return !item.completed
        if (filters === 'completed') return item.completed
        return true
    })


    const handleToggle = (id) => {
        setTask(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item))
    }

    const total = task.length
    const active = task.filter(item => !item.completed).length
    const completed = task.filter(item => item.completed).length

    return (
        <div className="bg-gray-900">

            <div className={`${isDark ? "bg-blue-950 text-white" : "bg-blue-300"} min-h-screen max-w-170 m-auto transition-all duration-400 ease-in-out`}>
                <div className="flex bg-blue-300 p-4 text-[19px] shadow-lg">
                    <button
                        onClick={() => setIsDark(prev => !prev)}
                        className="rounded-md text-[12px] text-white bg-blue-900 px-1 cursor-pointer">Dark mode</button>
                    <label
                        className="flex-1 text-center mr-27 font-bold">Todo App</label>
                </div>
                <form onSubmit={handleAdd}>
                    <div className="flex justify-center mt-10">
                        <input
                            type="text"
                            className="rounded-md bg-white text-black px-4 py-1 w-70 outline-none"
                            placeholder="add new task"
                            onChange={(e) => setText(e.target.value)}
                            value={text} />
                        <button
                            type="submit"
                            className="ml-2 rounded px-2 bg-white text-black">Add</button>
                    </div>
                </form>

                <div className="flex my-7 mx-2 justify-between">
                    <div className="flex gap-3">
                        <button onClick={() => setFilters('all')} className={` ${filters === 'all' ? 'bg-blue-500 text-white px-3 rounded-md' : 'bg-white px-3 rounded-md'} text-black cursor-pointer`}>All</button>
                        <button onClick={() => setFilters('active')} className={` ${filters === 'active' ? 'bg-blue-500 text-white px-3 rounded-md' : 'bg-white px-3 rounded-md'} text-black cursor-pointer`}>Active</button>
                        <button onClick={() => setFilters('completed')} className={` ${filters === 'completed' ? 'bg-blue-500 text-white px-3 rounded-md' : 'bg-white px-3 rounded-md'} text-black cursor-pointer`}>Completed</button>
                    </div>

                    <div>
                        <p>Total : {total} | Active: {active} | Completed: {completed}</p>
                    </div>
                </div>

                <ul>
                    {
                        FilterTasks.map((item) => (
                            <li key={item.id}>
                                {
                                    editId === item.id ? (
                                        <div className="flex justify-between gap-2 m-2">
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="bg-white w-full py-2 px-4 rounded-md text-black  border-2 border-blue-500" />
                                            <div className="flex gap-2">
                                                <button onClick={handleSaveEdit} className="bg-green-400 px-2 rounded-md cursor-pointer">Save</button>
                                                <button onClick={handleCancel} className="bg-red-500 px-2 rounded-md cursor-pointer">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between gap-2 m-2">
                                            <span
                                                className={`${item.completed ? "line-through" : ""} bg-white w-full py-2 px-4 rounded-md text-black wrap-break-word min-w-0`}
                                                onClick={() => handleToggle(item.id)}>{item.text}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(item)} className="bg-amber-400 px-2 rounded-md cursor-pointer">Edit</button>
                                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 px-2 rounded-md cursor-pointer">Delete</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div >
    )
}
export default Hook6