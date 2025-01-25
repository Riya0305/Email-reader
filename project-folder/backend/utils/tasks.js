//task extraction logic
const moment = require('moment');

// Extract tasks from email
function extractTasks(email) {
    const tasks = [];
  
    // Priority keywords
    const priorityKeywords = ['urgent', 'important', 'ASAP'];
  
    // Check for priority
    const priority = priorityKeywords.some(keyword =>
      email.body.toLowerCase().includes(keyword)
    )
      ? 'High'
      : 'Low';
  
    // Regex for extracting due dates (example: "due by MM/DD/YYYY")
    const dueDateRegex = /due by (\d{1,2}\/\d{1,2}\/\d{4})/i;
    const match = email.body.match(dueDateRegex);
    const dueDate = match ? moment(match[1], 'MM/DD/YYYY').toDate() : null;
  
    if (priority || dueDate) {
      tasks.push({
        subject: email.subject,
        priority,
        dueDate,
      });
    }
  
    return tasks;
  }
  
  // Categorize tasks
  function categorizeTasks(tasks) {
    return tasks.reduce(
      (categories, task) => {
        if (task.priority === 'High') {
          categories.highPriority.push(task);
        } else if (task.dueDate && new Date(task.dueDate) < new Date()) {
          categories.overdue.push(task);
        } else {
          categories.lowPriority.push(task);
        }
        return categories;
      },
      { highPriority: [], lowPriority: [], overdue: [] }
    );
  }
  
  module.exports = { extractTasks, categorizeTasks };
  