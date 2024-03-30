
function getRandomHex(min, max) {
	var rand = Math.random() * (max - min) + min;
	return Math.round(rand);
  }

function getColorCode() {
	var colorCode = "";
	for(var i = 0; i <  6; i++) {
		colorCode = colorCode + getRandomHex(0,15).toString(16);
	}
	return colorCode;
}
// function getBirthdayStar(){
// 	var today = new Date();
// 	var month = String(today.getMonth() + 1).padStart(2, '0');
// 	var day = String(today.getDate()).padStart(2, '0');
// 	// alert(month);
// 	// alert(day);
// }

function setClipBoard(data){
	var e = document.createElement('textarea');
  	e.textContent = data;
  	document.body.appendChild(e);
  	e.select();
  	document.execCommand('copy');
  	e.remove();
}

$(function(){
	var startColor = getColorCode();
	var startColorCode = "#"+startColor;
	var endColor = getColorCode();
	var endColorCode = "#"+endColor;
	var gradation = startColorCode+','+endColorCode;
	$('#startColorCode').text(startColorCode);
	$('#endColorCode').text(endColorCode);
	$('#preview').css('background', 'linear-gradient('+gradation+')');
	
	var node = document.getElementById("preview");
	var output = document.getElementById('image');

	domtoimage.toPng(node,{width:1280,height:1280})
	.then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        output.appendChild(img);
    })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

	$('#reload').click(function(){
		location.reload();
	})

	$('.colorCode').click(function () {
		var color = this.innerHTML;
		setClipBoard(color);
		// alert(color);
		// getBirthdayStar();
	});

});