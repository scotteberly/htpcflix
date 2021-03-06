var seeSelectedRow = null;
var seeSelectedMovie = null;
var seeSelectedProfile = null;
var seeLastKeyPressed = '';
var seeLastKeyPressTime = '';
var seeTimeout = '';

seeStyleAdjustments();

var seeSliders = document.getElementsByClassName('slider triangleBtns');

for(var i=0;i<seeSliders.length;i++)
{
   seeSliders[i].style.width = '20000px';
   seeSliders[i].style.position = 'initial';
   seeSliders[i].style.overflow = 'visible';
}

window.onkeyup = function(e) {
   e.preventDefault();
   var key = e.keyCode ? e.keyCode : e.which;

   if(key == 37) //left
   {
		if(typeof netflix.nfPage != 'undefined') //not profiles gate
		{
			if(seeSelectedRow == null)
			{
				seeSelectNextRow();
			}

			seeSelectPreviousMovie();

			seeSelectedMovie.style.backgroundColor = 'blue';
			window.scrollTo(seeSelectedMovie.offsetLeft-(document.documentElement.clientWidth/2),seeSelectedRow.offsetTop-(document.documentElement.clientHeight/3));
		}
		else //profiles gate
		{
			if(seeSelectedProfile == null)
			{
				seeSelectedProfile = document.querySelectorAll('ul.profiles')[0].querySelectorAll('li')[0];
			}
			else
			{
				seeSelectedProfile.style.backgroundColor = '';
				if(seeSelectedProfile != document.querySelectorAll('ul.profiles')[0].querySelectorAll('li')[0])
				{
					seeSelectedProfile = seeSelectedProfile.previousElementSibling;
				}
			}
			
			seeSelectedProfile.style.backgroundColor = 'green';
		}
   }
   else if(key == 38) //up
   {
      seeSelectPreviousRow();
   }
   else if(key == 39)//right
   {
		if(typeof netflix.nfPage != 'undefined') //not profiles gate
		{
			if(seeSelectedRow == null)
			{
				seeSelectNextRow();
			}   

			seeSelectNextMovie(); 

			seeSelectedMovie.style.backgroundColor = 'blue';
			window.scrollTo(seeSelectedMovie.offsetLeft-(document.documentElement.clientWidth/2),seeSelectedRow.offsetTop-(document.documentElement.clientHeight/3));
		}
		else //profiles gate
		{
			if(seeSelectedProfile == null)
			{
				seeSelectedProfile = document.querySelectorAll('ul.profiles')[0].querySelectorAll('li')[0];
			}
			else
			{
				seeSelectedProfile.style.backgroundColor = '';
				if(seeSelectedProfile != document.querySelectorAll('ul.profiles')[0].querySelectorAll('li')[document.querySelectorAll('ul.profiles')[0].querySelectorAll('li').length-1])
				{
					seeSelectedProfile = seeSelectedProfile.nextElementSibling;
				}
			}
			
			seeSelectedProfile.style.backgroundColor = 'green';
		}
   }   
   else if(key == 40) //down
   {
       seeSelectNextRow();
   }
   else if(key == 13) //enter
   {
      if(new Date().getTime()<=seeLastKeyPressTime.getTime()+300 && seeLastKeyPressed == '13') //double click
      {
         clearTimeout(seeTimeout);
         seeSelectedMovie.getElementsByClassName('playLink')[0].click(); //play current movie
      }
      else //single click
      {
         seeTimeout = setTimeout(function(){window.location = seeGetShowLink(seeSelectedMovie)},300); //go to show
      }
   }
   else
   {
      console.log(key);
   }

   seeLastKeyPressed = key;
   seeLastKeyPressTime = new Date();
}

function seeSelectNextRow()
{
   var selector = '';
   if(netflix.nfPage == 'WiHome')
   {
      selector = '.mrow';
   }
   else
   {
      selector = 'li[id^="e"]';
   }

   if(seeSelectedRow == null)
   {
      seeSelectedRow = document.querySelectorAll(selector)[0];
   }
   else
   {
      seeSelectedRow.style.backgroundColor = '';
      if(seeSelectedRow != document.querySelectorAll(selector)[document.querySelectorAll(selector).length-1])
      {
         seeSelectedRow = seeSelectedRow.nextElementSibling;
      }
   }

   if(seeSelectedMovie!=null)
   {
      seeSelectedMovie.style.backgroundColor='';
      seeSelectedMovie = null;
   }
   
   	seeSelectedRow.style.backgroundColor = 'red';
	window.scrollTo(0,seeSelectedRow.offsetTop-(document.documentElement.clientHeight/3));
}

function seeSelectPreviousRow()
{
   var selector = '';
   if(netflix.nfPage == 'WiHome')
   {
      selector = '.mrow';
   }
   else
   {
      selector = 'li[id^="e"]';
   }

   if(seeSelectedRow == null)
   {
      seeSelectedRow = document.getElementsByClassName('mrow')[0];
   }
   else
   {
      seeSelectedRow.style.backgroundColor = '';
      if(seeSelectedRow != document.getElementsByClassName('mrow')[0])
      {
         seeSelectedRow = seeSelectedRow.previousElementSibling;
      }
   }

   if(seeSelectedMovie!=null)
   {
      seeSelectedMovie.style.backgroundColor='';
      seeSelectedMovie = null;
   }
   
	seeSelectedRow.style.backgroundColor = 'red';
	window.scrollTo(0,seeSelectedRow.offsetTop-(document.documentElement.clientHeight/3));
}

function seeSelectNextMovie()
{

   if(seeSelectedMovie == null)
   {
      seeSelectedMovie = seeSelectedRow.getElementsByClassName('agMovie')[0];
   }
   else
   {
      seeSelectedMovie.style.backgroundColor = '';
      if(seeSelectedMovie != seeSelectedRow.getElementsByClassName('agMovie')[seeSelectedRow.getElementsByClassName('agMovie').length-1])
      {
         seeSelectedMovie = seeSelectedMovie.nextElementSibling;
      }
   }
}

function seeSelectPreviousMovie()
{

   if(seeSelectedMovie == null)
   {
      seeSelectedMovie = seeSelectedRow.getElementsByClassName('agMovie')[0];
   }
   else
   {
      seeSelectedMovie.style.backgroundColor = '';
      if(seeSelectedMovie != seeSelectedRow.getElementsByClassName('agMovie')[0])
      {
         seeSelectedMovie = seeSelectedMovie.previousElementSibling;
      }
   }
}

function seeGetShowLink(id)
{
   if(netflix.nfPage == 'WiHome')
   {
      var showLink = id.getElementsByClassName('playLink')[0].getAttribute('data-uitrack').split(',');
      showLink.push(id.getElementsByClassName('boxShotImg')[0].getAttribute('alt').replace(/ /g,'_'));
      showLink = 'http://www.netflix.com/WiMovie/'+showLink[showLink.length-1]+'/'+showLink[0]+'?trkid='+showLink[1];
   }
   else
   {
      var showLink = seeSelectedRow.getElementsByClassName('watchlk')[0].href;
   }

   return showLink;
}
   
function seeStyleAdjustments()
{
   //document.getElementById('global-header').style.display='none';
   //document.getElementById('account-tools').style.display='none';
}
