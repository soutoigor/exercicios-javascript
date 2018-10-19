(function (DOM) {
    'use strict';
   
  function app(){
    var cep = new DOM('[data-js="cep"]');
    var form = new DOM('[data-js="form"]');
    var $logradouro = new DOM('[data-js="logradouro"]');
    var $status = new DOM('[data-js="status"]');
      var $loading = new DOM('.preloader-wrapper');
      var $bairro = new DOM('[data-js="bairro"]');
      var $cidade = new DOM('[data-js="cidade"]');
      var $estado = new DOM('[data-js="estado"]');
      var $cepResposta = new DOM('[data-js="cepResposta"]');
    var ajax = new XMLHttpRequest();
    
    

    function requestAddress() {
      
      conectViaCep();
        
        ajax.addEventListener('readystatechange', handleStateChange);
    }

    function fillAddress() {

      var data = parseData();

      if(data['erro']) {
          getMessage('error');
          clearData();
          return;
          }
        
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

    function handleStateChange(){
        if( isRequestOk() ){
            getMessage('ok');
          fillAddress();  
        }
    }
 
          
  function onlyNumber(number) {
    return number.get()[0].value.replace(/[\D]/g, '');
  }
        
    function conectViaCep(){
          ajax.open('GET', 'https://viacep.com.br/ws/' + onlyNumber(cep) + '/json/');
          ajax.send();
        
          getMessage('loading');
          if(!isRequestOk()){
              getMessage('error');
              clearData();
          }

    }
    
    function clearData(){
      $logradouro.get()[0].textContent = '-';
        $bairro.get()[0].textContent = '-';
        $cidade.get()[0].textContent = '-';
        $estado.get()[0].textContent = '-';
        $cepResposta.get()[0].textContent = '-';
      }   
    
    function getMessage(type){
        var message = {
            loading: `Buscando informações para o CEP: ${cep.get()[0].value}`,
            ok: `Endereço referente ao CEP: ${cep.get()[0].value}`,
            error: `Não encontramos endereço para o CEP: ${cep.get()[0].value}`,
            invalid: 'Insira um cep correto'
        };
        if(type == 'loading'){
              $loading.get()[0].classList.add("active");
        }else{
              $loading.get()[0].classList.remove("active");
        }

        $status.get()[0].textContent = message[type];
    }

    function isRequestOk(){
        return ajax.readyState === 4 && ajax.status === 200;
    }

    form.on('submit', function (e) {
        e.preventDefault();
        $('#modal1').modal('open');
        
        requestAddress();

    });
    
  }
   window.app = new app;
  app();
    
    


})(window.DOM)
