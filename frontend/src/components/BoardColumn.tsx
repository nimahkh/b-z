import { Task } from '@challenge/types';
import { Droppable } from 'react-beautiful-dnd';
import { BoardCard } from './BoardCard';

type BoardColumnProps = {
    columnId: string;
    tasks: Task[];
}

export function BoardColumn({ columnId, tasks}: BoardColumnProps) {
    return (
        <Droppable key={columnId} droppableId={columnId.toString()} type="COLUMN" direction="horizontal">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="m-4 w-80">
                    <h2 className="text-center font-bold text-white mb-2">{columnId.toUpperCase()}</h2>
                    {tasks.map((task, index) => (
                        <BoardCard key={index} task={task}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
