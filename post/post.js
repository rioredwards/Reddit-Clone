/* Imports */
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postSummary = document.getElementById('post-summary');
const postTitle = document.getElementById('post-title');
const postDescription = document.getElementById('post-description');

/* State */
let error = null;
let post = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        displayError();
    }

    if (!post) {
        location.assign('/');
    } else {
        displayPost();
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

function displayPost() {
    postTitle.textContent = post.title;
    postDescription.textContent = post.description;
    if (post.image_url) {
        const img = document.createElement('img');
        img.id = 'post-image';
        img.src = post.image_url;
        img.alt = `${post.title} image`;
        postSummary.append(img);
    }
}
