var txt;
var array;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function()
{
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            txt = JSON.parse(xhr.responseText);
            var size = Object.keys(txt).length;
            var iSize, fSize;
            array = new Array(size);
            for(var i=0; i < size; i++) {
                array[i] = new Array(4);

                array[i][0] = txt[i].name;
                array[i][1] = txt[i].description;

                //images
                iSize = Object.keys(txt[i].img).length;
                array[i][2] = new Array(iSize);
                for(var y=0; y < iSize; y++) {
                    array[i][2][y] = txt[i].img[y];
                }

                // features
                fSize = Object.keys(txt[i].features).length;
                array[i][3] = new Array(fSize);
                for(var y=0; y < fSize; y++) {
                    array[i][3][y] = txt[i].features[y];
                }
            }

            var item = document.getElementById('portfolio-item');
            item.innerHTML = array[0][0];
            var description = document.getElementById('portfolio-description-text');
            description.innerHTML = array[0][1];

            //portfolio-features-list-item
            for(var i = 0; i < array[0][3].length; i++) {
                var listitem = document.createElement('li');
                listitem.setAttribute('class', 'portfolio-features-list-item');
                listitem.innerHTML = array[0][3][i];
                document.getElementById('portfolio-features-list').appendChild(listitem);
            }
            //portfolio-current-image
            var image = document.getElementById('portfolio-current-image');
            image.src = array[0][2][0];


            var img, number;
            for(var i = 0; i < array.length; i++) {
                img = document.createElement('img');
                //listitem.setAttribute('class', 'portfolio-features-list-item');
                img.src = array[i][2][0];
                number = i + 1;
                img.id = "pj" + number;
                addEventCustom(img, i, item, description, image);
                document.getElementById('portfolio-images-container').appendChild(img);
            }
        }
    }
};
xhr.open("GET", 'projects.json?a=b', true);
xhr.send();

function addEventCustom(img, i, item, description, image) {
    img.addEventListener('click', function(e) {
        var list = document.getElementById('portfolio-features-list');
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        item.innerHTML = array[i][0];
        description.innerHTML = array[i][1];
        for(var y = 0; y < array[i][3].length; y++) {
            var listitem = document.createElement('li');
            listitem.setAttribute('class', 'portfolio-features-list-item');
            listitem.innerHTML = array[i][3][y];
            list.appendChild(listitem);
        }
        image.src = array[i][2][0];
    });
}