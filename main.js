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
	var gradation = "";
    let colors = '';

	// 色の数
	const colorRadios = document.getElementsByName('colors');
    const colorRadiosLen = colorRadios.length;
	var wrapper = document.getElementById("colorCodes");
	while (wrapper.firstChild) {
	  wrapper.removeChild(wrapper.firstChild);
	}	
    for (let i = 0; i < colorRadiosLen; i++){
        if (colorRadios.item(i).checked){
            colors = colorRadios.item(i).value;
        }
    }
	for(var i = 0;i<colors;i++){
		var color = getColorCode();
		var colorCode = '#'+color;
		gradation+=colorCode+',';
		let new_element = document.createElement('span');
		new_element.textContent = colorCode;
		new_element.style.color = colorCode;
		wrapper.appendChild(new_element);
	}
	
	gradation = gradation.slice(0, -1);
	alert(colors);


	// グラデーションの種類
	const typeRadios = document.getElementsByName('type');
    const typeRadiosLen = typeRadios.length;
    let checkValue = '';
    for (let i = 0; i < typeRadiosLen; i++){
        if (typeRadios.item(i).checked){
            checkValue = typeRadios.item(i).value;
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