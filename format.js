function formatElement(elemId) {
    let el = document.getElementById(elemId);
    el.innerHTML = el.innerHTML.split("\n").map(line => formatLine(line)).join("\n");
}

function formatLine(str) {
    let output = str;
    let addClass = "";
    let needClosingUnderscore = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '[' || str[i] == '{' || (!needClosingUnderscore && str[i] == '_')) {
            switch (str[i+1]) {
                case 'R': addClass = " class='red'"; break;
                case 'B': addClass = " class='blue'"; break;
                case 'T': addClass = " class='transp'"; break;
                default:  addClass = ""; break;
            }
                 if (str[i] == '[') { output = output.replace(/\[[RBT]?/,    "<b"+addClass+">"); }
            else if (str[i] == '{') { output = output.replace(/\{[RBT]?/, "<span"+addClass+">"); }
            else if (str[i] == '_') { output = output.replace(/_[RBT]?/,"<small"+addClass+">"); needClosingUnderscore = true; }
            
        }
        else if (str[i] == ']') { output = output.replace(/\]/,    "</b>"); }
        else if (str[i] == '}') { output = output.replace(/\}/, "</span>"); }
        else if (str[i] == '_') { output = output.replace(/_/, "</small>"); needClosingUnderscore = false; }
        else if (str[i] == '|') { output = output.replace(/\|/,    "</p><p>"); }
        else if (str[i] == '¦') { output = output.replace(/\¦/,    "</p><p class='note'>"); }
        else if (str[i] == 'Ø') { output = output.replace(/Ø/,"&NoBreak;"); }
    }
    return output;
}
