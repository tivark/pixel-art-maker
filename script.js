window.onload = function() {
    createField();
    createPalette();
    updateSelectedColor('000000');
    setPaletteListeners();
    window.addEventListener('mousedown', e => {
        mouseDown = true;
    })
    window.addEventListener('mouseup', e => {
        mouseDown = false;
    })
    document.getElementById('canvas').addEventListener('mousedown', e => {
        return false;
    })
}
const paletteColors = ['a44841', 'ed665b', 'ef7e76', 'db9d55', 'f5af5f', 'f8c588', 'e5d85a',
    'fff164', 'fff59b', '6abf53', '84f167', 'abf4a0', '3253ab', '4476f7', '8fa8f9', '5a49ac',
    '8067f8', 'b09dfa', '714495', 'bc6ffa', 'd4a0fb', '000000', '353535', '666666', '989898',
    'cbcbcb', 'ffffff', '3a2821', '4e342b', '6e483b', '896a5e', 'a68e85'
]
const canvasSize = { width: 100, height: 50 };
let sltdColor = document.getElementById('selected-color-preview');
let mouseDown = false;

const pixel = document.createElement('div');
pixel.classList.add('pixel');
pixel.dataset['color'] = "";

function createField() {
    const canvas = document.querySelector('#canvas');
    for (var i = 0; i < canvasSize.height; i++) {
        for (var j = 0; j < canvasSize.width; j++) {
            canvas.append(pixel.cloneNode());
        }
        canvas.append(document.createElement('br'));
    }
    setPixelsListeners();
}

function createPalette() {
    const palette = document.getElementById('palette');
    for (var i = 0; i < paletteColors.length; i++) {
        var colorSample = pixel.cloneNode();
        colorSample.classList = 'color-sample';
        colorSample.dataset.color = paletteColors[i];
        colorSample.style.backgroundColor = '#' + paletteColors[i];
        palette.append(colorSample);
    }
}

function setPixelsListeners() {
    const pixels = document.getElementsByClassName('pixel');
    for (const p of pixels) {
        p.addEventListener('mouseover', e => {
            if (mouseDown) {
                setPixelColor(e.target);
            }
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else {
                document.selection.empty();
            }
        });
        p.addEventListener('mousedown', e => {
            setPixelColor(e.target);
        });

    }
}

function setPaletteListeners() {
    const colors = document.getElementsByClassName('color-sample');
    for (const col of colors) {
        col.addEventListener('click', function() {
            updateSelectedColor(this.dataset.color);
        });
    }
}

function updateSelectedColor(newColor) {
    sltdColor.dataset.color = newColor;
    sltdColor.style.backgroundColor = '#' + newColor;
}

function setPixelColor(el) {
    const setColor = sltdColor.dataset.color;
    el.style.backgroundColor = '#' + setColor;
    el.style.borderColor = '#' + setColor;
    el.dataset.color = setColor;
}