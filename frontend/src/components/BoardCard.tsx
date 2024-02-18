import { Draggable } from 'react-beautiful-dnd';
import { format, parseISO } from 'date-fns';
import { Task } from '@challenge/types';

type BoardCardProps = {
    task: Task;
}

export function BoardCard({ task }: BoardCardProps) {

    const isDeadlineWithin24Hours = (deadline: string): boolean => {
        const now = new Date();
        const LESS_THAN_24_HOURS = 24 * 60 * 60 * 1000;
        const deadlineDate = new Date(deadline);
        const difference = deadlineDate.getTime() - now.getTime();
        return difference < LESS_THAN_24_HOURS;
    };

    return (
        <Draggable key={task.id} draggableId={task.id.toString()} index={parseInt(task.id)}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 mb-2 rounded shadow ${task.completed ? 'bg-green-200' : isDeadlineWithin24Hours(task.deadline.toString()) ? 'bg-red-200' : 'bg-gray-200'
                        }`}
                >   
                    <span className='mr-2'>{task.completed ? '✅' : '🟡'}</span>
                    {task.title} - Due: {format(parseISO(task.deadline.toString()), 'MMM dd, yyyy')}
                </div>
            )}
        </Draggable>
    )
}
