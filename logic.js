const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const sch = ["+", "-", "*", "/", "%", "=", "!", "^", "brc", ".", "x", "ro"];
const err = ["/0"];
let output = "";

const fact = (value) => {
    let f = 1;
    while(value > 1) {
        f *= value;
        value -= 1;
    }
    return f;
}

const cal = (btvalue) => {
    display.focus();
    if(btvalue === "Pi") {
        output += 3.141592653589;
    } else if(btvalue === "=" && output !== "") {
        if(output.charAt(output.length - 1) === "!") {
            output = fact(parseInt(output));
        } else if(output.includes(err)) {
            output = "Can't divide by 0"
        } else {
            output = eval(output.replace("%", "/100"));
        }
    } else if(output !== "" && btvalue === "x") {
        output = eval(output);
        output = Math.pow(parseInt(output), 2);
    } else if(output !== "" && btvalue === "ro") {
        output = eval(output);
        output = Math.sqrt(parseInt(output));
    } else if(btvalue === "AC") {
        output = "";
    } else if(btvalue === "DEL"){
        output = output.toString().slice(0, -1);
    } else { 
        if(output === "" && sch.includes(btvalue)) return;
        output += btvalue;
    }
    display.value = output;
}

function mode_switch() {
    var element = document.body;
    element.classList.toggle("dark-mode")
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => cal(e.target.dataset.value));
});