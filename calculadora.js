'use strict'

var args = process.argv.slice(2);

var operation =args[1];

var num1 = parseFloat(args[0]);

var num2 = parseFloat(args[2]);

var result ="\n INtroduce bien los parametros \n"

if(args.length == 3){

	switch(operation){
		case "mas":
		result ='suma:' + parseFloat(num1 + num2);
		break;

		case "menos":
		result ='suma:' + parseFloat(num1 - num2);
		break;

		case "multi":
		result ='suma:' + parseFloat(num1 * num2);
		break;

		case "divi":
		result ='suma:' + parseFloat(num1 / num2);
		break;

	}
}


console.log(result);