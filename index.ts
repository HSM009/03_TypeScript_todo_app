#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"

console.clear();



//------------------------------------------------------------------------------
//CLASSES/CONSTRUCTORS/OOPs HERE
//------------------------------------------------------------------------------

const defValue ={
    Completed: 'Completed',
    Pending: 'Pending'
}

interface ToDo {
    Action: string;
    Status: string;
}

//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------

const stopTime = ()=>{
    return new Promise((res:any)=>{
        setTimeout(res,3500);
    })
}


async function welcome() {
    let rainbowTitle = chalkAnimation.neon("Welcome To ToDO App!\n\nCoded By Hosein Sirat Mohammad\n");
    await stopTime();
    rainbowTitle.stop();
}

async function mainMenu(){
   var selectedOption:any = await inquirer.prompt([
        {
            type:   "list",
            name:   "menuOption",
            message:"What would you like to do?",
            choices:[
                {
                    name:   'Show all ToDo task',
                    value:  'showTask'
                },
                {
                    name:   'Add a new ToDo task',
                    value:  'addTask',
                },
                
                {
                    name:   'Complete the ToDo task',
                    value:  'completeTask'
                },
                {
                    name:   'Bye',
                    value:  'bye'
                }
            ]
        }
    ]);

     if (selectedOption.menuOption == 'showTask')
     {
         await showTaskFunc();
         mainMenu();
     }
     else if (selectedOption.menuOption == 'addTask')
     {
         await addTaskFunc();
         mainMenu();
     }
     else if (selectedOption.menuOption == 'completeTask')
     {
         await completeTaskFunc();
         mainMenu();
     }
     else
     {
         console.log(selectedOption.menuOption);
     }  
    
};
    

async function showTaskFunc(){
    if (arrToDos.length > 0)
    {
        let i:number = 1;
        arrToDos.forEach((value) =>
        {
            if(value.Status == defValue.Pending) 
            console.log( chalk.bgBlue('\t\tTask '+i) +' >>>>>>>>> '+ (chalk.bgBlue(value.Action)) + ' >>>>>>>>> '+ (chalk.bgBlue(value.Status)));
            else
            console.log( chalk.bgGreen('\t\tTask '+i) +' >>>>>>>>> '+ (chalk.bgGreen(value.Action)) + ' >>>>>>>>> '+ (chalk.bgGreen(value.Status)));
            i++;
        })
        console.log('\n');
    }
    else
    {
        console.log(chalk.bgYellowBright('No task added.\n'));
    }
};

async function addTaskFunc(){
    await inquirer.prompt([
        {
            type:   'input',
            name:   'addTask',
            message:'Enter the ToDo task:',
            validate(valid){
                if(valid.length >1)
                return true;
                else
                return chalk.bgRedBright('Must enter inout.');
            }

        }
    ])
        .then((value) =>{
            arrToDos.push({
                Action: value.addTask,
                Status: defValue.Pending
            });
        console.log(chalk.inverse('Task added successfully.\n'));
        });
};

async function completeTaskFunc(){
    if (arrToDos.filter((todo) => todo.Status==defValue.Pending).map((todo) => todo.Action).length > 0)
    {
        await inquirer.prompt([
            {
                type:   'list',
                name:   'completed',
                message:'Select the task to complete.',
                choices:  arrToDos.filter((todo) => todo.Status==defValue.Pending).map((todo) => todo.Action)   
            }  
        ])
        .then((answers)=>
            {
                const todo:any = arrToDos.find((todo) => todo.Action === answers.completed);
                todo.Status = defValue.Completed;
                console.log(todo);
                //arrToDos[todo].Status = 'Completed';
                console.log(chalk.bgGreenBright("Task completed successfully.\n"));
    
            }
        )
    }
    else
    {
        console.log(chalk.bgYellowBright('No task Pending.\n'));
    }
};

//------------------------------------------------------------------------------
//MAIN
//------------------------------------------------------------------------------

await welcome();

const arrToDos: ToDo[] = [];

await mainMenu();