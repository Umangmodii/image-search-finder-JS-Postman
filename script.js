    const form = document.getElementById('searchForm');
    const imageResults = document.getElementById('imageResults');
    const previousBtn = document.getElementById('previousBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalResultsElement = document.getElementById('totalResults');
    const loadingSpinner = document.getElementById('loadingSpinner'); // Get the loading spinner element
    
    let currentPage = 1;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = document.getElementById('image').value;
      currentPage = 1; // Reset current page when submitting a new search
      fetchImages(query, currentPage);
    });

    previousBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const query = document.getElementById('image').value;
    fetchImages(query, currentPage);
  }
});


nextBtn.addEventListener('click', () => {
  currentPage++;
  const query = document.getElementById('image').value;
  fetchImages(query, currentPage);
});

async function fetchImages(query, page) {
  loadingSpinner.style.display = 'block'; // Show the loading spinner
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=100&page=${page}&client_id=FO4Fc209zjPDyLLIo3RXtg12snIr8SnG7Qt450SVH3s`);
  const data = await response.json();
  displayImages(data.results);
  totalResultsElement.textContent = ``;
  loadingSpinner.style.display = 'none'; // Hide the loading spinner after fetching data
  updateResultCount(data.total); // Update the total image count
}

    function displayImages(images) {
      imageResults.innerHTML = '';

      images.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-4', 'mb-3');

        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = 'Description: ';
        cardTitle.textContent += image.alt_description; // Append the description to the existing text

        const downloadBtn = document.createElement('a');
        downloadBtn.classList.add('btn', 'btn-primary', 'mt-2');
        downloadBtn.textContent = 'Download image';
        downloadBtn.href = image.links.download; // Add the image download link
        downloadBtn.setAttribute('target', '_blank'); // Open the download link in a new tab

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(downloadBtn); // Add the download button to the card body
        card.appendChild(img);
        card.appendChild(cardBody);

        imageResults.appendChild(card);
      });
    }

    function updateResultCount(count) {
      const resultCountElement = document.getElementById('resultcount');
      resultCountElement.textContent = count;
    }

