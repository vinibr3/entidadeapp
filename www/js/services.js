angular.module('starter.services', [])

.factory('Noticias', function($localStorage, $ionicPopup, DialogService, NoticiasService) {
  // Might use a resource here that returns a JSON array
  KEY =  'noticias';
  // Some fake testing data
  var noticias = $localStorage.getObject(KEY);

  return {
    all: function() {
      return $localStorage.getObject(KEY);
    },
    get: function(noticiaId){
      if(noticias != null){
        for (var i = 0; i < noticias.length; i++) {
          if (noticias[i].id === parseInt(noticiaId)) {
            return noticias[i];
          }
        } 
      }else{
        return null;
      }
    },
    atualiza: function(){
     if(noticias == null || noticias == undefined){
      NoticiasService.atualiza(0).then(function(data){
        $localStorage.setObject(KEY, data);
      }, function(err){
        console.log(err);
        if(err.status == '304'){
          DialogService.no_news();
        }else{
          DialogService.error();
        }
      });
     }else{
      id = noticias.length-1;
      NoticiasService.atualiza(id).then(function(data){
        noticias = noticias.concat(data);
        $localStorage.setObject(KEY, noticias);
      }, function(err){
        console.log(err);
        if(err.status == '304'){
          DialogService.no_news();
        }else{
          DialogService.error();
        }
      });
     }
    }
  };
})

.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    },
  }
}])

.factory('Usuario', function($localStorage){

  var KEY = 'usuario';
  var USUARIO = {
    "type": "",
    "id" : "",
    "nome" : "",
    "email" : "",
    "encrypted_password" : "",
    "data_nascimento" : "",
    "cpf" : "",
    "rg" : "",
    "sexo" : "",
    "telefone" : "",
    "celular" : "",
    "foto" : "",
    "xerox_rg" : "",
    "instituicao_ensino" : "",
    "curso_serie" : "",
    "matricula" : "",
    "comprovante_matricula" : "",
    "access_token" : "",
    "expires_in" : "",
    "provider" : "",
    "endereco" : { "logradouro" : "", "numero" : "", "complemento" : "", "estado" : "", "cidade" : "", "cep" : "", "uf" : "GO"},
    "carteirinha" : {"id" : "" ,"nome" : "Vinícius de Oliveira Santos", "instituicao_ensino" : "Universidade Federal de Goiás", "curso_serie" : "Engenharia de Computação", "matricula" : "092471", "rg_certidao" : "5015160", "data_nascimento" : "15/11/1990", "cpf" : "041.182.091-52", "validade" : "03/2016", "foto" : "img/foto-3x4.jpg", "numero_serie" : "12345678", "qr_code" : "", "status_versao_digital" : "", "status_versao_impressa" : "", "layout_front" : "img/card-front.png", "layout_back" : "img/card-back.png", "layout_versao_digital" : "", "layout_versao_impressa" : ""}
  };

  return {
    logado: function(){
      console.log("usuario: "+$localStorage.getObject(KEY));
      return $localStorage.getObject(KEY) != null;
    },
    init: function(){
      if(empty){
        $localStorage.setObject(KEY,USUARIO);
      }
    },
    logoff: function(){
      return $localStorage.setObject(KEY, null);
    },
    setObject: function(user){
      $localStorage.setObject(KEY, user);
    },
    getObject: function(){
      return $localStorage.getObject(KEY);
    },
    getInstance: function(){
      return USUARIO;
    },
    filledData: function(user){
      var propriedades = ["nome","email","nascimento","cpf","rg_certidao","sexo","telefone","celular","foto","xerox_rg_certidao","instituicao_ensino","curso_serie","matricula","comprovante_matricula","access_token"];
      var endereco_propriedades = ["logradouro","numero","complemento","cidade","cep","uf"];
      if(user != null){
        for(i=0; i<propriedades.length;i++){
          var value = user[propriedades[i]];
          if(value == "" || value == null){
            return false;
          }
        }
        for(i=0; i<endereco_propriedades.length;i++){
          var value = user.endereco[endereco_propriedades[i]];
          if(value == "" || value == null){
            return false;
          }
        }
        return true;
      }else{
        return false;
      }
    }
  }
})

.constant("SERVER",{
  "URL" : "http://localhost:3000/api/",
  "BASIC_AUTHENTICATION_KEY" : "YWRtaW51c2VyOmM0MzBiMWQyM2I2Y2QzMTQ1NDNlNTkzMWE5OThiMGU2",
  "LOGIN_URL" : "estudantes/login",
  "LOGIN_FACEBOOK_URL" : "estudantes/login/facebook",
  "CREATE_ESTUDANTE_URL" : "",
  "UPDATE_ESTUDANTE_URL" : "",
  "NOTICIAS_URL" : "http://localhost:3000/api/noticias"
})

.service('DialogService', function($ionicPopup){
  return{
    error: function(){
      message = 'Um erro ocorreu, tente novamente mais tarde.';
      title = 'Erro';
      return $ionicPopup.alert({title: title, template: message});
    },
    no_news: function(){
      message = 'Nenhuma notícia nova.';
      title = 'UEEGO';
      return $ionicPopup.alert({title: title, template: message});
    }
  }
})

.service('ResourceService', function($resource, SERVER){
  return {
    server: function(url, param, actions){
      return $resource(SERVER.concat(url), param, actions);
    }
  }
})

.service('UserService', function(SERVER, ResourceService){
  return {
    login: function(params){
      return ResourceService.server(SERVER.LOGIN_URL, {}, {}).get(params).$promise;
    },
    facebook: function(access_token){
      param = {access_token: access_token};
      server = ResourceService.server(SERVER.LOGIN_FACEBOOK_URL, {}, {});
      return server.get(param).$promise;
    }, 
    create: function(estudante){
      auth_header = '"Authorization" : "Basic '.concat(SERVER.BASIC_AUTHENTICATION_KEY+'"');
      header = {headers: {auth_header}};
      actions = {facebook:{header}};
      server = ResourceService.server(SERVER.CREATE_ESTUDANTE_URL, {}, actions);
      return server.post(estudante).$promise;
    },
    update: function(estudante){
      auth_header = '"Authorization" : "Token token='.concat(estudante.oauth_token+'"');
      header = {header: {auth_header}};
      actions = {update: {header}};
      server = ResourceService.server(SERVER.UPDATE_ESTUDANTE_URL, {}, actions);
      return server.update(estudante).$promise;
    }
  }
})

.service('NoticiasService', function($resource, SERVER){
  return{
    atualiza: function(id){
      id = parseInt(id);
      param = {id: id}
      return $resource(SERVER.NOTICIAS_URL).get(param).$promise;
    }
  } 
});