/* Imports */
import '../auth/user.js';
import { createComment, getPost } from '../fetch-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postSummary = document.getElementById('post-summary');
const postTitle = document.getElementById('post-title');
const postDescription = document.getElementById('post-description');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');

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

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);
    const commentInsert = {
        post_id: post.id,
        text: formData.get('text'),
    };
    const response = await createComment(commentInsert);

    error = response.error;
    const comment = response.data;

    if (error) {
        displayError();
    } else {
        console.log(comment);
        post.comments.unshift(comment);
        addCommentForm.reset();
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
