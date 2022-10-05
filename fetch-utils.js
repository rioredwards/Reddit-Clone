const SUPABASE_URL = 'https://kaliyzknmpknyjoukzye.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthbGl5emtubXBrbnlqb3VrenllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMDA5MTYsImV4cCI6MTk4MDU3NjkxNn0.YGAmNYGVy_LuRt_2dyLUQblwK7G09RMqsi79XC8JglE';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log(client);
/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
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

export async function uploadImage(bucketName, imagePath, imageFile) {
    // we can use the storage bucket to upload the image,
    // then use it to get the public URL
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        // in this case, we will _replace_ any
        // existing file with same name.
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    // URL Looks like:
    // https://nwxkvnsiwauieanvbiri.supabase.co/storage/v1/object/public/images/pets/984829079656/Franky.jpeg

    return url;
}
