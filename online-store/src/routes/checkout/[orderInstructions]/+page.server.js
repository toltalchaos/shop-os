//we need to do this to have access to the url params

export async function load({ url }) {
    let orderNum = url.searchParams.get('orderNum');
    return { orderNum };
}