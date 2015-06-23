// https://lcboapi.com/products?access_key=MDpjZDI3NmQ2NC1mOGUxLTExZTQtYjM5My1jNzVkYjYzM2MyYTE6TXVpd1VCY2psbmFtamF0SEJuUjFQRjh0d0NmNWE4M2ZDWThk


// Look in primary category for beer types

// q=beer in the url

// q=query
var beerApp = {};

beerApp.getInfo = function(typeOfBeer){
	console.log(typeOfBeer);
	$.ajax({
		url:'https://lcboapi.com/products',
		dataType:'jsonp',
		type:'GET',
		data:{
			// q: 'beer ' + typeOfBeer,
			q:'beer+' + typeOfBeer,
			per_page: '100',
			// Live access key
			// access_key: 'MDpkYmRkOGQ0YS0wZWI1LTExZTUtYTcxNC02ZjE4ODY5NjQ2Mzc6SEZkN2JhbmEwN3hnWVVuZXBPTkFLYkJJMFl0bG8xUFZqcGNj'

			// local
			access_key: 'MDoxZjFmZjRhYS1mYTQ2LTExZTQtODRkMy05M2UzOTFhZTAyODA6QVJ3NDZ6cmpTZkhtZ1RGQXZkSm1SYnV6bzc3a1VrRWhBenlU'
		},
		success:function(data){
			beerApp.data = data.result;
			console.log(data.result);
			beerApp.sortBeer(beerApp.data);
			}	
	});
};
// push each new item into the array
// when loop is finished math.random to pick an individual item out of the array (beer.length)
// math.floor * the length of the array above math.floor(math.random()* 50)
// if the array is greater or longer than my 

beerApp.sortBeer = function(placeholder){
	//GEt random number based on length of placeholder var, which is just our beer data
	var x = Math.floor((Math.random() * placeholder.length))
	$('.container').empty();	

	//Access the new random element from the placeholder array with our random x number
	//And use that to append that data on the page.
		
		
			console.log(placeholder[x].image_thumb_url);
			if(placeholder[x].image_thumb_url === null){
				var beerImage = $('<img>').attr('src', 'assets/beerBottle.jpg');
			} else{
				var beerImage = $('<img>').attr('src',placeholder[x].image_thumb_url);
			}

			if(placeholder[x].name === null){
				var name = $('<h2>').text(' ');
			} else{
				var name = $('<h2>').text(placeholder[x].name);
			}
			
			if(placeholder[x].tertiary_category === null){
				var tertiary_category = $('<h3>').text(' ');
			} else{
				var tertiary_category = $('<h3>').text(placeholder[x].tertiary_category);

			}
			

			if(placeholder[x].tasting_note === null){
				var tastingNote = $('<p>').text(' ');
			} else{
				var tastingNote = $('<p>').text(placeholder[x].tasting_note);
			}

			if(placeholder[x].origin === null){
				var origin = $('<h4>').text(' ');
			} else{
				var origin = $('<h4>').text(placeholder[x].origin);
			}
			
			
			var serving;
			if(placeholder[x].serving_suggestion === null){
				serving = $('<p>').text(' ');
			} else{
				serving = $('<p>').text(placeholder[x].serving_suggestion);
			}

			
			if(placeholder[x].alcohol_content/100 === null){
				var alcohol = $('<p>').text(' ');
				console.log('yes');
			} else{
				var alcohol = $('<p>').text(placeholder[x].alcohol_content/100);
			}


			// alcohol_content


			//Put everything on there
			$('.container').append(beerImage,name,tertiary_category,origin,tastingNote,serving,alcohol);

			var locations;

			$.ajax({
				url:'http://lcboapi.com/stores',
				headers: { 
					'Authorization': 'Token MDoxZjFmZjRhYS1mYTQ2LTExZTQtODRkMy05M2UzOTFhZTAyODA6QVJ3NDZ6cmpTZkhtZ1RGQXZkSm1SYnV6bzc3a1VrRWhBenlU' 
					},
				dataType:'json',
				type:'GET',
				data:{
					product_id: x.id
				},
				success:function(data){
					locations = data.result;
					console.log(locations);

					var places = $("ul#beerPlaces");

					for(i = 0; i < locations.length; i++) {
						places.append(
							$('<li>').append(
								$('<a>').attr('href', 'http://google.ca/maps/place/' + locations[i].latitude + ',' + locations[i].longitude).html(
									locations[i].address_line_1
								)
							)
						);
					}
	
				}
			});		
};

beerApp.events = function(){

		$('#beers').on('change',function(e){
			e.preventDefault();
			var beer = $(this).val();
			beerApp.getInfo(beer);
			beerApp.sortBeer(beer);
		});

		// Apply a submit event listener to the form
		// With a class of search
		$('.search').on('submit', function(e){
			e.preventDefault();
			// get the entered user input
			var searchQuery = $(this).find('input[type=search]').val();
			console.log(searchQuery);
			// pass that value to the app.getArt() method
			beerApp.getInfo(searchQuery);
			// clear search value
			$(this).find('input[type=search]').val('');
		});
	};

	
// 	$('a').on('click', function(){
// 		tertiary = $(this).attr('id');
// 		console.log(tertiary);
// 		secondary = $(this).attr('class');
// 		console.log(secondary);
// 		beerApp.getInfo(secondary,tertiary);

// 	});
	
// };

// use 

// After we get the beer we want to display the beer

// beerApp.displayBeer = function(beerData){
// $('#beer').empty();

// $.each(beerData, function(i, piece){
// 	// if(piece.webImage != null){
// 		var $title = $('<h2>').text(piece.title);
// 		var $beerCompany = $('<p>').addClass('company').text(piece.producer_name);
// 		var $beerDrescription = ('<p>').addClass('description').text(piece.tasting_note);
// 		var $foodPairing = ('<p>').addClass('foodPairing').text(piece.serving_suggestion);
// 		var $location = ('<p>').addClass('')
// 		var $image = $('<img>').attr('src', piece.image_thumb_url);
// 		console.log('omg it worked');
// 	}
// });
// };
beerApp.init = function(){
	// beerApp.getInfo('lager');
	beerApp.events();
};


$(function(){
	beerApp.init();

});

// beerApp.displayInfo = function(apiData){
// 	var data = apiData.curent
// }