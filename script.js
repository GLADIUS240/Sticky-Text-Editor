const addText = document.getElementById('add');
const canvas = document.getElementById('canvas');

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
        font-size: 16px;
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
