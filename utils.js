const serverUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

export async function readFile(path) {
    const response = await fetch(`${serverUrl}/${path}`);
    const data = await response.text();
    return data.trim();
}