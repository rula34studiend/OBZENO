const { createClient } = supabase;

const supabaseUrl = 'https://fnmcmmzoecuikamktuys.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubWNtbXpvZWN1aWthbWt0dXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MjczNTYsImV4cCI6MjA4MDEwMzM1Nn0.z4y41gZc6wKLqWrCHHfpGqYNPXISw2K26ngK147haAo';

const _supabase = createClient(supabaseUrl, supabaseKey);

async function getUsuarioActual() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) return null;

    const { data: profile, error } = await _supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', session.user.id)
        .single();

    if (error) {
        console.error("Error al cargar perfil:", error);
        return session.user;
    }

    return {
        ...session.user,
        displayName: profile.full_name || profile.username || 'Usuario'
    };
}

async function cerrarSesion() {
    const { error } = await _supabase.auth.signOut();
    if (!error) window.location.href = 'index.html';
}


async function loginConRedSocial(provider) {
    const { data, error } = await _supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: 'https://obzenoproject.netlify.app'
        }
    });
    if (error) console.error('Error social:', error);
}

window.getUsuarioActual = getUsuarioActual;
window.cerrarSesion = cerrarSesion;
window.loginConRedSocial = loginConRedSocial;
window._supabase = _supabase;