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

// Add text box creation with drag functionality
addText.addEventListener('click', () => {
    const textBox = document.createElement('textarea');
    
    // Styling for the new text box
    textBox.style.cssText = `
        position: absolute;
        background-color: #D4D4D4;
        width: auto;
        height: auto;
        line-height:normal;
        padding: 1px;
        font-size: 24px;
        overflow: hidden;
        resize: none;
        cursor: crosshair;
        top: 0;
        left: 0;
    `;
    textBox.placeholder = 'Enter your text';
    
    // Auto-resize based on input
    textBox.addEventListener('input', function() {
        textBox.style.height = 'auto'; // Reset the height
        textBox.style.height = (textBox.scrollHeight) + 'px'; // Adjust height
    });

    canvas.appendChild(textBox);

    // Variables for drag movement
    let initX = 0, initY = 0, finalX = 0, finalY = 0;

    // Drag start
    textBox.addEventListener('mousedown', (e) => {
        initX = e.clientX;
        initY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });

    textBox.addEventListener('focus', () => {
        decrement.addEventListener('click', () => {
            // Get current font size, convert to integer, then decrement
            let currentFontSize = parseInt(fontSize.innerText);;
            if (currentFontSize > 1) { // Ensure the font size doesn't go below 1
                textBox.style.fontSize = (currentFontSize - 1) + 'px';
                fontSize.innerText=currentFontSize-1;
            }
        });

        increment.addEventListener('click',()=>{
            let currentFontSize = parseInt(fontSize.innerText);;
            if (currentFontSize > 1) { // Ensure the font size doesn't go below 1
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
    });
    // Drag move
    function mouseMove(e) {
        const rect = canvas.getBoundingClientRect();

        finalX = initX - e.clientX;
        finalY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;

        // Calculate new positions
        let newTop = textBox.offsetTop - finalY;
        let newLeft = textBox.offsetLeft - finalX;

        // Ensure the text box stays within the canvas boundaries
        if (newTop < 0) newTop = 0;
        if (newLeft < 0) newLeft = 0;
        if (newTop + textBox.offsetHeight > rect.height) newTop = rect.height - textBox.offsetHeight;
        if (newLeft + textBox.offsetWidth > rect.width) newLeft = rect.width - textBox.offsetWidth;

        textBox.style.top = newTop + 'px';
        textBox.style.left = newLeft + 'px';
    }

    // Drag end
    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
});
