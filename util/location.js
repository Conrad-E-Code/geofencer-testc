export function getMapPreview(lat, lng) {
    const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7C${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
    console.log(imagePreviewURL)
    return imagePreviewURL
}