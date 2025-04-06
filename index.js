const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#number');
const symbols = document.querySelector('#symbols');
let indicator = document.querySelector('[data-indicator]');
let checkBoxes = document.querySelectorAll("input[type=checkbox]");
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copybutton");
let copyMsg = document.querySelector("[data-copyMsg]");

const passwordDisplay = document.querySelector("#passwordDisplay");



const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 0;
handelSlider();

//set password length
function handelSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;

}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRndNumber() {
    return getRndInteger(0, 9);
}
function getRndUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}
function getRndLowerCase(min, max) {
    return String.fromCharCode(getRndInteger(97, 123));
}




function generateRandomSymbol() {
    let index = getRndInteger(0, symbol.length);
    return symbol[index];
}

function calcStrength() {
    hasUpper = false;
    hasLower = false;
    hasNum = false;
    hasSys = false;
    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNum = true;
    if (symbols.checked) hasSys = true;

    if (hasUpper && hasLower && (hasNum || hasSys) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSys) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// function myFunction() {
//     var copyText = document.getElementById("myInput");
//     copyText.select();
//     copyText.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(copyText.value);

//     var tooltip = document.getElementById("myTooltip");
//     tooltip.innerHTML = "Copied: " + copyText.value;
//   }

//   function outFunc() {
//     var tooltip = document.getElementById("myTooltip");
//     tooltip.innerHTML = "Copy to clipboard";
//   }

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
    } catch (error) {
        copyMsg.innerText = "Failed";
    }
    // to make copy visible
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000);

}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handelSlider()
})


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    } // also fix spelling if needed
});



// handel -checkbox cj

function handleCheckBoxChange() {
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked) {


            checkCount++;
        }
    })
    //special condition
    if (passwordLength < checkCount) {
        passwordLength == checkCount;
        handelSlider();
    }
}
checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
})




const generateBtn = document.querySelector("#generatebutton");



generateBtn.addEventListener('click', () => {

    if (checkCount == 0) { return; }
    console.log("yash");

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handelSlider();
    }
    //remove old pasword

    let password = "";
    //checkbox fullfillment

    // if (uppercase.Checked) {
    //     password += getRndUpperCase();
    // }
    // if (lowercase.Checked) {
    //     password += getRndLowerCase;
    // }
    // if (numbers.Checked) {
    //     password += getRndNumber();
    // }
    // if (symbols.Checked) {
    //     password += generateRandomSymbol();
    // }

    let funcArr = [];

    if (uppercase.checked) {
        funcArr.push(getRndUpperCase);

    }
    if (lowercase.checked) {
        funcArr.push(getRndLowerCase);
    }
    if (numbers.checked) {
        funcArr.push(getRndNumber);
    }
    if (symbols.checked) {
        funcArr.push(generateRandomSymbol);
    }


    //compulsory checked boxx addition
    for (let index = 0; index < funcArr.length; index++) {
        password += funcArr[index]();

    }


    // remaining addition
    for (let j = 0; j < passwordLength - funcArr.length; j++) {
        let randomIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randomIndex]();

    }





    //   suffle password
    password = shuffle(Array.from(password));
    // console.log(password);
    // console.log("yash");


    passwordDisplay.value = password;

    calcStrength();



})







