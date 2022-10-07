const SUPABASE_URL = 'https://kaliyzknmpknyjoukzye.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthbGl5emtubXBrbnlqb3VrenllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMDA5MTYsImV4cCI6MTk4MDU3NjkxNn0.YGAmNYGVy_LuRt_2dyLUQblwK7G09RMqsi79XC8JglE';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function getProfile() {
    const id = getUser().id;
    return await client.from('profiles').select().eq('id', id).single();
}

export async function signUpUser(userProf) {
    const email = userProf.email;
    const password = userProf.password;

    let response = await client.auth.signUp({
        email,
        password,
    });
    return response;
}

export async function createProf(userProf) {
    const username = { username: userProf.username };

    const response = await client.from('profiles').insert(username).single();

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
    }
    return response;
}

export async function signInUser(userProf) {
    const email = userProf.email;
    const password = userProf.password;
    return await client.auth.signIn({ email, password });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createPost(post) {
    return await client.from('posts').insert(post).single();
}

export async function getPosts(title) {
    let query = client.from('posts').select('*').limit(20);

    if (title) {
        query.ilike('title', `%${title}%`);
    }

    return await query;
}

export async function getPost(id) {
    return await client
        .from('posts')
        .select(
            `
            *,
            comments (*)
        `
        )
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
