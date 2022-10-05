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
