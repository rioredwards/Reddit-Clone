export function renderPost(post) {
    const container = document.createElement('li');
    container.classList.add('post');

    const link = document.createElement('a');
    link.href = `/post/?id=${post.id}`;
    link.classList.add('post-container');

    const postInfo = document.createElement('div');
    postInfo.classList.add('post-info');

    const username = document.createElement('h3');
    username.classList.add('post-username');
    username.textContent = `u/${post.username}`;

    const date = document.createElement('span');
    date.classList.add('post-date');
    date.textContent = `Posted: ${post.created_at}`;

    postInfo.append(username, date);

    const title = document.createElement('h2');
    title.classList.add('post-title');
    title.textContent = post.title;

    const description = document.createElement('p');
    description.classList.add('post-description');
    description.textContent = post.description;

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('post-image-container');
    imgContainer.id = 'post-image-container';

    if (post.image_url) {
        const img = document.createElement('img');
        img.id = 'post-image';
        img.classList.add('post-image');
        img.src = post.image_url;
        imgContainer.append(img);
    }

    link.append(postInfo, title, description, imgContainer);
    container.append(link);

    return container;
}

export function renderComment(comment) {
    const commentContainer = document.createElement('li');
    commentContainer.classList.add('comment-container');

    const commentHeader = document.createElement('div');
    commentHeader.classList.add('comment-header');

    const commentUsername = document.createElement('h3');
    commentUsername.textContent = `u/${comment.username}`;
    commentUsername.classList.add('comment-username');

    const commentDate = document.createElement('span');
    commentDate.textContent = comment.created_at;
    commentDate.classList.add('comment-date');

    commentHeader.append(commentUsername, commentDate);

    const commentText = document.createElement('p');
    commentText.textContent = comment.text;
    commentText.classList.add('comment-text');

    commentContainer.append(commentHeader, commentText);
    return commentContainer;
}
