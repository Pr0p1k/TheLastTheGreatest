document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('offline', offline);
	window.addEventListener('online', online);
   /* document.getElementById('calculate:slideR').addEventListener('change', function () {
        document.getElementById("calculate:sendR").value = document.getElementById("calculate:slideR");
        r = document.getElementById("calculate:slideR");
        draw();
        isDrawn = true;
        hideWarning();
        
    });*/
    document.getElementById("calculate:slideR").addEventListener('mouseup', sliderListener);
    document.getElementById('computed_result').addEventListener('click', pickPoint);
    let canvas = document.getElementById('result');
    
    canvas.width = 1000;
    canvas.height = 1000;
    let width = window.getComputedStyle(document.getElementById('computed_result')).width;
    console.log("default = " + width);
});

function sliderListener() {
	r = document.getElementById("calculate:slideR_hidden").value;
	document.getElementById("calculate:sendR").value = r;
		console.log("mouseup event on calculate:slideR, r: "+r);
        draw();
        isDrawn = true;
        hideWarning();
}


let x, y, r, isDrawn;
function offline() {
	document.getElementById("connectionState").value = "You are disconnected from the Internet!";
	document.getElementById("connectionState").style.color = "red";
	alert("Internet connection lost!");
	document.getElementById("calculate:send").disabled = true;
	document.getElementById("computed_result").removeEventListener('click', pickPoint);
}
function online() {
	document.getElementById("connectionState").value = "You are connected to the Internet.";
	document.getElementById("connectionState").style.color = "green";
	alert("Internet connection restored!");
	document.getElementById("calculate:send").disabled = false;
	document.getElementById("computed_result").addEventListener('click', pickPoint);
}
function check(btn) {
    // btn.preventDefault();
    if (checkR() & checkX() & checkY()) {
    	document.getElementById("calculate:sendR").value = r;
    	hideWarning();
        draw();
        drawDot(x / r * 400 + 500, -y / r * 400 + 500, belongs(x, y, r));
        //compute();
        $("#calculate\\:sender").click();
    }
    document.getElementById("calculate:slideR").addEventListener('mouseup', sliderListener);
}

function checkY() {
    let passed = true;
    let min = -5;
    let max = 5;
    y = $("[id$='Y']").val();
    y = y.replace(",", ".");
    if (isNaN(y) || Number(y) < min || Number(y) > max || y === '') {
        document.getElementById("Y_input").classList.add("error");
        document.getElementById("Y_comment").classList.replace("ok_comment", "error_comment");
        passed = false;
    }
    else {
        document.getElementById("Y_input").classList.remove("error");
        document.getElementById("Y_comment").classList.replace("error_comment", "ok_comment");
    }
    return passed;
}

function checkX() {
    let passed = true;
    x = document.getElementById('calculate:X_input').value;
    let min = -3;
    let max = 3;
    if (isNaN(x) || Number(x) < min || Number(x) > max || x === '') {
        document.getElementById("X_input").classList.add("error");
        document.getElementById("X_comment").classList.replace("ok_comment", "error_comment");
        passed = false;
    }
    else {
        document.getElementById("X_input").classList.remove("error");
        document.getElementById("X_comment").classList.replace("error_comment", "ok_comment");
    }
    return passed;
}

function checkR(change = true) {
    let passed = true;
    let min = 2;
    let max = 5;
    let R = document.getElementById("calculate:slideR_hidden").value;
    R = R.replace(",", ".");
    
    if (isNaN(R) || Number(R) < min || Number(R) > max || R === '') {
        if (change) {
            document.getElementById("R_input").classList.add("error");
            document.getElementById("R_comment").classList.replace("ok_comment", "error_comment");
        }
        passed = false;
    }
    else {
        document.getElementById("R_input").classList.remove("error");
        document.getElementById("R_comment").classList.replace("error_comment", "ok_comment");
    }
    if (passed) r = R;
    console.log(r);
    return passed;
}

function pickPoint(event) {
    if (isDrawn) {
        let canvas = document.getElementById('result');
        console.log("clicked on canvas");
        checkR();
        console.log("click X = " + event.pageX + "\nclick Y = " + event.pageY + "\nscroll X = "
            + window.pageXOffset + "\nscroll Y = " + window.pageYOffset
            + "\n canvas X = " + canvas.getBoundingClientRect().left + "\n canvas Y = "
            + canvas.getBoundingClientRect().top);
        let X = event.pageX - canvas.getBoundingClientRect().left;
        let Y = event.pageY - (canvas.getBoundingClientRect().top + window.pageYOffset);
        let blockWidth = parseInt(window.getComputedStyle(document.getElementById('computed_result')).width);
        X = X / blockWidth * 1000;
        Y = Y / blockWidth * 1000;
        x = (X - 500) / 400 * r;
        y = -(Y - 500) / 400 * r;
        console.log(" draw X = " + X + " draw Y = " + Y);
        draw();
        drawDot(X, Y, belongs(x, y, r));
        x = Number(x).toFixed(3);
        y = Number(y).toFixed(3);
        $("#calculate\\:X_input").val(x);
        $("#calculate\\:Y").val(y);
        $("#calculate\\:sender").click();

    } else showWarning();
    document.getElementById("calculate:slideR").addEventListener('mouseup', sliderListener);
}

