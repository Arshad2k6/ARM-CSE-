/**
 * Google Tasks API Service
 * Interacts with Google Tasks REST API using in-memory bearer token
 */

export interface GoogleTaskList {
  id: string;
  title: string;
  updated: string;
}

export interface GoogleTaskItem {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  due?: string;
  updated?: string;
}

/**
 * Fetch user's task lists
 */
export async function fetchTaskLists(accessToken: string): Promise<GoogleTaskList[]> {
  const response = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Tasks API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return (data.items || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    updated: item.updated
  }));
}

/**
 * Fetch tasks from a specific list
 */
export async function fetchTasks(accessToken: string, tasklistId: string = '@default'): Promise<GoogleTaskItem[]> {
  const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks?showCompleted=true&showHidden=true`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Tasks API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return (data.items || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    notes: item.notes,
    status: item.status,
    due: item.due,
    updated: item.updated
  }));
}

/**
 * Create a new study revision task in Google Tasks
 */
export async function createGoogleTask(
  accessToken: string,
  tasklistId: string = '@default',
  task: { title: string; notes?: string; due?: string }
): Promise<GoogleTaskItem> {
  const payload: any = {
    title: task.title,
    notes: task.notes || 'SAAEPS TG ECET 2026 CSE Revision Milestone'
  };

  if (task.due) {
    // Google Tasks expects RFC 3339 timestamp (e.g. 2026-10-15T00:00:00.000Z)
    payload.due = new Date(task.due).toISOString();
  }

  const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create task in Google Tasks (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Toggle task completion status in Google Tasks
 */
export async function updateGoogleTaskStatus(
  accessToken: string,
  taskId: string,
  completed: boolean,
  tasklistId: string = '@default'
): Promise<GoogleTaskItem> {
  const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: completed ? 'completed' : 'needsAction'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update task (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Delete task from Google Tasks with mandatory user confirmation guard
 */
export async function deleteGoogleTask(
  accessToken: string,
  taskId: string,
  taskTitle: string,
  tasklistId: string = '@default'
): Promise<void> {
  const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok && response.status !== 204) {
    const errorText = await response.text();
    throw new Error(`Failed to delete Google Task (${response.status}): ${errorText}`);
  }
}
