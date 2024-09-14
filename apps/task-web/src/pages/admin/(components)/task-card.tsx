import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { User, Calendar, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  user_id: string;
  status: string;
  createdAt: string;
  currentUserId?: string;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  user_id,
  createdAt,
  currentUserId,
  onDelete,
}) => {
  const isMyTask = user_id === currentUserId;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(id);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Card
        className={`bg-white shadow-lg relative rounded-xl border border-gray-300 mb-6 hover:shadow-xl transition-shadow duration-300 ease-in-out ${
          isMyTask ? 'border-blue-500' : ''
        }`}
      >
        <CardHeader className="p-6 border-b border-gray-200 flex justify-between items-start">
          <h2 className="text-sm font-light text-left text-gray-900">{title}</h2>
          <Button
            variant="ghost"
            size='icon'
            className="absolute right-0 top-0 m-3  p-2 transition-colors duration-300 ease-in-out rounded-full"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4 text-base leading-relaxed">{description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <span className="truncate">Assigned to: {user_id}</span>
          </div>
          {isMyTask && (
            <div className="flex items-center text-sm text-blue-500 mt-2">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span>This is your task</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 flex justify-between items-center border-t border-gray-200">
          <span
            className={`text-sm font-medium ${
              status === 'completed'
                ? 'text-green-600'
                : status === 'in-progress'
                ? 'text-blue-600'
                : 'text-yellow-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-5 w-5 text-gray-400 mr-1" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="rounded-lg p-8 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">Delete Task</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
          <DialogFooter className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCard;
