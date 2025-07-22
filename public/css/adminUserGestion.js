let currentFontSize = 1;
        function increaseFontSize() {
            currentFontSize++;
            if (currentFontSize > 4) currentFontSize = 1;
            document.body.classList.remove('font-size-1', 'font-size-2', 'font-size-3', 'font-size-4');
            document.body.classList.add('font-size-' + currentFontSize);
        }