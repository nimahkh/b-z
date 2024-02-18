import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, type DraggableLocation } from 'react-beautiful-dnd';
import type { Task } from '@challenge/types';
import axios from 'axios';
import {BoardColumn} from '../components/BoardColumn';

const createTask = (data: Task) => axios.post('/tasks', data);
const fetchTasks = () => axios.get('/tasks');
const updateTask = (data: Task) => axios.put(`/tasks/${data.id}`, data);

const Board = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const today = new Date().toISOString().split('T')[0];

    const columns = {
        todo: tasks.filter(task => task.status === 'todo'),
        inProgress: tasks.filter(task => task.status === 'inProgress'),
        done: tasks.filter(task => task.status === 'done'),
    };

    const handleAddTask = async (title: string, deadline: string) => {
        const newTask: Task = {
            id: new Date().valueOf().toString().substring(0, 10),
            title,
            deadline,
            completed: false,
            status: 'todo',
        };
        const result = await createTask(newTask);
        setTasks(prev => [...prev, result.data]);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const reorderedTasks = reorder(
                tasks.filter(task => task.status === source.droppableId),
                source.index,
                destination.index
            ).filter(Boolean);
            
            setTasks(tasks.map(task => 
                reorderedTasks.find(item => item.id === task.id) ? { ...task, status: source.droppableId as Task['status'] } : task
            ));
        } else {
            const updatedTasks = moveTaskBetweenColumns(tasks, source, destination);
            setTasks(updatedTasks);
        }
    };

    const reorder = (list: Task[], startIndex: number, endIndex: number): Task[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const moveTaskBetweenColumns = (
        tasks: Task[],
        source: DraggableLocation,
        destination: DraggableLocation
    ): Task[] => {
        const current = [...tasks.filter(task => task.status === source.droppableId)];
        const next = [...tasks.filter(task => task.status === destination.droppableId)];
        const target = current.filter(item => parseInt(item.id) === source.index)?.[0];
        const isCompleted = destination.droppableId === 'done';

        current.splice(source.index, 1);
        const updateObject = { ...target, status: destination.droppableId as Task['status'], completed: isCompleted };
        next.splice(destination.index, 0, updateObject);
        updateTask(updateObject);
        return tasks.map(task =>
            task.id === target.id ? updateObject : task
        );
    };

    useEffect(() => {
        fetchTasks().then(response => {
            setTasks(response.data);
        });
    },[])

    return (
        <div className='flex flex-col items-center mt-4'>
            <form
                className='w-full mb-4 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 p-2 flex justify-center'
                onSubmit={(e) => {
                    e.preventDefault();
                    const title = (e.target as any).elements.title.value;
                    const deadline = (e.target as any).elements.deadline.value;
                    handleAddTask(title, deadline);
                    (e.target as any).reset();
                }}
            >
                <div className='w-3/4'>
                    <input name="title" type="text" placeholder="Task title" required className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <input name="deadline" type="date" min={today} required className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Task</button>
                </div>
            </form>

            <div className='flex justify-center w-full flex-row dark:bg-gray-800 dark:border-gray-700 border rounded-lg p-2'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([columnId, tasks]) => (
                        <BoardColumn key={columnId} columnId={columnId} tasks={tasks} /> 
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Board;
