//Tenemos 2 variables uno es x = 2, y = 3, intercambiar los valores de la variables sin usar una variable auxiliar


y = 2;
x = 3;

[x, y] = [y, x];

console.log("Esta es la variable",x);
console.log("Esta es la variable",y);

//Se utilizo el metodo de desestructuracion de arreglos para intercambiar los valores de las variables sin utilizar una variable auxiliar 
//este metodo esta disponible desde ES6 y es una forma mas sencilla de intercambiar los valores de las variables