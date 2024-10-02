const addText = document.getElementById('add');
const canvas = document.getElementById('canvas');
const font=document.getElementById('font-family');
const fontSize=document.getElementById('tsize');
const decrement=document.getElementById('decrement');
const increment=document.getElementById('increment');
const bold=document.getElementById('bold');
const italic=document.getElementById('italic');
const underline=document.getElementById('underline');
const alignment=document.getElementById('alignment');
const icn=document.getElementById('icn');

const align=['Left','Center','Right'];
let i=0;


addText.addEventListener('click', () => {
    const textBox = document.createElement('textarea');

    //'Jetbrains Mono','Courier New',Lombok,'Brush Script MT',Arial
   
    textBox.style.cssText = `
        position: absolute;
        background-color: #D4D4D4;
        width: auto;
        height: auto;
        line-height:normal;
        padding: 1px;
        font-family:'Arial';
        font-size: 24px;
        overflow: hidden;
        resize: none;
        cursor: crosshair;
        text-align:${alignMent()};
        top: 0;
        left: 0;
    `;
    textBox.placeholder = 'Enter your text';
    
    
    textBox.addEventListener('input', function() {
        textBox.style.height = 'auto'; 
        textBox.style.height = (textBox.scrollHeight) + 'px'; 
    });

    canvas.appendChild(textBox);

    
    let initX = 0, initY = 0, finalX = 0, finalY = 0;

    
    textBox.addEventListener('mousedown', (e) => {
        initX = e.clientX;
        initY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });

    textBox.addEventListener('focus', () => {
        decrement.addEventListener('click', () => {
            
            let currentFontSize = parseInt(fontSize.innerText);;
            if (currentFontSize > 1) { 
                textBox.style.fontSize = (currentFontSize - 1) + 'px';
                fontSize.innerText=currentFontSize-1;
            }
        });

        increment.addEventListener('click',()=>{
            let currentFontSize = parseInt(fontSize.innerText);;
            if (currentFontSize > 1) { 
                textBox.style.fontSize = (currentFontSize + 1) + 'px';
                fontSize.innerText=currentFontSize+1;
            }
        });

        bold.addEventListener('click', () => {
            bold.classList.toggle("active");
            if (bold.classList.contains("active")) { 
                textBox.style.fontWeight = 'bold';
            }
            else{
                textBox.style.fontWeight='normal';
            }
        });

        italic.addEventListener('click', () => {
            italic.classList.toggle("active");
            if (italic.classList.contains("active")) {
                textBox.style.fontStyle = 'italic';
            }
            else{
                textBox.style.fontStyle='normal';
            }
        });

        underline.addEventListener('click', () => {
            underline.classList.toggle("active");
            if (underline.classList.contains("active")) { 
                textBox.style.textDecorationLine='underline';
            }
            else{
                textBox.style.textDecorationLine='none';
            }
        });

        textBox.style.alignment=alignment.addEventListener('click', alignMent);
        
        
    });
    
    function mouseMove(e) {
        const rect = canvas.getBoundingClientRect();

        finalX = initX - e.clientX;
        finalY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;

        let newTop = textBox.offsetTop - finalY;
        let newLeft = textBox.offsetLeft - finalX;

        if (newTop < 0) newTop = 0;
        if (newLeft < 0) newLeft = 0;
        if (newTop + textBox.offsetHeight > rect.height) newTop = rect.height - textBox.offsetHeight;
        if (newLeft + textBox.offsetWidth > rect.width) newLeft = rect.width - textBox.offsetWidth;

        textBox.style.top = newTop + 'px';
        textBox.style.left = newLeft + 'px';
    }

    
    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
});


font.addEventListener('change', ()=>{
    textBox.style.fontFamily = selectedValue;
});

function alignMent() {
    align.forEach((alignment, index) => {
        if (index === i) { 
            icn.src = alignment + '.svg';
        }
    });
    i = (i + 1) % align.length; 


}
