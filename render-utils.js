export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post');

    const a = document.createElement('a');
    a.href = `/pet/?id=${post.id}`;

    const h2 = document.createElement('h2');
    h2.classList.add('post-title');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.classList.add('post-description');
    p.textContent = post.description;

    a.append(h2, p);
    if (post.image_url) {
        const img = document.createElement('img');
        img.classList.add('post-image');
        img.src = post.image_url;
        a.append(img);
    }
    li.append(a);

    return li;
}
