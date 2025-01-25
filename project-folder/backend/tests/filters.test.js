const { extractTasks, categorizeTasks } = require('../utils/tasks');
describe('Task Extraction and Categorization', () => {
  it('should extract tasks with priority and due dates', () => {
    const email = {
      subject: 'Important: Submit report',
      body: 'Please submit the report due by 12/31/2024. This is urgent.',
    };

    const tasks = extractTasks(email);

    expect(tasks).toEqual([
      {
        subject: 'Important: Submit report',
        priority: 'High',
        dueDate: new Date('12/31/2024'),
      },
    ]);
  });

  it('should categorize tasks correctly', () => {
    const tasks = [
      { subject: 'Task 1', priority: 'High', dueDate: new Date('2024-01-01') },
      { subject: 'Task 2', priority: 'Low', dueDate: new Date('2023-12-01') },
    ];

    const categories = categorizeTasks(tasks);

    expect(categories.highPriority).toHaveLength(1);
    expect(categories.overdue).toHaveLength(1);
    expect(categories.lowPriority).toHaveLength(0);
  });
});
