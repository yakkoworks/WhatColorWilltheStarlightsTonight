$(function(){
	load();
	$('#reload').click(function(){
		load();
	})

	$('.colorCode').click(function () {
		var color = this.innerHTML;
		setClipBoard(color);
		// alert(color);
		// getBirthdayStar();
	});
});

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

function setClipBoard(data){
	var e = document.createElement('textarea');
  	e.textContent = data;
  	document.body.appendChild(e);
  	e.select();
  	document.execCommand('copy');
  	e.remove();
}

function load(){
	var startColor = getColorCode();
	var startColorCode = "#"+startColor;
	var endColor = getColorCode();
	var endColorCode = "#"+endColor;
	var gradation = startColorCode+','+endColorCode;
	$('#startColorCode').text(startColorCode);
	$('#startColorCode').css('color',startColorCode);
	$('#endColorCode').text(endColorCode);
	$('#endColorCode').css('color',endColorCode);

	// グラデーションの種類
	const radios = document.getElementsByName('type');
    const radiosLen = radios.length;
    let checkValue = '';
    for (let i = 0; i < radiosLen; i++){
        if (radios.item(i).checked){
            checkValue = radios.item(i).value;
        }
    }
	// $('#preview').css('background', 'linear-gradient('+gradation+')');
	$('#preview').css('background', checkValue+'-gradient('+gradation+')');
	
	var node = document.getElementById("preview");
	var output = document.getElementById('image');
	if(output.children[0] != null) {
		output.children[0].remove();
	}
	domtoimage.toPng(node,{width:1280,height:1280})
	.then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        output.appendChild(img);
    })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}