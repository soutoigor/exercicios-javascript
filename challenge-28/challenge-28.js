  (function () {
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
      
      var ajax = new XMLHttpRequest();
      
      

      function requestAddress() {
        
		conectViaCep();

          showRequestStatus(ajax.readyState, cep.get()[0].value, false);
		  
          ajax.addEventListener('readystatechange', function () {
			  
		  showRequestStatus(ajax.readyState, cep.get()[0].value, false);
			fillAddress();  
			  
			  
          });
      }

      function fillAddress() {
		  
		  var data = parseData();
		  
		  if(!data)
			  return;
		  
		  
		  var $bairro = new DOM('[data-js="bairro"]');
		  var $cidade = new DOM('[data-js="cidade"]');
		  var $estado = new DOM('[data-js="estado"]');
		  var $cepResposta = new DOM('[data-js="cepResposta"]');
          $logradouro.get()[0].textContent = data.logradouro;
          $bairro.get()[0].textContent = data.bairro;
          $cidade.get()[0].textContent = data.localidade;
          $estado.get()[0].textContent = data.uf;
          $cepResposta.get()[0].textContent = data.cep;
      }
	  
	  function parseData(){
		  var result;
		  try{
			  result = JSON.parse(ajax.responseText);
		  }
		  catch(e){
			  result = null;
		  }
		  
		  return result;
	  }

      function showRequestStatus(ajaxState, cep, isInvalid) {
          var $status = new DOM('[data-js="status"]');

          if (isInvalid) {
              document.querySelector('.preloader-wrapper').classList.remove("active");
              $status.element[0].textContent = 'Não encontramos o endereço para o CEP: ' + cep + '.'
          }
          if (ajaxState === 1) {
              document.querySelector('.preloader-wrapper').classList.add("active");
              $status.element[0].textContent = 'Buscando informações para o CEP: ' + cep + '...';
          }
          if (ajaxState === 4) {
              document.querySelector('.preloader-wrapper').classList.remove("active");
              $status.element[0].textContent = 'Endereço referente ao CEP: ' + cep;
          }
      } 
	  	  
	function onlyNumber(number) {
	  return number.get()[0].value.replace(/[\D]/g, '');
	}
          
	  function conectViaCep(){
			ajax.open('GET', 'https://viacep.com.br/ws/' + onlyNumber(cep) + '/json/');
			ajax.send();
	  }
	  
	  form.on('submit', function (e) {
          e.preventDefault();
          $('#modal1').modal('open');
          
          requestAddress();

      });
	  
	  
	  
       $(function () {

         
        $('.modal').modal();

        $('.trigger-modal').modal();

    }); 


  })()