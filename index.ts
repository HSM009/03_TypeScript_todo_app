#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"

console.clear();

//------------------------------------------------------------------------------
//FUNCTION HERE
//------------------------------------------------------------------------------
const stopTime = ()=>{
    return new Promise((res:any)=>{
        setTimeout(res,3500);
    })
}


async function welcome() {
    let rainbowTitle = chalkAnimation.neon("Welcome To ATM Banking!\n\nCoded By Hosein Sirat Mohammad\n");
    await stopTime();
    rainbowTitle.stop();
}




//------------------------------------------------------------------------------
//MAIN
//------------------------------------------------------------------------------

await welcome();
