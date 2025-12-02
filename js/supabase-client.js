const { createClient } = supabase;

const supabaseUrl = 'https://fnmcmmzoecuikamktuys.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubWNtbXpvZWN1aWthbWt0dXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MjczNTYsImV4cCI6MjA4MDEwMzM1Nn0.z4y41gZc6wKLqWrCHHfpGqYNPXISw2K26ngK147haAo';

const _supabase = createClient(supabaseUrl, supabaseKey);
async function getUsuarioActual() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) return null;

    const { data: profile } = await _supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', session.user.id)
        .maybeSingle();

    const rawName = profile?.full_name || profile?.username || session.user.email.split('@')[0];

    return { ...session.user, displayName: rawName };
}

async function cerrarSesion() {
    await _supabase.auth.signOut();
    window.location.href = 'index.html';
}
async function loginConRedSocial(provider) {
    const { error } = await _supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: 'https://obzenoproject.netlify.app' }
    });
    if (error) console.error('Error social:', error);
}

async function obtenerCarritoNube() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await _supabase
        .from('carrito')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: true });

    if (error) {
        console.error("Error obteniendo carrito:", error);
        return [];
    }
    return data.map(item => ({...item, precio: parseFloat(item.precio)}));
}

async function agregarItemNube(producto) {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return;
    const { data: existente, error } = await _supabase
        .from('carrito')
        .select('*')
        .eq('user_id', user.id)
        .eq('nombre', producto.nombre)
        .maybeSingle();

    if (error) console.error("Error buscando producto:", error);
    if (existente) {
        await _supabase.from('carrito').update({ cantidad: existente.cantidad + 1 }).eq('id', existente.id);
    } else {
        await _supabase.from('carrito').insert([{
            user_id: user.id,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            img: producto.img,
            cantidad: 1
        }]);
    }
}

async function reducirItemNube(nombreProducto) {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return;

    const { data: item } = await _supabase
        .from('carrito')
        .select('*')
        .eq('user_id', user.id)
        .eq('nombre', nombreProducto)
        .maybeSingle();

    if (item) {
        if (item.cantidad > 1) {
            await _supabase.from('carrito').update({ cantidad: item.cantidad - 1 }).eq('id', item.id);
        } else {
            await _supabase.from('carrito').delete().eq('id', item.id);
        }
    }
}

async function eliminarItemNubeTotal(nombreProducto) {
    const { data: { user } } = await _supabase.auth.getUser();
    if (user) await _supabase.from('carrito').delete().eq('user_id', user.id).eq('nombre', nombreProducto);
}

async function registrarUsuario(email, password, metadata) {}
async function iniciarSesion(email, password) {}

window.getUsuarioActual = getUsuarioActual;
window.cerrarSesion = cerrarSesion;
window.loginConRedSocial = loginConRedSocial;
window.obtenerCarritoNube = obtenerCarritoNube;
window.agregarItemNube = agregarItemNube;
window.reducirItemNube = reducirItemNube;
window.eliminarItemNubeTotal = eliminarItemNubeTotal;
window._supabase = _supabase;