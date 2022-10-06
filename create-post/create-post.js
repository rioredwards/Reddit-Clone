/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';

/* Get DOM Elements */
const postForm = document.getElementById('create-post-form');
const errorDisplay = document.getElementById('error');
const addBtn = document.getElementById('add-post');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/photo-placeholder.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addBtn.disabled = true;

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    let url = null;
    if (imageFile.name) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `posts/${randomFolder}/${imageFile.name}`;
        url = await uploadImage('images', imagePath, imageFile);
    }

    const post = {
        title: formData.get('title'),
        description: formData.get('description'),
        image_url: url,
    };

    const response = await createPost(post);
    error = response.error;
    addBtn.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
