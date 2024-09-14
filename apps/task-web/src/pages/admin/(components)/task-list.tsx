import React from 'react';
import TaskCard, { TaskCardProps } from './task-card';

interface TaskListProps {
  tasks: Omit<TaskCardProps, 'onDelete'>[];
  currentUserId?: string;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, currentUserId, onDelete }) => {
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Pending tasks */}
      <div className="max-h-[700px] overflow-auto bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 sticky top-0 bg-white py-2 border-b border-gray-200">
          Pending
        </h3>
        {pendingTasks.length ? (
          pendingTasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              createdAt={task.createdAt}
              user_id={task.user_id}
              currentUserId={currentUserId}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No pending tasks</p>
        )}
      </div>

      {/* In Progress tasks */}
      <div className="max-h-[700px] overflow-auto bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 sticky top-0 bg-white py-2 border-b border-gray-200">
          In Progress
        </h3>
        {inProgressTasks.length ? (
          inProgressTasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              createdAt={task.createdAt}
              user_id={task.user_id}
              currentUserId={currentUserId}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No tasks in progress</p>
        )}
      </div>

      {/* Completed tasks */}
      <div className="max-h-[700px] overflow-auto bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 sticky top-0 bg-white py-2 border-b border-gray-200">
          Completed
        </h3>
        {completedTasks.length ? (
          completedTasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              createdAt={task.createdAt}
              user_id={task.user_id}
              currentUserId={currentUserId}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No completed tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
