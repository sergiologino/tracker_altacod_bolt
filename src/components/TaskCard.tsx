import React from 'react';
import { MoreHorizontal, Clock, User, Folder } from 'lucide-react';
import { Task, User as UserType, Project } from '../types';

interface TaskCardProps {
  task: Task;
  users: UserType[];
  projects: Project[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onAssigneeChange: (taskId: string, assigneeId: string | undefined) => void;
  onProjectChange: (taskId: string, projectId: string | undefined) => void;
}

export function TaskCard({ 
  task, 
  users, 
  projects,
  onStatusChange, 
  onAssigneeChange,
  onProjectChange,
}: TaskCardProps) {
  const assignee = users.find(user => user.id === task.assigneeId);
  const project = projects.find(p => p.id === task.projectId);
  
  return (
    <div 
      className="p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      style={{ 
        backgroundColor: project?.color || 'white',
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 flex-1">{task.title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          <select
            value={task.assigneeId || ''}
            onChange={(e) => onAssigneeChange(task.id, e.target.value || undefined)}
            className="text-xs border rounded px-1 py-0.5 bg-white/80 flex items-center gap-1"
          >
            <option value="">Unassigned</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          className="text-xs border rounded px-1 py-0.5 bg-white/80"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mt-3 pt-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {assignee && (
            <>
              <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                <User size={14} />
              </div>
              <span>{assignee.name}</span>
            </>
          )}
        </div>
        <select
          value={task.projectId || ''}
          onChange={(e) => onProjectChange(task.id, e.target.value || undefined)}
          className="text-xs border rounded px-1 py-0.5 bg-white/80 flex items-center gap-1"
        >
          <option value="">No Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}