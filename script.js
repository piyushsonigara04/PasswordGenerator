const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~!@#$%^&*()_+{}|?"


let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
//set strength circle color to grey


function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}


function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91))
}

function generateSymbol(){
    return symbols.charAt(getRandomInteger(0,symbols.length))
}

function calculateStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber||hasSymbol)&&passwordLength>=8)
    {
        setIndicator("#0f0");
    } else if(
        (hasLower||hasUpper)&&(hasNumber||hasSymbol)&&passwordLength>=6
    ) {
        setIndicator("#ff0")
    } else {
        setIndicator("#f00")
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000)
}




function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLength<checkCount)
        {
            passwordLength = checkCount;
        }
    handleSlider();
}



allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)
})




inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})




copyBtn.addEventListener('click',(e)=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener('click',(e)=>{
    //none of the checkbox are selected
    if(checkCount<= 0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    //lets start the journey to find new password
    //remove old pass
    console.log("Starting the journey")
    password = "";

    let funcarr = [];

    if(uppercaseCheck.checked)
        funcarr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcarr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcarr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcarr.push(generateSymbol);

    console.log("Compulsory addition done")
    //remaining addtion

    for(let i=0;i<passwordLength;i++){
        let random = getRandomInteger(0,funcarr.length);
        password+=funcarr[random]();
    }

    console.log("Remaining addition done")
    //show in input

    passwordDisplay.value = password;
    //calculate strength
    console.log("Password is ",password)
    calculateStrength();

   
})







