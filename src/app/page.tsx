import { prisma } from "@/lib/prisma";
import { TodoList } from "./todo-list";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedTodos = todos.map((todo) => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  }));

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 py-12 px-4 dark:bg-black">
      <main className="w-full max-w-lg">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          TODO
        </h1>
        <TodoList initialTodos={serializedTodos} />
      </main>
    </div>
  );
}
