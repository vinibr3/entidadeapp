angular.module('starter.controllers', [])

// Controller login
.controller('LoginCtrl', function($scope, $state, $ionicModal, $cordovaOauth, UserService, Usuario){

  if(Usuario.getObject() != null){ //estudante logado
    $state.go('tab.home')
  } 

  $ionicModal.fromTemplateUrl('templates/cadastro.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modalCadastro = modal;
  });

  $ionicModal.fromTemplateUrl('reset-senha.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal){
      $scope.modalResetSenha = modal;
    });

  $scope.openModal = function(modal){
    if(modal == 'ResetSenha'){
      $scope.modalResetSenha.show();
    }else if (modal == 'Cadastro'){
      $scope.modalCadastro.show();
    }
  }

  $scope.hideModal = function(modal){
    if(modal == 'ResetSenha'){
      $scope.modalResetSenha.hide();
    }else if (modal == 'Cadastro'){
      $scope.modalCadastro.hide(); 
    }
  }

  $scope.login = function(estudante){
    UserService.login(estudante).then(function(data){
      Usuario.setObject(data);
      $state.go('tab.home');
    }, function(err){
      alert(err);
    })
  };

  $scope.facebookLogin = function(){
    $cordovaOauth.facebook('151222168574628',['email']).then(function(result){
      UserService.facebook(result.access_token).then(function(estudante){
        Usuario.setObject(estudante);
        $state.go('tab.home');
      }, function(err){
        alert(err);
      });
    }, function(err){
      alert(err);
    });
  }

  $scope.$on('$destroy', function(){
    $scope.modalCadastro.remove();
    $scope.modalResetSenha.remove();
  });

  $scope.cadastarDepois = function(){
    var usuario = Usuario.getInstance();
    Usuario.setObject(usuario);
    $state.go('tab.home');
  };

  $scope.cadastrar = function(){
    $scope.facebook = false;
    $scope.openModal('Cadastro');
  }

  $scope.resetSenha = function(){
    $scope.openModal('ResetSenha');
  }

})

.controller('CadastroCtrl', function($scope, $state, $cordovaOauth, Usuario){
  $scope.user = {email:"", password:""};

  $scope.cadastrar = function(user){
    
  }

  $scope.facebookLogin = function(){
    $cordovaOauth.facebook('151222168574628',['email']).then(function(result){
      var user = Usuario.getInstance();
      user.access_token = result.access_token;
      user.expires_in = result.expires_in;
      user.provider = "facebook";
      Usuario.setObject(user);
      $scope.modalCadastro.hide();
      $scope.modalSolicitacao.show();
    }, function(err){
      alert(err);
    });
  }
})

  .controller('ResetSenhaCtrl', function($scope){
    $scope.resetSenha = function(email){
      alert('Um link para resetar sua senha foi enviado para o email fornecido.');
      $scope.hideModal('ResetSenha');
    }
  })

// Controller Tab Home

.controller('HomeCtrl', function($scope, $cordovaInAppBrowser,  $cordovaContacts, $ionicPopup) {
  
  $scope.contato = {
    endereco: {logradouro: 'Avenida Universitária', numero: 'Nº 1533', setor: 'Setor Leste Universitario', cidade: 'Goiânia', uf: 'Goiás', cep: '74265-250'},
    whatsapp: '(62) 8557-8858',
    telefone: '(62) 3434-2012',
    email: 'contato@ueego.com.br'
  };

  $scope.showInAppBrowser = function(url){
    $cordovaInAppBrowser.open(url, '_blank', {location: 'yes', clearcach: 'yes', toolbar: 'no'})
      .then(function(event){

      }).catch(function(event){

      });
  }

  $scope.adicionaUeeToContatos = function(){
    showConfirm('Contato', 'Deseja adicionar UEEGO aos seus contatos?');
  }

  $scope.showMap = function(){
    console.log("Show Map");
    const POSITION = new plugin.google.maps.LatLng(-16.675978,-49.241211);
    var map_options = {
      'backgroundColor': 'white',
      'mapType': plugin.google.maps.MapTypeId.HYBRID,
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': POSITION,
        'tilt': 30,
        'zoom': 1,
        'bearing': 50
      }
    }
    var map = plugin.google.maps.Map.getMap();
    map.addEventListener(plugin.google.maps.event.MAP_READY, function(){
      map.setOptions(map_options);
      map.showDialog();
      map.addMarker({
      'position': POSITION,
      'icon': '#316AAC' 
      }, function(marker){
      marker.showInfoWindow();
      });
      map.animateCamera({
        'target': POSITION,
        'tilt': 0,
        'zoom': 16,
        'bearing': 20,
        'duration': 5000
      });
    });
  }

  function addContato(contato){
    $scope.contact = {
      "displayName" : "União Estadual dos Estudantes de Goiás",
      "name" : {"givenName" : "UEEGO"},
      "phoneNumbers" : [{"value" : "+556285578858", "type" : "mobile"},{"value" : "+5534342012", "type" : "phone"}],
      "emails": [{"value" : "contato@ueego.com.br"}],
      "addresses" : [{"type" : "home", "formatted" : "  ", "streetAddress" : "", "locality" : "Goiânia", "region" : "Goiás", "postalCode" : "", "country" : "Brasil"}], 
      "urls" : "www.ueego.com.br"
    }
    
    $cordovaContacts.save($scope.contact)
      .then(function(result){
          showAlert('Contato', 'Contato Adicionado.');
      }, function(err){
          showAlert('Contato', 'Ocorreu um erro ao adicionar contato');
      });
  }

  function showConfirm(title, message){
    var confirmPopup = $ionicPopup.confirm({
     title: title,
     template: message,
     cancelText: 'Não',
     okText: 'Sim'
   });

   confirmPopup.then(function(res) {
     if(res) {
       addContato($scope.contato);
     } else {}
   });
  }

  function showAlert(title,message){
    var alertPopup = $ionicPopup.alert({
     title: title,
     template: message,
    });

   alertPopup.then(function(res) {
     
   });
  }

})

