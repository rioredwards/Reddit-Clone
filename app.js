/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getPosts } from './fetch-utils.js';
import { renderPost } from './render-utils.js';

/* Get DOM Elements */
// const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const errorDisplay = document.getElementById('error');
const postList = document.getElementById('post-list');

/* State */
let error = null;
let posts = [];

/* Events */
searchInput.addEventListener('focus', () => {
    searchBar.classList.add('active');
    searchInput.addEventListener('blur', () => {
        searchBar.classList.remove('active');
    });
});

searchBar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searchBar);
    const title = formData.get('title');

    const response = await getPosts(title);
    error = response.error;

    if (error) {
        displayError();
    } else {
        posts = response.data;
        displayPosts();
    }
});

window.addEventListener('load', async () => {
    const response = await getPosts();
    error = response.error;
    posts = response.data;

    if (error) {
        displayError();
    } else {
        displayPosts();
    }
});

/* Display Functions */
function displayError() {
    errorDisplay.textContent = error.message;
}

function displayPosts() {
    postList.innerHTML = '';
    for (const post of posts) {
        const postEl = renderPost(post);
        postList.prepend(postEl);
    }
}
