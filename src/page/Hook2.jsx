// import { useState } from "react"

import { useState } from "react"


// const Hook2 = () => {
//   // code body

//   const [task, setTask] = useState("")

//   const [tasks, setTasks] = useState([])

//   const handleChange = (e) => {
//     setTask(e.target.value)
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!task.trim()) return

//     const newTask = {
//       id: Date.now(),
//       text: task
//     }
//     setTasks((prev) => [...prev, newTask])
//     setTask("")
//   }

//   const handleDelete = (id) => {
//     setTasks((prev) => prev.filter((item) => item.id !== id))
//   }




//   return (
//     <div className="bg-amber-300 h-screen">
//       <div className="p-8 bg-amber-400 shadow-md">
//         <label className="capitalize text-2xl font-semibold flex justify-center">to do list</label>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="flex justify-center mt-10 gap-4">
//           <input value={task} onChange={handleChange} type="text" className="shadow-md shadow-amber-500 bg-white py-1 px-3 w-50 rounded-2xl outline-none" placeholder="add task" />
//           <button className="bg-gray-800 text-amber-50 rounded-2xl px-4 shadow-md shadow-gray-500 cursor-pointer hover:bg-gray-900 duration-400 hover:text-gray-300" >add</button>
//         </div>
//       </form>
//       <ul className="mt-8 flex flex-col items-center gap-2">
//         {
//           tasks.length === 0 && <p className="text-gray-600 capitalize">no tasks yet</p>
//         }
//         {
//           tasks.map((item) => (
//             <li key={item.id} className="bg-white px-4 py-2 rounded-xl shadow-md flex justify-between">
//               <span>{item.text}</span>
//               <button
//                 onClick={() => handleDelete(item.id)}
//                 className="text-red-500 font-semibold">Delete</button>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }
// export default Hook2

const Hook2 = () => {
  //code body
  const [state, setState] = useState('')
  const [newValue, setNewValue] = useState([])

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleStartEdit = (item) => {
    setEditId(item.id)
    setEditText(item.text)
  }

  const handleSaveEdit = () => {
    setNewValue(prev =>
      prev.map(item =>
        item.id === editId
          ? { ...item, text: editText }
          : item
      )
    )

    setEditId(null)
    setEditText("")
  }

  const handleChange = (e) => {
    setState(e.target.value)
  }

  const handleAdd = (e) => {

    e.preventDefault()

    if (!state.trim()) return

    const newTask = {
      id: Date.now(),
      text: state,
      completed: false,
    }

    setNewValue((prev) => [...prev, newTask])

    setState("")
  }

  const handleDelete = (id) => {
    setNewValue((prev) => prev.filter((item) => item.id !== id))
  }

  const handleToggle = (id) => {
    setNewValue((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))
  }

  return (
    <div className="bg-amber-200 h-screen">
      <div className="text-center bg-amber-300 p-6 shadow-sm">
        <label className="capitalize text-2xl font-semibold">to do list</label>
      </div>
      <form onSubmit={handleAdd}>
        <div className="flex justify-center mt-5 gap-2">
          <input value={state} onChange={handleChange} type="text" className="shadow-md px-6 py-3 bg-white outline-none rounded-lg" placeholder="add new task" />
          <button className="shadow-md px-6 py-3 bg-amber-100 rounded-lg text-gray-600">add</button>
        </div>
      </form>
      <div>
        <ul className="mt-5 flex flex-col items-center">
          {newValue.length === 0 && <p className="text-gray-600">no tasks yet!</p>}
          {
            newValue.map((item) => {
              return (
                <li key={item.id} className="flex justify-between w-150 gap-2 mt-4">
                  <p>{setNewValue.length }</p>
                  {editId === item.id
                    ? (
                      <>
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="bg-white py-3 px-4 rounded-xl w-150"
                        />

                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-400 text-white py-3 px-4 rounded-xl"
                        >
                          Save
                        </button>
                      </>
                    )
                    :
                    (
                      <>
                        <span
                          onClick={() => handleToggle(item.id)}
                          className={`bg-amber-50 py-3 px-4 rounded-xl w-150 cursor-pointer
            ${item.completed ? "line-through text-gray-400" : ""}`}
                        >
                          {item.text}
                        </span>

                        <button
                          onClick={() => handleStartEdit(item)}
                          className="bg-blue-400 text-white py-3 px-4 rounded-xl"
                        >
                          Edit
                        </button>
                      </>
                    )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-400 text-white py-3 px-4 rounded-xl"
                  >
                    Delete
                  </button>

                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
export default Hook2