.controller('LocalizacaoCtrl', function($scope, $rootScope){
  
  $rootScope.$on('MODAL_LOCALIZACAO_READY', function(){
    console.log("Evento disparado");
    
  })

})


// Controller Tab Noticias

.controller('NoticiasCtrl', function($scope, $timeout, $ionicPopup, Noticias) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.noticias = Noticias.all;

  $scope.refresh = function(){
    return Noticias.atualiza();
  }

  function showPopup(title) {
    // An elaborate, custom popup
    myPopup = $ionicPopup.show({
      template: '<div style="text-align:center"><ion-spinner icon="android"></ion-spinner></di>',
      title: title,
      scope: $scope,
    });
    return myPopup;
  }

})

.controller('NoticiaDetailCtrl', function($scope, $stateParams, Noticias) {
  $scope.noticia = Noticias.get($stateParams.noticiaId);
})

// Controllers Tab Carteirinha

.controller('CarteirinhaCtrl', function($scope, $ionicModal, $ionicPopup, Usuario) {
  
  $scope.user = Usuario.getObject();
  
  $ionicModal.fromTemplateUrl('meus-dados.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modalMeusDados = modal;
  });
  $ionicModal.fromTemplateUrl('meia-entrada.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modalMeiaEntrada = modal
;  });
  $ionicModal.fromTemplateUrl('templates/cadastro.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modalCadastro = modal;
  });
  
  $scope.openModal = function(modal){
    if(modal == 'MeusDados'){
      $scope.modalMeusDados.show();
    }else if(modal == 'MeiaEntrada'){
      $scope.modalMeiaEntrada.show();
    }else if(modal == 'Cadastro'){
      $scope.modalCadastro.show();
    }
  };
  $scope.hideModal = function(modal){
    if(modal == 'MeusDados'){
      $scope.modalMeusDados.hide();
    }else if(modal == 'MeiaEntrada'){
      $scope.modalMeiaEntrada.hide();
    }else if( modal == 'Cadastro'){
      $scope.modalCadastro.hide();
    }
  };

  $scope.meiaEntrada = function(){
    $scope.openModal('MeiaEntrada');
  }

  $scope.solicitacao = function(){
    if(Usuario.logado){
      if(Usuario.filledData($scope.user)){
        $scope.hideModal('MeusDados');
        $scope.checkout($scope.user.id);
      }else{
        $scope.MeusDados();
        showAlert('UEEGO','Preencha seus dados para solicitar sua Carteira de Identificaçao Estudantil');
      }
    }else{
      cadastrar();
    }
  }

  $scope.checkout = function(usuario_id){

  }

  $scope.MeusDados = function(){
    $scope.openModal('MeusDados');
  }

  $scope.$on('$destroy', function(){
    $scope.modalMeusDados.remove();
    $scope.modalMeiaEntrada.remove();
    $scope.modalSolicitacao.remove();
    $scope.modalCadastro.remove();
  });

  $scope.init = function(){
    Usuario.init();
  }

  $scope.estudanteAuthenticated = function(){
    console.log("Usuario "+!Usuario.logado());
    return !Usuario.logado();
  }

  function showAlert(title,message){
    var alertPopup = $ionicPopup.alert({
     title: title,
     template: message,
    });

     alertPopup.then(function(res) {
       
     });
  }

  function cadastrar(){
    $scope.facebook = true;
    $scope.openModal('Cadastro');
  }

})

.controller('MeusDadosCtrl', function($scope, $ionicActionSheet, $ionicPopup, $cordovaCapture, $cordovaImagePicker, $cordovaCamera, Usuario){
    // Triggered on a button click, or some other target
  // Triggered on a button click, or some other target
 
$scope.save = function(usr, show_alert){
  Usuario.setObject(usr);
  if(show_alert){
    showAlert('UEEGO','Dados salvos');
  }
}

$scope.getDocument = function(user_prop){
  showActionSheet(user_prop);
}

$scope.solicitacaoDisabled = function(user){
  return !Usuario.filledData(user);
}

function setPropriedade(propriedade, value){
  $scope.user[propriedade] = value;
  $scope.save($scope.user, false);
}

function getImageFromProvider(provider, user_prop){
  var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      targetWidth: 50,
      targetHeight: 50,
      correctOrientation:true,
      saveToPhotoAlbum: true,
    };
  
  if(provider == 0){ //camera
    options.sourceType = Camera.PictureSourceType.CAMERA;
  }else if(provider == 1){ //galeria
    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
  }

  if(user_prop == "foto"){
    options.allowEdit = true;
  }

  getPicture(user_prop, options);
}

function showActionSheet(user_prop) {
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-camera color-positive"></i>Câmera' },
       { text: '<i class="icon ion-images color-positive"></i>Galeria' },
     ],
     titleText: 'Obter de',
     cancelText: '<b class="actioncancel" >Cancelar</b>',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       getImageFromProvider(index, user_prop);
       return true;
     }
   });
 };

