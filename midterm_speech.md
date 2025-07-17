## V8 and JIT compilation
  
JavaScript is a interpreted and compiled language at the same time. It uses Just-In-Time (JIT) compilation with the V8 engine.  

V8 first parses the code into an Abstract Tree Syntax. This is interpreted by the Ignition component, which generates bytecode (close to machine code but not quite so).  
As the code runs, if certain functions are executed frequently, they’re considered hot code and passed to TurboFan compiler, which compiles them to machine code (making the code much efficient).  

However, if the assumptions made during optimization turn out to be wrong — for example, if a function suddenly receives a different type of argument — V8 will deoptimize that code and fall back to the original bytecode.  

So escentially, is an interpreted language that identifies parts of the code that are frequently executed and optimizes these, compiling them to machine code.  

This dynamic compilation strategy allows JavaScript to combine fast startup times with high performance during execution, but it also means that writing predictable code helps avoid costly deoptimizations.