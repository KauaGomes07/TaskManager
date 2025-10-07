import { taskManager } from "../manager/tasks.js";
import { isCancel, log, select } from "@clack/prompts";
import chalk from "chalk";
import { listTaskMenu } from "./list.js";


export async function uptadeTaskMenu(taskName){
    const task = taskManager.tasks.get(taskName)

    const formatedDate = new Date(task.createdAt).toLocaleDateString();
    const status = taskManager.colorStatus(task.status);

    log.info([
        `Tarefa: ${task.name}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgGrey(formatedDate)}`,
    ].join("\n"));

    const selected = await select({
        message: "O que deseja fazer?",
        options: [
            { label: "Alterar nome", value: "name" },
            { label: "Alterar status", value: "status" },
            { label: "Deletar", value: "delete" },
            { label: "Voltar", value: "back" }
        ]
    })

    if (isCancel(selected) || selected === "back") {
        listTaskMenu()
        return
    }

    switch (selected) {
        case "delete": {
            taskManager.tasks.delete(taskName);
            taskManager.save();
        }
        case "back": {
            listTaskMenu()
            return
        }
        case "name": {
            const OldTaskName = task.name;
            const newTaskName = await text({
                message: "Digite o novo nome da tarefa",
                validate(input){
                    if (taskManager.tasks.has(input)) {
                        return "Já existe uma tarefa com esse nome."
                    }
                }
            })
            if (isCancel(newTaskName)){
                uptadeTaskMenu(OldTaskName);
                return;
            }

            taskManager.tasks.delete(OldTaskName);
            const updatedTask = { ...task, name: newTaskName };
            taskManager.tasks.set(newTaskName, updatedTask);
            taskManager.save();
            uptadeTaskMenu(newTaskName);
            return;
        }
        case "status": {
            const taskStatus = [
                "Em andamento",
                "Concluída",
                "Cancelada"
            ]
            const options = taskStatus
            .filter(status => status !== task.status)
            .map(status => ({ label: status, value: status }));
            const status = await select({
                message: "Selecione o novo status",
                options
            })

            if(isCancel(status)){
                uptadeTaskMenu(taskName);
                return;
            }

            taskManager.tasks.set(taskName, { ...task, status });
            taskManager.save();
            uptadeTaskMenu(taskName);
            return;
        }
    }
}