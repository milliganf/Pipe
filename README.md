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
