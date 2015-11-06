'use strict';

/**
 * Copyright (C) 2015, Ottlo pvt. ltd.
 * 
 * Description : Shared Controller - indexController: Managing navbar and login and loginwithfb.
 * 
 * @author Lay shah
 */

/**
 * Create indexController
 * 
 * @param $scope
 */
sharedModule.controller('indexController', [ '$scope','$location','$window','signupService','indexService','cropService','$http',function($scope,$location,$window,signupService,indexService,cropService,$http) {
	$scope.isShown = true;
	$scope.croppedImage;
	$scope.birthDate=new Date('2014', '7', '20');
	$scope.showNavbar=true;

	$scope.title="Funvest";
	 var location= $location.url();
	 console.log(window.location.hash);
	 
	 
	 
	 
	 
	 //////////////Specific function for funvest
$scope.showNavbar=true;
	 console.log($location.url());
	$scope.changeline=function(num){
		console.log(num);
		var side= ((num-1)*25)+5+'%';
		document.getElementById('hr').style.marginLeft=side.toString();

		if(num==3){
				var side="58%";
				document.getElementById('hr').style.marginLeft=side.toString();
			document.getElementById('hr').style.width="8%";
		}
		if(num==2){
				var side="28%";
				document.getElementById('hr').style.marginLeft=side.toString();
			document.getElementById('hr').style.width="18%";
		}
		if(num==1){

			document.getElementById('hr').style.width="15%";
		}
		if(num==4){
						var side="78%";
				document.getElementById('hr').style.marginLeft=side.toString();
			
			document.getElementById('hr').style.width="7%";
		}
	}

		 //////////////Specific function for funvest ends
	$scope.clearMsg=function(){

		$scope.message="";
	}
	$scope.getCropData=function(){
		$scope.croppedImage=cropService.getCropImg().getDataURL();
	}
	$scope.reset =function(){
		
    $scope.firstName ="";
    $scope.middelName ="";
    $scope.lastName ="";
    $scope.gender ="";
    $scope.city ="";
    $scope.state ="";
    $scope.country ="";
    $scope.zipCode ="";
    $scope.email ="";
    $scope.password ="";
    $scope.confirmPassword ="";
   
	};
	
	//checking is user loggedin or not
	$scope.checkLogin =function(){
		
	
		
		var  promiseCheckLogin=indexService.checkLogin();
		promiseCheckLogin.$promise.then(function(d) {
			
			var  promiseGetAccount=	indexService.account();
			promiseGetAccount.$promise.then(function(data) {
	       		$scope.firstName=data.user.displayName;
	       		$scope.display_pic=data.user.photo;
	       		$scope.user_id=data.user.user_info_id;
	       		$scope.showfirstName=true;
	       		$scope.showSignUpLoginButton=false;
	       		$scope.showlogout=true;
	       	},function(reason) {
	    		$scope.message = reason;
	    		console.log(reason);
	    		$scope.showSignUpLoginButton=true;
	    		$scope.showlogout=false;
				$scope.showfirstName=false;

	    	});
		},function(reason){
			$scope.showSignUpLoginButton=true;                 
		 	$scope.showfirstName=false;
		 	$scope.showlogout=false;
		 	$scope.showSignUpModal=true;
		});
	}
	$scope.validationError=[];
	var listOfValidationError=0;
	$scope.validate =function(){
			$scope.validationError=[];
			listOfValidationError=0;
			var re = /[0-9]/;
			if($scope.firstName==null|| re.test($scope.firstName)){
				$scope.validationError[listOfValidationError]="First name is Required Field and must not contain Number";	
				listOfValidationError++;
			}
			if($scope.middelName==null || re.test($scope.middelName)){
				$scope.validationError[listOfValidationError]="Middel name is Required Field and must not contain Number";	
				listOfValidationError++;
			}
			if($scope.lastName==null || re.test($scope.lastName)){
				$scope.validationError[listOfValidationError]="Last name is Required Field and must not contain Number";	
				listOfValidationError++;
			}
			
			$scope.birthDate=document.getElementById('bday').value;

			console.log($scope.birthDate+ $scope.zipCode);
			if($scope.birthDate==null ){
				$scope.validationError[listOfValidationError]="Birth Date is Required Field and must not contain Number";	
				listOfValidationError++;
			}
			if($scope.gender==null || re.test($scope.gender)){
				$scope.validationError[listOfValidationError]="Gender is Required Field and must not contain Number";	
				listOfValidationError++;
			}
			if($scope.email==null){
				$scope.validationError[listOfValidationError]="email is Required Field";	
				listOfValidationError++;
			}
			if($scope.password!=$scope.confirmPassword){
				$scope.validationError[listOfValidationError]="Password doesn't match confirm password";	
				listOfValidationError++;	
			}
			if($scope.croppedImage==null){
				$scope.validationError[listOfValidationError]="Image is required";	
				listOfValidationError++;	
			}
			
      		
      		if($scope.password.length < 6) {
        		$scope.validationError[listOfValidationError]="Lenth of Password must be more than 6 ";	
				listOfValidationError++;
      		}
      		var re = /[0-9]/;
      		if(!re.test($scope.password)){
      			$scope.validationError[listOfValidationError]="Password must contain one Number";	
				listOfValidationError++;	
      		}
      		re = /[A-Z]/;
      		if(!re.test($scope.password)){
      			$scope.validationError[listOfValidationError]="Password must contain one Capital letter";	
				listOfValidationError++;	
      		}
      	
      

	}
	//checking is user loggedin or not complete	
	$scope.checkLogin();
	
	$scope.showSignUpModal = true;
	$scope.selectedInterests;
	//signup create user
	$scope.CreateUser =function(){
	 		$scope.validate();
	 		if(listOfValidationError==0){
		 		console.log();
		 		$scope.showSignUpLoginButton=false;
		 		$scope.showSignUpModal = false;
		 		
		 		var  promiseGetFileUrl=signupService.addUser($scope.firstName,$scope.middelName,$scope.lastName,$scope.birthDate,
		 			$scope.gender,$scope.city,$scope.state,$scope.country,$scope.zipCode,$scope.email,
		 			$scope.password,$scope.selectedInterests,$scope.croppedImage);
	    			
	    			promiseGetFileUrl.$promise.then(function(data) {
	        			$scope.handleLogin($scope.email,$scope.password);
	        			
	        			$('#signUpModal').foundation('reveal', 'close');
	       		
	    		}, function(reason) {
	    			$scope.showSignUpLoginButton=true;
	    			$scope.showSignUpModal = true;
	    			$scope.messageSignUp = reason;
	    			console.log(reason);
	    		});
	 		}
	 		else{
	 			console.log(listOfValidationError);
	 			$scope.messageSignUp=$scope.validationError;
	 		}



	 		
	 		
	}
	//create user ends

	$scope.handleLogin= function(loginEmail,loginPassword){
		console.log(loginEmail);

		var  promisePostLogin=indexService.login(loginEmail,loginPassword);
			promisePostLogin.$promise.then(function(d) {
        		//indexService.saveUserData(data);
        		console.log(d.status);
        		$scope.showSignUpLoginButton=false;
       			var  promiseGetAccount=	indexService.account();//promise allows synchronous loading for after data come
       			promiseGetAccount.$promise.then(function(data) {
       				console.log(data);
       				$scope.firstName=data.user.userName;
       				$scope.dp=data.user.photo;
       				$scope.showfirstName=true;
       				//$('#loginModal').foundation('reveal', 'close');
       				 $("#loginModal").modal("hide");

       				
       				$scope.checkLogin();
       			},function(reason) {
    				$scope.message = reason;
    				console.log(reason);
    			});

    		}, function(reason) {
    			$scope.message = reason;
    			console.log(reason);
    		});
	}
	$scope.logout=function(){
		console.log("logout");
		indexService.logout();
		$scope.checkLogin();

	}
	$scope.selectedInterests=[];
	$scope.AddselectedInterests = function(interest){
            
                	console.log(interest);
                    var index = $scope.selectedInterests.indexOf(interest);
                    if ( index >= 0 ) {
                        $scope.selectedInterests.splice( index, 1 );
                        console.log(JSON.stringify($scope.selectedInterests));
                    }   
                    else{
                        $scope.selectedInterests.push( interest );
                        console.log(JSON.stringify($scope.selectedInterests)); 
                    }
            console.log($scope.zipCode);       
    }

    $scope.handleChangePassword=function(Email,CPassword){
    	var  promiseChangePassword=indexService.changePassword(Email,CPassword);
    	promiseChangePassword.$promise.then(function(d) {
        		//indexService.saveUserData(data);
        		console.log(d);
        		$scope.changePasswordMessage="Password changed successfully";
       			

    		}, function(reason) {
    			$scope.changePasswordMessage=reason;		
    		});
    }
	
	$scope.loggedInWithFB=false;

	
	$scope.handleFBLogin=function(){
			$http.get('/auth/facebook').
		  	success(function(data, status, headers, config) {
		    	$scope.loggedInWithFB=true;	
        		console.log(data);
        		FB.api("/"+data.user.id+"/picture",
            	function (response) {
                	if (response && !response.error) {
                   		 profile.user.photo=response;    
                	}
                	});
		  	}).
		  	error(function(data, status, headers, config) {
		  			console.log(data);
		  	});
		
	
	}

} ]);
