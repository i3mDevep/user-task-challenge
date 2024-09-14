import { Button } from '@/components/ui/button';
import { useProtectedRoute } from '../../hooks/use-protected-route';
import CreateTaskDialog from './(components)/create-task';
import TaskList from './(components)/task-list';
import { useState } from 'react';
import { useTaskApi } from '@/hooks/modules/use-task-api';
import { useAuthentication } from '@/hooks/use-authentication';

const AdminPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    state: { data: authData },
  } = useAuthentication();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const { isAuthenticated } = useProtectedRoute(
    localStorage.getItem('auth:token')?.toString()
  );

  const { data: tasks, isPending, deleteTaskMutation } = useTaskApi();

  if (!isAuthenticated) return null;
  if (isPending) return 'Loading...';

  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="lg:p-8 h-full">
        <Button className="float-end m-2" onClick={openDialog}>
          Create Task
        </Button>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <CreateTaskDialog isOpen={isDialogOpen} onClose={closeDialog} />
          <TaskList
            tasks={tasks?.results ?? []}
            currentUserId={authData?.payload.id}
            onDelete={(id) => deleteTaskMutation.mutate(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
