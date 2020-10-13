# Pipe
Pipe is a functional programming language made to be more intuitive than other functional languages like Lisp.

## The Basics
Pipe's whole thing is it's use of the pipe ("|") to allow the output of one function to be fed into another. For example, say you wanted to take some number, print it out, then print it doubled. This would be the standard aproach in Pipe:

10 | say [ 0 ] | say [ 0 ] + [ 0 ] ;

Output:

10

20

First, we have a number piped into the say. The say then uses "[ 0 ]", which gets the first argument piped into it, in this case 10, as its argument, thus printing out "10". Then, the output of the say is piped into another say which does the same thing, but doubles its input before saying it.
This kind of thing is the foundation of Pipe.
 ## Commands
 - say - Takes one argument, prints it out, then returns it.
 - read - Takes one argument, prints it out, waits for input, then returns the input.
 - loop - Takes three arguments, say they are x, y, and z. Loops x times, the code it loops is y number of pipes ahead of the loop, pipes z into the beginning of the looped code. z is only piped in once, not each loop. If y is 0, it will loop the code all the way to the end of the line.
 - define - Takes two arguments, say they are x and y. Creates function named x, the code it runs is the code specified by y, in the same way as it is in a loop. When the function is called, all arguments passed into it are piped into the beginning of the function, with commas in between each.
 - return - Takes one argument, returns it. If it is in a function, the function will return it.
 
 ## Variables
 - To define or set a variable, the syntax is: value | variable_name
 - Use a variable just as you would use a number or string.
 
 ## A few more things
 - To pipe multiple things into the same function the syntax is thus: x , y , z , | say [ 0 ] + [ 1 ] + [ 2 ] ;
 - Pretty much everything has to be seperated by spaces or it won't work.
 - Put semicolons at the end of lines, but you don't have to for the last line.
 
 ## That's it, that's all the help you're getting. Good luck!
