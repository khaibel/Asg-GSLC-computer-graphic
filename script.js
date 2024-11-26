function convertToGrayscale(image) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    data[i] = brightness; // Red
    data[i + 1] = brightness; // Green
    data[i + 2] = brightness; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

function convertToBlur(image) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.filter = 'blur(10px)';
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL();
}


document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

    // DISPLAY ORIGINAL IMAGE
  const input = document.getElementById('input');
  input.src = window.URL.createObjectURL(file);
  document.querySelector('#inputLabel').style.display = 'block';

  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const conversionType = document.getElementById('conversionType').value;
      let convertedDataURL;

      if (conversionType === 'grayscale') {
        convertedDataURL = convertToGrayscale(img);
      } else if (conversionType === 'blur') {
        convertedDataURL = convertToBlur(img);
      }

        document.getElementById('output').src = convertedDataURL;
      document.querySelector('#outputLabel').style.display = 'block';
    }
    img.src = event.target.result;
  }

    reader.readAsDataURL(file);
});