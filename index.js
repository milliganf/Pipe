fs = require('fs')
const prompt = require('prompt-sync')();
var plain = fs.readFileSync(process.argv[2], "utf-8")
//for repl use:
plain = fs.readFileSync("exponent", "utf-8")
const commands = {"say": function(x, index){
    if(x.length > 1){
      console.log("Too many arguments: say "+x);
      return x[0];
    } else if (x.length < 1){
      console.log("Not enough arguments: say "+x);
    } else{
      console.log(x[0]); 
      return x[0];
    }
  }, 
  "loop": function(all, startIndex){
    var num = all[0];
    var pipeNum = all[1]
    if(all.length > 3){
      console.error("Too many arguments: loop "+all);
      return false;
    } else if (all.length < 3){
      console.error("Not enough arguments: loop "+all);
      return false;
    } else{
      var torun = []
      var final = [[identify(all[2].toString()), all[2].toString()], ["pipe", "|"]];
      var index = startIndex;
      while (true){
        index += 1;
        if(lex[on][index][0] === "pipe"){
          index += 1;
          break;
        }
      }
      while (true){
        torun.push(lex[on][index])
        if(lex[on][index][1] === "|"){
          pipeNum -= 1;
        }
        if(pipeNum === 0 && all[1] !== 0){
          break;
        } else if (index === lex[on].length-1 && all[1] === 0){
          torun.push(["pipe", "|"]);
          break;
        }
        index += 1;
      }
      for(w = 0; w < all[0]; w++){
        for(x = 0; x<torun.length; x++){
          final.push(torun[x])
        }
      }
      parser(final);
      i = index;
      return num;
    }
  },
  "read": function(all, index){
    if(all.length > 1){
      console.error("Too many arguments: read "+all);
      return false;
    } else if (all.length < 1){
      console.error("Not enough arguments: read "+all);
      return false;
    }
    return prompt(all[0]+"")
  }
}
const operators = "+-*/".split('')
const numbers = '1234567890'.split('')
function identify(str){
    if(str === "|"){
      return "pipe";
    }
    if(numbers.includes(str)){
      return "num"
    }
    if(Object.keys(commands).includes(str)){
      return "com"
    }
    if(operators.includes(str)){
      return "opr"
    }
    return "none"
  }
