export async function getSoundCloudSongs(query) {
    const CLIENT_ID = "";
    const url = `https://api-v2.soundcloud.com/search/tracks?q=${query}&client_id=${CLIENT_ID}&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch SoundCloud data");

        const data = await response.json();
        return data.collection.map(track => ({
            name: track.title,
            artist: track.user.username,
            url: track.permalink_url
        }));
    } catch (error) {
        console.error("Error fetching SoundCloud songs:", error);
        return [];
    }
}
