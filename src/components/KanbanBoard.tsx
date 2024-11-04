import React from 'react';
import { Task, User, Project } from '../types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  users: User[];
  projects: Project[];
  groupBy: 'none' | 'assignee' | 'project';
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onAssigneeChange: (taskId: string, assigneeId: string | undefined) => void;
  onProjectChange: (taskId: string, projectId: string | undefined) => void;
}

export function KanbanBoard({ 
  tasks, 
  users, 
  projects,
  groupBy,
  onStatusChange,
  onAssigneeChange,
  onProjectChange,
}: KanbanBoardProps) {
  const columns = [
    { id: 'todo' as const, title: 'To Do' },
    { id: 'in-progress' as const, title: 'In Progress' },
    { id: 'done' as const, title: 'Done' }
  ];

  if (groupBy === 'none') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-4">{column.title}</h2>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    users={users}
                    projects={projects}
                    onStatusChange={onStatusChange}
                    onAssigneeChange={onAssigneeChange}
                    onProjectChange={onProjectChange}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const groups = groupBy === 'assignee'
    ? [undefined, ...users.map(u => u.id)]
    : [undefined, ...projects.map(p => p.id)];

  return (
    <div className="space-y-8">
      {groups.map((groupId) => {
        const groupItems = groupBy === 'assignee'
          ? tasks.filter(t => t.assigneeId === groupId)
          : tasks.filter(t => t.projectId === groupId);
        
        if (groupItems.length === 0) return null;

        const groupTitle = groupBy === 'assignee'
          ? users.find(u => u.id === groupId)?.name || 'Unassigned'
          : projects.find(p => p.id === groupId)?.name || 'No Project';

        return (
          <div key={groupId ?? 'unassigned'}>
            <h2 className="font-semibold text-xl text-gray-800 mb-4">
              {groupTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columns.map((column) => (
                <div key={column.id} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-4">{column.title}</h3>
                  <div className="space-y-3">
                    {groupItems
                      .filter((task) => task.status === column.id)
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          users={users}
                          projects={projects}
                          onStatusChange={onStatusChange}
                          onAssigneeChange={onAssigneeChange}
                          onProjectChange={onProjectChange}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}