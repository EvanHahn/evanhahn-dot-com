---
date: 2022-04-18
url: /remember-the-milk-script-to-find-tasks-with-invalid-start-times
title: Remember The Milk script to find tasks with invalid start times
---

_This post is aimed at fellow Remember The Milk users._

[Remember The Milk][0] recently introduced a beta of MilkScript, a way to run little scripts that operate on your to-do list. Users write JavaScript that can read and write tasks, lists, tags, and so on.

I immediately used MilkScript to solve a simple problem I have with the service: there's no good way to find tasks with invalid start dates; that is, a task where the start date is _after_ the due date. For example, a task due tomorrow with a start date of next week. Remember The Milk puts a warning icon in the UI when you do this, but does nothing else to prevent it.

I wrote a small script that finds all incomplete tasks with invalid start dates, and if there are any, creates a task to clean them up. For example, it might create a task called "Fix 5 tasks with invalid start dates", due today.

_Note that MilkScript is still in beta, so all this might break._

```javascript
const getTasksWithInvalidStartDates = () =>
  rtm
    .getTasks()
    .filter((task) => {
      if (task.isCompleted()) {
        return false;
      }

      const startDate = task.getStartDate();
      if (!startDate) {
        return false;
      }

      const dueDate = task.getDueDate();
      if (!dueDate) {
        return false;
      }

      return startDate > dueDate;
    })
    .sort((a, b) => a.getDueDate() - b.getDueDate());

const getNewTaskName = (length) =>
  length === 1
    ? "Fix task with invalid start date"
    : `Fix ${length} tasks with invalid start dates`;

const getNewTaskNote = (tasks) =>
  [
    `Task${tasks.length === 1 ? "" : "s"} with invalid start date${
      tasks.length === 1 ? "" : "s"
    }:`,
    "",
    ...tasks.map((task) => `- ${JSON.stringify(task.getName())}`),
  ].join("\n");

const main = () => {
  const tasks = getTasksWithInvalidStartDates();
  if (tasks.length === 0) {
    console.log("No tasks with invalid start dates");
    return;
  }

  console.log("Found %s tasks with invalid start dates", tasks.length);
  rtm
    .addTask(getNewTaskName(tasks.length))
    .addNote(getNewTaskNote(tasks))
    .setDueDate(new Date());
};

main();
```

Hope this helps!

[0]: https://www.rememberthemilk.com/
