import React, {useState} from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
   bodyDiv: {
        textAlign: 'center',
   }

    }));
function rollDie(sides){
    return Math.floor(Math.random() * sides + 1); // returns random integer from 1 to number of sides
}

function rollDice(sides, numberOfDice){
    var sum = 0;
    for (var i = 0; i < numberOfDice; i++) {
        sum += rollDie(sides);

    }
    return sum;
}

function doRolls(sides, numberOfDice, x, k = 10000){
    var num_under_x = 0
    for (var i = 0; i < k; i ++) {
        var sum = rollDice(sides, numberOfDice);
        if (sum < x) {
            num_under_x++
        } 
    }
    return (num_under_x / k);
    
}



export default function DiceRoller(){
    const { bodyDiv } = useStyles();
    const [numDiceInput, setDiceInput] = useState('');
    const [numSidesInput, setNumSides] = useState('');
    const [desiredValueInput, setDesiredValue] = useState('');
    const [result, setResult] = useState();

    const handleRun = () => {
        const numDice = parseInt(numDiceInput, 10);
        const numSides = parseInt(numSidesInput, 10);
        const desiredValue = parseInt(desiredValueInput, 10);
        setResult(doRolls(numSides, numDice, desiredValue));
    }
    return (
    
    <div className={bodyDiv}>
        <h1>Dice Roller!</h1>
        <div>
        <TextField id="standard-basic" label="number of dice" onChange={event=>setDiceInput(event.target.value)} />
        <TextField id="standard-basic1" label="number of sides" onChange={event=>setNumSides(event.target.value)}/>
        <TextField id="standard-basic2" label="desired value" onChange={event=>setDesiredValue(event.target.value)}/>
        <Button onClick={handleRun}>Run</Button>
        <p>{"Probability that you roll less than your desired value: "}{result}</p>
        </div>



    </div>
    )

}