function belongs(x, y, r) {
    if (x <= 0 & y >= 0 & y <= x + r / 2) {
        return true;
    } else if (x <= 0 & y <= 0 & Math.hypot(x, y) <= r / 2) {
        return true;
    } else if (x >= 0 & y <= 0 & y >= -r & x <= r / 2) {
        return true;
    }

    return false;
}

function showWarning() {
    let warning = document.getElementById("warning");
    warning.style.display = "block";
    warning.style.top = document.getElementById("script_output").getBoundingClientRect().top + window.pageYOffset;
    $("#warning").animate({
        left: "80%"
    }, 700);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideWarning() {
    $("#warning").animate({
        left: "100%"
    }, 1000);
    sleep(1000);
    document.getElementById("warning").style.display = "none";
}

function drawAllDots() {
    let rows = document.getElementById("tabli").rows;
    if (rows.length > 1 & rows[1].cells[1] != undefined) {
    for (let i = 1; i < rows.length; i++) {
        let R = Number(rows[i].cells[2].innerHTML);
        let xB = Number(rows[i].cells[0].innerHTML);
        let yB = Number(rows[i].cells[1].innerHTML);
        let X = Number(rows[i].cells[0].innerHTML) / r * 400 + 500; 
        let Y = -Number(rows[i].cells[1].innerHTML) / r * 400 + 500;
        drawDot(X, Y, belongs(xB, yB, r));
    }}
}

function draw() {
	console.log("draw method called");
    let canvas = document.getElementById("result");
    let context = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    drawArea(canvas, context, width, height);
    drawLines(canvas, context, width, height);
    drawAllDots();
}

function drawLines(canvas, context, width, height) {
    context.fillStyle = "black";
    context.font = "normal normal normal 16px arial";
    context.beginPath();
    context.moveTo(width / 2, height);
    context.lineTo(width / 2, 0);
    context.fillText("  Y", width * 0.52, height * 0.03);
    context.lineTo(width / 2 - width * 0.01, width * 0.03);
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2 + width * 0.01, width * 0.03);
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.fillText("X", width * 0.97, height * 0.53);
    context.lineTo(width - width * 0.03, height / 2 - height * 0.01);
    context.moveTo(width, height / 2);
    context.lineTo(width - width * 0.03, height / 2 + height * 0.01);

    context.moveTo(width * 0.1, height / 2 + height * 0.01);
    context.lineTo(width * 0.1, height / 2 - height * 0.01);
    context.fillText(-Number(r).toFixed(1), width * 0.1, height * 0.53);

    context.moveTo(width * 0.3, height / 2 + height * 0.01);
    context.lineTo(width * 0.3, height / 2 - height * 0.01);
    context.fillText(-Number(r).toFixed(1) / 2, width * 0.3, height * 0.53);

    context.fillText(0, width * 0.51, height * 0.53);

    context.moveTo(width * 0.7, height / 2 + height * 0.01);
    context.lineTo(width * 0.7, height / 2 - height * 0.01);
    context.fillText(Number(r).toFixed(1) / 2, width * 0.7, height * 0.53);

    context.moveTo(width * 0.9, height / 2 + height * 0.01);
    context.lineTo(width * 0.9, height / 2 - height * 0.01);
    context.fillText(Number(r).toFixed(1), width * 0.9, height * 0.53);

    context.moveTo(width / 2 + width * 0.01, height * 0.1);
    context.lineTo(width / 2 - width * 0.01, height * 0.1);
    context.fillText(Number(r).toFixed(1), width * 0.53, height * 0.1);

    context.moveTo(width / 2 + width * 0.01, height * 0.3);
    context.lineTo(width / 2 - width * 0.01, height * 0.3);
    context.fillText(Number(r).toFixed(1) / 2, width * 0.53, height * 0.3);

    context.moveTo(width / 2 + width * 0.01, height * 0.7);
    context.lineTo(width / 2 - width * 0.01, height * 0.7);
    context.fillText(-Number(r).toFixed(1) / 2, width * 0.53, height * 0.7);

    context.moveTo(width / 2 + width * 0.01, height * 0.9);
    context.lineTo(width / 2 - width * 0.01, height * 0.9);
    context.fillText(-Number(r).toFixed(1), width * 0.53, height * 0.9);

    context.closePath();
    context.strokeStyle = "black";
    context.stroke();
}

function drawArea(canvas, context, width, height) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#3399ff";
    context.fillRect(width / 2, height / 2, width * 0.2, height * 0.4);
    context.beginPath();
    context.moveTo(width * 0.5, height * 0.5);
    context.lineTo(width * 0.3, height * 0.5);
    context.lineTo(width * 0.5, height * 0.3);
    context.fill();
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.2, Math.PI, 0, true);
    context.fill();
}

function drawDot(X, Y, hit) {
    let canvas = document.getElementById("result");
    let context = canvas.getContext("2d");
    let radius = canvas.width / 100;
    context.fillStyle = hit ? 'green' : 'red';
    console.log("X = " + X + " Y = " + Y);
    context.fillRect(X, Y, radius, radius);
}