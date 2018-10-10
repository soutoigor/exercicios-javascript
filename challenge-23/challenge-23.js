(function(win, doc){

/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.

Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/


var $numbers = doc.querySelectorAll('[data-js="numbers"]');
var $operation = doc.querySelectorAll('[data-js="operation"]');
var $input = doc.querySelector('[data-js="input"]');
var $clear = doc.querySelector('[data-js="clear"]');
var $calc = doc.querySelector('[data-js="calc"]');

setNumbers();
setOperations();
clearCalc();
setResult();

function setNumbers(){
    for(var i = 0; i < $numbers.length; i++){
        $numbers[i].addEventListener('click', function(e){
            $input.value == '0' ? $input.value = e.target.value : $input.value += e.target.value; 
        });
    }
}


function setOperations(){
    for(var i = 0; i < $operation.length; i++ ){
        $operation[i].addEventListener('click', function(e){
            
            
            if(/[\/*\-+]$/.test($input.value)){
                var replaceOperator = $input.value.split('');
                replaceOperator[replaceOperator.length - 1] = e.target.value;
                $input.value = replaceOperator.join('');
            }
            
            if(!/[\/*\-+]$/.test($input.value))  $input.value += e.target.value;
            
        });

    }
}


function clearCalc(){
    $clear.addEventListener('click', function(){
        $input.value = '0';
    });
}

function setResult(){
    $calc.addEventListener('click', function(){
       

        if(/[\/*\-+]$/.test($input.value)){
            var replaceOperator = $input.value.split('');
            replaceOperator.pop();
            $input.value = replaceOperator.join('');

            $input.value = eval($input.value);
        }
        
        if(!/[\/*\-+]$/.test($input.value)) $input.value = eval($input.value);
        

       
      
    });
}



})(window, document);