var variables = {}  
function lexer(text){
  var tokens = [[]];
  var index = 0
  var symbols = '[]"'.split('')
  var sofar = ''
  var state = 'normal';
  for(var i=0; i<text.length; i++){
    if(text[i] === " " && sofar !== ""){
      sofar.slice(0, sofar.length-1)
      tokens[index].push([identify(sofar), sofar])
      sofar = '';
      continue;
    } else if(text[i] === " "){
      sofar = "";
      continue;
    } else if(symbols.includes(text[i])){
      tokens[index].push(["symbol", text[i]])
      sofar = ""
      continue;
    } else if(text[i] === ";" || text[i] === "\n"){
      if(sofar.length > 1){
        sofar.slice(0, sofar.length-1)
        tokens[index].push([identify(sofar), sofar])
      }
      sofar = "";
      index += 1;
      if(text[i+1] === "\n"){
        i += 1
      }
      tokens.push([])
      continue;
    }
    sofar += text[i]
  }
  if(sofar !== ""){
    tokens[index].push([identify(sofar), sofar])
  }
  return tokens
}
var i = 0;
function parser(lexed){
  var args = [];
  var command = null;
  var finalArgs = [];
  var pipe = false;
  i = 0;

  total_loop:
  for(var z=0; z<lexed.length; z++){
    //console.log("adding")
    switch(lexed[i][0]){
      case "pipe":
        if(command){
          args = [commands[command[0]](finalArgs, command[1])]
        }
        finalArgs = [];
        command = null;
        pipe = true;
        break;
      case "symbol":
        if(lexed[i][1] === "["){
          finalArgs.push(args[lexed[i+1][1]]);
          i += 2
        } else if(lexed[i][1] === "\""){
          var o = i+1;
          var total = "";
          while(lexed[o][1] !== "\""){
            total += lexed[o][1] + " ";
            o += 1;
          }
          if(command){
            finalArgs.push(total);
          } else {
            args.push(total);
          }
          i = o;
        }
        break;
      case "com":
        command = [lexed[i][1], i]
        break;
      case "num":
        if(!command){
          args.push(parseInt(lexed[i][1]))
        } else if(!(lexed[i-1][0] === "opr")){
          finalArgs.push(parseInt(lexed[i][1]));
        }
        break;
      case "opr":
        switch(lexed[i][1]){
          case "+":
            if(lexed[i+1][1] == "["){
              finalArgs[finalArgs.length-1] += args[lexed[i+2][1]]
              if(args.length > 0){
                args[args.length-1] += args[lexed[i+2][1]];
              }
              i += 3
            } else if (lexed[i+1][0] == "num"){
              finalArgs[finalArgs.length-1] = parseInt(finalArgs[finalArgs.length-1]) + parseInt(lexed[i+1][1]);
              if(args.length > 0){
                args[args.length-1] += variables[lexed[i+1][1]];
              }
              i += 1;
            } else if (Object.keys(variables).includes(lexed[i+1][1])){
              finalArgs[finalArgs.length-1] += parseInt(variables[lexed[i+1][1]]);
              if(args.length > 0){
                args[args.length-1] += variables[lexed[i+1][1]];
              }
              i += 2;
              if(i === lexed.length-1){
                break total_loop;
              }
            }
            break;
          case "-":
              if(lexed[i+1][1] == "["){
              finalArgs[finalArgs.length-1] -= args[lexed[i+2][1]]
              if(args.length > 0){
                args[args.length-1] -= args[lexed[i+2][1]];
              }
              i += 3
            } else if (lexed[i+1][0] == "num"){
              finalArgs[finalArgs.length-1] = parseInt(finalArgs[finalArgs.length-1]) - parseInt(lexed[i+1][1]);
              if(args.length > 0){
                args[args.length-1] -= variables[lexed[i+1][1]];
              }
              i += 1;
            } else if (Object.keys(variables).includes(lexed[i+1][1])){
              finalArgs[finalArgs.length-1] -= parseInt(variables[lexed[i+1][1]]);
              if(args.length > 0){
                args[args.length-1] -= variables[lexed[i+1][1]];
              }
              i += 2;
              if(i === lexed.length-1){
                break total_loop;
              }
            }
            break;
          case "*":
            if(lexed[i+1][1] == "["){
              finalArgs[finalArgs.length-1] *= args[lexed[i+2][1]]
              if(args.length > 0){
                args[args.length-1] *= args[lexed[i+2][1]];
              }
              i += 3
            } else if (lexed[i+1][0] == "num"){
              finalArgs[finalArgs.length-1] = parseInt(finalArgs[finalArgs.length-1]) * parseInt(lexed[i+1][1]);
              if(args.length > 0){
                args[args.length-1] *= variables[lexed[i+1][1]];
              }
              i += 1;
            } else if (Object.keys(variables).includes(lexed[i+1][1])){
              finalArgs[finalArgs.length-1] *= parseInt(variables[lexed[i+1][1]]);
              if(args.length > 0){
                args[args.length-1] *= variables[lexed[i+1][1]];
              }
              i += 2;
              if(i === lexed.length-1){
                break total_loop;
              }
            }
            break;
          case "/":
            if(lexed[i+1][1] == "["){
              finalArgs[finalArgs.length-1] /= args[lexed[i+2][1]]
              if(args.length > 0){
                args[args.length-1] /= args[lexed[i+2][1]];
              }
              i += 3
            } else if (lexed[i+1][0] == "num"){
              finalArgs[finalArgs.length-1] = parseInt(finalArgs[finalArgs.length-1]) / parseInt(lexed[i+1][1]);
              if(args.length > 0){
                args[args.length-1] /= variables[lexed[i+1][1]];
              }
              i += 1;
            } else if (Object.keys(variables).includes(lexed[i+1][1])){
              finalArgs[finalArgs.length-1] /= parseInt(variables[lexed[i+1][1]]);
              if(args.length > 0){
                args[args.length-1] /= variables[lexed[i+1][1]];
              }
              i += 2;
              if(i === lexed.length-1){
                break total_loop;
              }
            }
            break;      
        }
      case "none":
      if(lexed[i][0] === "none"){
          if(numbers.includes(lexed[i][1][0])){
            if(command){
              finalArgs.push(parseInt(lexed[i][1]))
            } else{
              args.push(parseInt(lexed[i][1]))
            }
          } else if(lexed[i][1] === ","){
            if(command){
              args.push(commands[command[0]](finalArgs, command[1]))
              finalArgs = [];
              command = null;
            }
          } else {
          if(Object.keys(variables).includes(lexed[i][1])){
            if(command){
              finalArgs.push(variables[lexed[i][1]])
            } else{
              if(pipe){
                if(lexed[i+1][0] !== "opr"){
                  variables[lexed[i][1]] = args[0];
                }
                args = [variables[lexed[i][1]]];
              } else{
                args.push(variables[lexed[i][1]])
              }
            }
          } else {
            if(pipe){
              variables[lexed[i][1]] = args[0];
            } else {
              console.log(`Variable ${lexed[i][1]} does not exist.`);
              return false;
            }
          }  
        }
        }
        break;  
      }
    i += 1;
    if(i >= lexed.length){
      break;
    }          
  }
  if(command){
    commands[command[0]](finalArgs, command[1])
  }
}
//console.log(plain)
//console.log(lexer(plain))
var lex = lexer(plain)
var on = 0;
for(line of lex){
  parser(line)
  on += 1;
}
console.log("")