# Pipe
Pipe is a functional programming language made to be more intuitive than other functional languages like Lisp.

## The Basics
Pipe's whole thing is it's use of the pipe ("|") to allow the output of one function to be fed into another. For example, say you wanted to take some number, print it out, then print it doubled. This would be the standard aproach in Pipe:

10 | say [ 0 ] | + [ 0 ] [ 0 ] | say [ 0 ] ;

Output:

10

20

First, we have a number piped into the say. The say then uses "[ 0 ]", which gets the first argument piped into it, in this case 10, as its argument, thus printing out "10". Then, the output of the say is piped into a +, which adds the value piped into it to itself, and then the result is finally piped into another say.
This kind of thing is the foundation of Pipe.
 ## Commands
 - say - Takes one argument, prints it out, then returns it.
 - read - Takes one argument, prints it out, waits for input, then returns the input.
 - loop - Takes three arguments, say they are x, y, and z. Loops x times, the code it loops is y number of pipes ahead of the loop, pipes z into the beginning of the looped code. z is only piped in once, not each loop. If y is 0, it will loop the code all the way to the end of the line.
 - define - Takes two arguments, say they are x and y. Creates function named x, the code it runs is the code specified by y, in the same way as it is in a loop. When the function is called, all arguments passed into it are piped into the beginning of the function, with commas in between each.
 - return - Takes one argument, returns it. If it is in a function, the function will return it.
 - + - Takes two arguments, adds them together.
 - - - Takes two arguments, subtracts the second from the first.
 - * - Takes two arguments, multiplies them.
 - / - Takes two arguments, divides the first by the second.
 
 ## Variables
 - To define or set a variable, the syntax is: value | variable_name
 - Use a variable just as you would use a number or string.
 ## Backpiping
 Backpiping is using the backslash before a pipe in order to pipe in a past value. For example, say you wanted to take a number, say it doubled, then say it... singled, without using dividing. You could use backpiping like so:  
 10 | + [ 0 ] [ 0] | say [ 0 ] \ 2 | say [ 0 ] ;  
 The backslash before the second pipe means that, rather than the output of the first say being piped into the second say, the 10 is piped into the second say. You can say how many pipes back you want to go with a number after the backslash. Here is another example:  
 10 | + [ 0 ] [ 0 ] | say [ 0 ]  \ 2 | * [ 0 ] [ 0 ] | say [ 0 ] \ 4 | say [ 0 ] ;  
 Output:  
 20  
 100  
 10  
 ## A few more things
 - To pipe multiple things into the same function the syntax is thus: x , y , | + [ 0 ] [ 1 ] | say [ 0 ] ;
 - Pretty much everything has to be seperated by spaces or it won't work.
 - Put semicolons at the end of lines, but you don't have to for the last line.
 
 ## That's it, that's all the help you're getting. Good luck!
