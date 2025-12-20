function formatElement(elemId) {
    let el = document.getElementById(elemId);
    el.innerHTML = el.innerHTML.split("\n").map(line => formatLine(line)).join("\n");
}

function formatLine(str) {
    let output = str;
    let addClass = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '[' || str[i] == '{') {
            switch (str[i+1]) {
                case 'R': addClass = " class='red'"; break;
                case 'B': addClass = " class='blue'"; break;
                case 'T': addClass = " class='transp'"; break;
                default:  addClass = ""; break;
            }
                 if (str[i] == '[') { output = output.replace(/\[[RBT]?/,    "<b"+addClass+">"); }
            else if (str[i] == '{') { output = output.replace(/\{[RBT]?/, "<span"+addClass+">"); }
        }
        else if (str[i] == ']') { output = output.replace(/\]/,    "</b>"); }
        else if (str[i] == '}') { output = output.replace(/\}/, "</span>"); }
    }
    return output;
}
