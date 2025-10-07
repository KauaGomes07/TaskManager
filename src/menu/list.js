import chalk from "chalk";
import { taskManager } from "../manager/tasks.js";
import { mainMenu } from "./main.js";
import { isCancel, log, select } from "@clack/prompts";
import { uptadeTaskMenu } from "../menu/update.js";

export async function listTaskMenu(){
    if(taskManager.tasks.size < 1){
        log.warn("Nenhuma tarefa cadastrada.");
        setTimeout(() => mainMenu(), 1000);
        return;
    }

    const selected = await select({
        message: "Selecione uma tarefa para ver os detalhes",
        options: [
            ...taskManager.toArray().map(({ name, status}) => ({ 
                label: `${taskManager.colorStatus(status)} ${chalk.white.underline(name)}`,
                value: name
            })),
            { label: "Menu principal", value: "main" },
        ]
    })

    if(isCancel(selected) || selected === "main"){
        mainMenu()
        return
    }

    uptadeTaskMenu(selected);
}
