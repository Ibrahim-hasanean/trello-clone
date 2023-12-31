"use client"
import { Todo, TypedColumn } from '@/typings'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { useModalStore,useBoardStore } from '@/store'

const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    "todo": "To Do",
    "inprogress": "In Progress",
    "done":"Done"
}

export const Column = ({ id, todos, index }: { id: TypedColumn, todos: Todo[], index: number }) => {
    const { searchString } = useBoardStore();
    const { openModal } = useModalStore();
    const items = todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase().trim()))
    return (
        <Draggable draggableId={id} index={index} >
            {(provided) => (<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                <Droppable droppableId={id.toString()} type="card">
                    {(provided, snapShot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`pb-2 p-2 rounded-2xl shadow-sm ${snapShot.isDraggingOver? "bg-green-200":"bg-white/50"}`} >
                            <h2 className='flex justify-between font-bold text-xl p-2'>{idToColumnText[id]}
                                <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>{items.length}</span>
                            </h2>
                            <div className='space-y-2'>
                                {todos.map((todo, index) => {
                                    if (todo.title.toLowerCase().includes(searchString.trim().toLowerCase())) {
                                   return <Draggable draggableId={todo.$id} key={todo.$id} index={index}>
                                        {(provided) => (
                                            <TodoCard
                                                todo={todo}
                                                index={index}
                                                id={id}
                                                innerRef={provided.innerRef}
                                                draggableProps={provided.draggableProps}
                                                dragHandleProps={provided.dragHandleProps}
                                            />
                                        )}
                                    </Draggable>                                        
                                    }
                                    return <></>

                                }
                                )}
                            </div>
                            {provided.placeholder}
                            <div className='flex items-end justify-end'>
                                <button onClick={()=>openModal()} className='text-gray-500 hover:text-green-600' >
                                    <PlusCircleIcon className='h-10 w-10' />
                                </button>
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>)}
        </Draggable>
    )
}
