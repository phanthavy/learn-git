import { useState } from 'react'




function Hook3() {
    //body code
    const [text, setText] = useState('')
    const [task, setTask] = useState([])

    // filtertask
    const [filters, setFilters] = useState("all")

    // handleAdd
    const handleAdd = (e) => {
        e.preventDefault()

        if (!text.trim()) return

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        }

        setTask((prev) => [...prev, newTask])

        setText("")
    }

    // handlelToggle
    const handleToggle = (id) => {
        setTask(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item))
    }

    //handleDelete
    const handleDelete = (id) => {
        setTask(prev => prev.filter(item => item.id !== id))
    }


    // filteredTasks
    const filteredTasks = task.filter(item => {
        if (filters === 'active') return !item.completed
        if (filters === 'completed') return item.completed
        return true
    })

    //clear complated
    const handleClearCompleted = () => {
        setTask(prev => prev.filter(item => !item.completed))
    }

    //counter
    const total = task.length
    const active = task.filter(item => !item.completed).length
    const completed = task.filter(item => item.completed).length


    return (
        <div className="min-h-screen bg-amber-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>

            {/* add form */}
            <form onSubmit={handleAdd} className="flex justify-center mb-6 gap-2">
                <input value={text} onChange={(e) => setText(e.target.value)} type='text' className="px-4 py-2 rounded-lg w-64 outline-none shadow-md" />
                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-600 transition">add</button>
            </form>

            {/* filter buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => setFilters("all")} className={`px-4 py-2 rounded-lg shadow ${filters === 'all' ? 'bg-amber-500 text-white' : 'bg-white'}`}>All</button>
                <button onClick={() => setFilters("active")} className={`px-4 py-2 rounded-lg shadow ${filters === 'active' ? 'bg-amber-500 text-white' : 'bg-white'}`}>Active</button>
                <button onClick={() => setFilters("completed")} className={`px-4 py-2 rounded-lg shadow ${filters === 'completed' ? 'bg-amber-500 text-white' : 'bg-white'}`}>Completed</button>
            </div>

            {/* task list */}
            <ul className="flex flex-col items-center gap-2">
                {filteredTasks.length === 0 && <p className="text-gray-600">No tasks yet!</p>}
                {
                    filteredTasks.map((item) => (
                        <li key={item.id} className="flex justify-between items-center w-96 bg-white p-4 rounded-xl shadow-md">
                            <span onClick={() => handleToggle(item.id)} className={`cursor-pointer ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.text}</span>
                            <div>
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>

            {/* counter and clear completed */}
            <div className="flex justify-center mt-6 gap-4 items-center">
                <p className="text-gray-700 font-semibold">
                    Total: {total} | Active: {active} | Completed: {completed}
                </p>
                <button onClick={handleClearCompleted} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">Clear Completed</button>
            </div>
        </div>

    )
}
export default Hook3