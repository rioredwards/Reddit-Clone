/* Imports */
import '../auth/user.js';
import { createComment, deletePost, getPost, getProfile } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

/* Get DOM Elements */

const postUsername = document.getElementById('post-username');
const postDate = document.getElementById('post-date');
const postTitle = document.getElementById('post-title');
const postDescription = document.getElementById('post-description');
const postImageContainer = document.getElementById('post-image-container');
const commentInput = document.getElementById('add-comment-input');
const commentForm = document.getElementById('add-comment-form');
const errorDisplay = document.getElementById('error-display');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');
const deletePostBtn = document.getElementById('delete-post-btn');

/* State */
let error = null;
let post = null;
let profile = null;

/* Events */
commentInput.addEventListener('focus', () => {
    commentForm.classList.add('active');
    commentInput.addEventListener('blur', () => {
        commentForm.classList.remove('active');
    });
});

deletePostBtn.addEventListener('click', async () => {
    const response = await deletePost(post.id);
    error = response.error;

    if (error) {
        displayError();
    } else {
        // location.assign('/');
        console.log(`Deleting: ${post.id}`);
    }
});

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
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);

    if (formData.get('text') === '') {
        return;
    }

    const commentInsert = {
        post_id: post.id,
        text: formData.get('text'),
        username: profile.username,
    };

    const response = await createComment(commentInsert);

    error = response.error;
    const comment = response.data;

    if (error) {
        displayError();
    } else {
        post.comments.unshift(comment);
        displayComments();
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
    postUsername.textContent = `by: u/${post.username}`;
    postDate.textContent = `Posted on: ${post.created_at}`;
    postTitle.textContent = post.title;
    postDescription.textContent = post.description;
    if (post.image_url) {
        const img = document.createElement('img');
        img.id = 'post-image';
        img.src = post.image_url;
        img.alt = `${post.title} image`;
        postImageContainer.append(img);
    }
}

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}

async function pageLoad() {
    let response = await getProfile();
    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
        return;
    }
}

pageLoad();
