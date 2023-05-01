import { GOOGLE_API_KEY } from "./hiddenfile"
export function getMapPreview(lat, lng) {
    const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
    return imagePreviewURL
}