function addNumbers()
{
      let x = parseFloat(document.getElementById("firstNumber").value);
      let y = parseFloat(document.getElementById("secondNumber").value);
      let total = x + y;
      document.getElementById("result").innerHTML = total;
}

function subNumbers()
{
      let x = parseFloat(document.getElementById("firstNumber").value);
      let y = parseFloat(document.getElementById("secondNumber").value);
      let total = x - y;
      document.getElementById("result").innerHTML = total;
}

function multiplyBy()
{
      let x = parseFloat(document.getElementById("firstNumber").value);
      let y = parseFloat(document.getElementById("secondNumber").value);
      let total = x * y;
      document.getElementById("result").innerHTML = total;
}

function divideBy() 
{ 
      let x = parseFloat(document.getElementById("firstNumber").value);
      let y = parseFloat(document.getElementById("secondNumber").value);
      let total = x / y;
      document.getElementById("result").innerHTML = total;
}

function modulusOf() 
{ 
      let x = parseFloat(document.getElementById("firstNumber").value);
      let y = parseFloat(document.getElementById("secondNumber").value);
      let total = x % y;
      document.getElementById("result").innerHTML = total;
}