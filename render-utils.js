export function renderPost(post) {
    const container = document.createElement('li');
    container.classList.add('post');

    const link = document.createElement('a');
    link.href = `/post/?id=${post.id}`;

    const username = document.createElement('p');
    username.classList.add('post-username');
    username.textContent = `u/${post.username}`;

    const time = document.createElement('p');
    time.classList.add('post-username');
    time.textContent = `Posted: ${post.created_at}`;

    const title = document.createElement('h2');
    title.classList.add('post-title');
    title.textContent = post.title;

    const description = document.createElement('p');
    description.classList.add('post-description');
    description.textContent = post.description;

    link.append(username, time, title, description);
    if (post.image_url) {
        const img = document.createElement('img');
        img.classList.add('post-image');
        img.src = post.image_url;
        link.append(img);
    }
    container.append(link);

    return container;
}

export function renderComment(comment) {
    const li = document.createElement('li');

    li.textContent = comment.text;

    return li;
}
