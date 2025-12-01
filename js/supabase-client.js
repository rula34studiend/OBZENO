const { createClient } = supabase;

const supabaseUrl = 'https://fnmcmmzoecuikamktuys.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubWNtbXpvZWN1aWthbWt0dXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MjczNTYsImV4cCI6MjA4MDEwMzM1Nn0.z4y41gZc6wKLqWrCHHfpGqYNPXISw2K26ngK147haAo';

const _supabase = createClient(supabaseUrl, supabaseKey);

async function loginConRedSocial(provider) {
    const { data, error } = await _supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: window.location.origin + '/index.html'
        }
    });
    if (error) console.error('Error social:', error);
}

async function registrarUsuario(email, password, metadata) {
    const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: `${metadata.nombre} ${metadata.apellido}`,
                username: metadata.username
            }
        }
    });
    return { data, error };
}

async function iniciarSesion(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    return { data, error };
}

async function cerrarSesion() {
    await _supabase.auth.signOut();
    window.location.href = 'index.html';
}

async function getUsuarioActual() {
    const { data: { session } } = await _supabase.auth.getSession();
    return session ? session.user : null;
}