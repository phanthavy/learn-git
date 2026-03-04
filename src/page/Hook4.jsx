import { useEffect, useState } from "react"


function Hook4() {

    const [text, setText] = useState('')

    const [task, setTask] = useState(() => {
        try {
            const saved = localStorage.getItem("task")
            return saved ? JSON.parse(saved) : []
        } catch (error) {
            return []
        }
    })

    const [filter, setFilter] = useState('all')

    const [search, setSearch] = useState('')

    const [isDark, setIsDark] = useState(false)


    const [editId, setEditId] = useState(null)

    const [editText, setEditText] = useState('')

    //......local storage save.......
    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task))
    }, [task])

    //..........Add...........
    const handleAdd = (e) => {
        e.preventDefault()

        if (!text.trim()) return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
        }

        setTask(prev => [...prev, newTask])

        setText('')
    }
    //.........delete......
    const handleDelete = (id) => {
        setTask(prev => prev.filter(item => item.id !== id))
    }
    //........toggle.......
    const handleToggle = (id) => {
        setTask(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item))
    }
    //........edit........
    const handleEdit = (item) => {
        if (item.completed) return; //disable edit if completed
        setEditId(item.id)
        setEditText(item.text)
    }
    //.......save edit........
    const handleSaveEdit = () => {
        setTask(prev => prev.map(item => item.id === editId ? { ...item, text: editText } : item))
        setEditId(null)
        setEditText('')
    }

    // ........canel edit........
    const handleCancelEdit = () => {
        setEditId(null)
        setEditText('')
    }

    //.......clear completed......
    const handleClearCompleted = () => {
        setTask(prev => prev.filter(item => !item.completed))
    }
    //.......filter + search.........
    const handleFilterTask = task.filter(item => {
        if (filter === 'active') return !item.completed
        if (filter === 'completed') return item.completed
        return true
    }).filter(item => item.text.toLowerCase().includes(search.toLowerCase()))

    //........counter........
    const total = task.length
    const active = task.filter(item => !item.completed).length
    const completed = task.filter(item => item.completed).length


    return (
        <div className={`${isDark ? "bg-gray-900 text-white" : "bg-amber-100"} min-h-screen p-6 transition-all`}>
            <h1>Utimate Todo</h1>

            {/* dark mode */}
            <div className="text-center mb-4">
                <button
                    onClick={() => setIsDark(prev => !prev)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                    Dark Mode
                </button>
            </div>

            {/* Add Form */}
            <form onSubmit={handleAdd} className="flex justify-center gap-2 mb-6">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new task"
                    className="px-4 py-2 rounded-lg bg-white text-black w-78"
                />
                <button className="bg-amber-500 px-4 py-2 rounded-lg text-white">
                    Add
                </button>
            </form>

            {/* Search */}
            <div className="flex justify-center mb-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="px-4 py-2 rounded-lg w-50 text-black bg-white"
                />
            </div>

            {/* filter buttons*/}
            <div className="flex justify-center gap-3 mb-6">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>

            {/* Task List */}
            <ul className="mex-w-xl mx-auto">
                {
                    handleFilterTask.map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-3 bg-white text-black p-3 rounded-lg shadow">
                            {
                                editId === item.id ? (
                                    <>
                                        <input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleSaveEdit()
                                                if (e.key === 'Escape') handleCancelEdit()
                                            }}
                                            className="border px-2 py-1 rounded"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={handleSaveEdit}>Save</button>
                                            <button onClick={handleCancelEdit}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            onClick={() => handleToggle(item.id)}
                                            className={`cursor-pointer ${item.completed ? "line-through text-gray-400" : ""}`}
                                        >
                                            {item.text}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 disabled:text-gray-400"
                                            >Edit</button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600"
                                            >Delete</button>
                                        </div>
                                    </>
                                )
                            }
                        </li>
                    ))
                }
            </ul>

            {/* Counter */}
            <div className="text-center mt-6">
                <p>Total: {total} | Acative: {active} | Completed: {completed}</p>
                <button
                    onClick={handleClearCompleted}
                    className="mt-3 bg-red-400 px-4 py-2 rounded-lg text-white"
                >
                    Clear Completed
                </button>
            </div>
        </div>
    )
}
export default Hook4