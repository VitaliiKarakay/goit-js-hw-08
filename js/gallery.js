const images = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = images.map(({ preview, original, description }, index) => {
    return `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          data-index="${index + 1}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}).join('');

galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;

    const largeImageURL = event.target.dataset.source;
    const imageIndex = event.target.dataset.index;
    openModal(largeImageURL, imageIndex);
});

function createModalContent(imageURL, imageIndex, totalImages) {
    return `
        <div class="modal">
            <div class="image-number">${imageIndex}/${totalImages}</div>
            <img src="${imageURL}" alt="Large Image" />
            <button class="nav-button prev-button">&lt;</button>
            <button class="nav-button next-button">&gt;</button>
        </div>
    `;
}

function setNavigationHandlers(instance, imageIndex) {
    instance.element().querySelector('.prev-button').onclick = () => navigateImage(instance, Number(imageIndex) - 1, 'prev');
    instance.element().querySelector('.next-button').onclick = () => navigateImage(instance, Number(imageIndex) + 1, 'next');
}

function updateImage(instance, newIndex, direction) {
    const newImage = images[newIndex - 1];
    const modalContent = instance.element();
    const imgElement = modalContent.querySelector('img');
    const imageNumberElement = modalContent.querySelector('.image-number');

    const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const slideInClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    imgElement.classList.add(slideOutClass);
    setTimeout(() => {
        imgElement.src = newImage.original;
        imageNumberElement.textContent = `${newIndex}/${images.length}`;
        imgElement.classList.remove(slideOutClass);
        imgElement.classList.add(slideInClass);
    }, 250);

    imgElement.addEventListener('animationend', () => {
        imgElement.classList.remove(slideInClass);
    });
}

function openModal(imageURL, imageIndex) {
    const totalImages = images.length;
    const instance = basicLightbox.create(createModalContent(imageURL, imageIndex, totalImages), {
        onShow: (instance) => setNavigationHandlers(instance, imageIndex)
    });
    instance.show();
}

function navigateImage(instance, newIndex, direction) {
    if (newIndex < 1) newIndex = images.length;
    if (newIndex > images.length) newIndex = 1;
    updateImage(instance, newIndex, direction);
    setNavigationHandlers(instance, newIndex);
}