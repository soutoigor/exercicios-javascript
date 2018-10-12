  (function(){
    'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  var cep = new DOM('[data-js="cep"]');
  var form = new DOM('[data-js="form"]');
var $logradouro = new DOM('[data-js="logradouro"]');
var $bairro = new DOM('[data-js="bairro"]');
var $cidade = new DOM('[data-js="cidade"]');
var $estado = new DOM('[data-js="estado"]');
var $cepResposta = new DOM('[data-js="cepResposta"]');


  function onlyNumber(number){
    return number.replace( /[\D]/g, '' );
  }

  function requestAddress(cep){
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/');
    ajax.send();
    showRequestStatus(ajax.readyState, ajax.status ,cep);
    ajax.addEventListener('readystatechange', function(){
      showRequestStatus(ajax.readyState, cep);
        if( ajax.readyState === 4 && ajax.status === 200 ){
            var address = JSON.parse(ajax.responseText);
            completeAddress(address.logradouro, address.bairro, address.localidade, address.uf, address.cep);
        }
    });
  }

   function completeAddress(logradouro, bairro, cidade, estado, cep){
       $logradouro.element[0].value = logradouro;
       $bairro.element[0].value = bairro;
       $cidade.element[0].value = cidade;
       $estado.element[0].value = estado;
       $cepResposta.element[0].value = cep;
    }

    function showRequestStatus(ajaxState, ajaxStatus ,cep){
      var $status = new DOM('[data-js="status"]');

      if(ajaxState === 1){
      $status.element[0].textContent = 'Buscando informações para o CEP: ' + cep + '...'
    }
    if(ajaxStatus === 400){      
      $status.element[0].textContent = 'Não encontramos o endereço para o CEP: ' +  + '.'
      }
    }
      
      
form.on('submit', function(e){
    e.preventDefault();
    requestAddress(onlyNumber(cep.element[0].value));
});
      

})()