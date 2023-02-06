const tasks = [];

export const routes = [
  {
    method: "GET",
    path: /^\/tasks\/(?<task_id>\d+).*)?$/,
    handler: (req, res) => {
      const { task_id } = req.params;
      const task = tasks.find((task) => task.id === task_id);
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: /^\/tasks.*?$/,
    handler: (req, res) => {
      const { title, description, completed_at } = req.body;
      tasks.push(task);
      return res.end(JSON.stringify(task));
    },
  },
];