function getPicture(user_prop, options){
    $cordovaCamera.getPicture(options).then(function(data) {
      setPropriedade(user_prop, data);
    }, function(err) {
      alert('Error');
    });
}

function showAlert(text){
  var alertPopup = $ionicPopup.alert({
    title: '',
    template: text
  })

  alertPopup.then(function(res){});
}

})

.controller('MeiaEntradaCtrl', function($scope){
  $scope.lei_meia_entrada = {
    introducao : {paragraph: ['Sancionada pela presidente Dilma Roussef no dia 26 de dezembro de 2013, a nova lei que regulamenta a meia-entrada em cinemas, circos, espetáculos teatrais, esportivos, musicais e de lazer mudou as regras de emissão das Carteiras de Identificação Estudantil (CIE), trazendo mais segurança para o estudante e para os produtores culturais.','Agora, apenas entidades estudantis podem emitir o documento, que passou por uma padronização nacional, incluindo a certificação digital, código de barras e QR Code para eliminar as fraudes. O desconto de 50% no pagamento dos ingressos para os deficientes e para jovens de 15 a 29 anos de baixa renda inscritos no Cadastro Único para Programas Sociais do governo federal também foi autorizado pela nova lei.','A Lei nº 12.933 ainda assegura que 40% dos ingressos dos espetáculos artísticos, culturais e esportivos sejam reservados para os usuários da meia entrada e proporciona mais rigor na fiscalização. Veja o que muda com a nova Lei:']},
    body: {
      definicao: {title:'O que é a lei da meia entrada?', text:'A meia-entrada está nas bandeiras de lutas dos estudantes há 70 anos e é um dos principais direitos conquistados pela juventude no século passado. Nos últimos anos, entretanto, ela foi fortemente atacada após a edição da Medida Provisória 2208/01, que concedeu a entidades alheias a escola e a universidade o poder de emissão da Carteira de Identificação Estudantil (CIE). O resultado foi a proliferação de fraudes, o que fragilizou o direito à meia-entrada e fez subir o preço dos ingressos.A nova lei da meia-entrada revoga a MP 2208/01, padroniza nacionalmente a Carteira de Identificação Estudantil (CEI), reforça a fiscalização sobre a emissão do documento e assegura que um mínimo de 40% dos ingressos de espetáculos artísticos, culturais e esportivos sejam reservados exclusivamente para estudantes, deficientes e jovens de baixa renda.'},
      autorizados_confeccao:{title: 'Quem pode fazer as carteirinhas?', text: 'Apenas entidades do movimento estudantil estão autorizadas a emitir a Carteira de Identificação Estudantil (CIE). São elas: União Nacional dos Estudantes (UNE), União Brasileira dos Estudantes Secundaristas (UBES), Associação Nacional de Pós-Graduandos (ANPG), as Uniões Estaduais e Municipais de Estudantes (UEEs e UMEs), Diretórios e Centros Acadêmicos das universidades (DCEs, DAs e CAs).'},
      mudancas: {title:'O que muda com a nova carteirinha?', text: 'Além de poder ser emitida apenas pelas entidades do movimento estudantil autorizadas, a Carteira de Identificação Estudantil (CIE) agora é padronizada nacionalmente e deve vir com certificação digital de segurança garantida pela parceria com Instituto Nacional de Tecnologia da Informação (ITI), autarquia ligada à presidência da república. A nova carteirinha contém um código de barras e um QR Code que traz mais segurança e tranquilidade ao usuário e ao bilheteiro, impedindo as fraudes.'},
      forma_solicitacao:{title: 'Como solicito a minha carteirinha?', text: 'Em Goiás, a carteirinha pode ser solicitada na União Estadual dos Estudantes de Goiás (UEE-GO).'},
      requisitos_solicitacao: {title: 'O que é necessário para fazer a carteirinha?', text: 'É preciso estar regularmente matriculado em algum estabelecimento de ensino fundamental, médio, superior ou de pós-graduação credenciado pelo Ministério da Educação (MEC). Estudantes de cursos não reconhecidos pelo MEC (como os de informática, de idiomas, cursos de especialização de curta duração, etc.) NÃO podem solicitar a carteirinha.'},
      validade: {title: 'A carteirinha da UEE-GO vale para todo país?', text: 'Sim. A carteira tem validade de um ano e pode ser usada em todo o território nacional.'}
    }
  }
});